import { test, expect } from "@playwright/test";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import katex from "katex";

const notesDir = join(process.cwd(), "public/notes");
const noteFiles = readdirSync(notesDir).flatMap((course) =>
  readdirSync(join(notesDir, course))
    .filter((file) => file.endsWith(".html"))
    .map((file) => `${course}/${file}`)
);

test("every course note renders without invalid or leftover LaTeX", async ({ page }) => {
  await page.goto("/courses/ml/linear-regression");
  await expect(page.locator(".note-body .katex").first()).toBeAttached();
  const problems = [];
  let formulaCount = 0;

  for (const file of noteFiles) {
    const html = readFileSync(join(notesDir, file), "utf8");
    const result = await page.evaluate((html) => {
      const root = document.createElement("article");
      root.innerHTML = html;
      // Use the same renderer as CourseView, including its exclusions.
      window.renderKaTeX(root);
      const errors = [...root.querySelectorAll(".katex-error")].map((el) => ({
        formula: el.textContent,
        error: el.getAttribute("title"),
      }));
      const formulas = [...root.querySelectorAll("annotation[encoding='application/x-tex']")]
        .map((el) => ({
          text: el.textContent,
          displayMode: !!el.closest(".katex-display"),
        }));
      const ignored = "script, noscript, style, textarea, pre, code, option, svg, .katex, .katex-error, .katex-ignore, .calc-stats, .calc-stat-box";
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      const leftovers = [];
      while (walker.nextNode()) {
        const node = walker.currentNode;
        if (!node.parentElement.closest(ignored) && /\$|\\[a-zA-Z()[\]]/.test(node.textContent)) {
          leftovers.push(node.textContent.trim());
        }
      }
      // Code and SVG are intentionally excluded from auto-render. Their labels
      // should use literal symbols, not math that can never be typeset.
      for (const el of root.querySelectorAll("pre, code, svg text")) {
        if (/\$[^$]*\\[a-zA-Z]|\\(?:phi|tau|alpha|beta|gamma|theta|lambda|sigma|frac|sum|sqrt|to)\b/.test(el.textContent)) {
          leftovers.push(el.textContent.trim());
        }
      }
      return { errors, formulas, leftovers };
    }, html);
    for (const error of result.errors) problems.push({ file, ...error });
    for (const text of result.leftovers) problems.push({ file, leftover: text });
    for (const formula of result.formulas) {
      formulaCount++;
      try {
        // throwOnError:false can hide unsupported commands as red text.
        katex.renderToString(formula.text, { displayMode: formula.displayMode, throwOnError: true, strict: "error" });
      } catch (error) {
        problems.push({ file, formula: formula.text, error: error.message });
      }
    }
  }

  console.log(`Audited ${noteFiles.length} HTML notes and ${formulaCount} formulas.`);
  expect(problems).toEqual([]);
});

test("formulas survive filtering, scrolling, and opening answers", async ({ page }) => {
  await page.goto("/courses/ml/linear-regression");
  const formulas = page.locator(".note-body .katex");
  await expect(formulas.first()).toBeAttached();
  const count = await formulas.count();
  await page.getByRole("searchbox").fill("regression");
  await expect(formulas).toHaveCount(count);
  await page.getByRole("searchbox").fill("");
  await page.locator(".toc a").filter({ hasText: "quick check" }).click();
  await expect(page.locator(".toc a.active")).toHaveText("quick check");
  await expect(formulas).toHaveCount(count);
  await page.locator("details summary").click();
  await expect(page.locator("details")).toHaveAttribute("open", "");
  await expect(formulas).toHaveCount(count);
  await expect(page.locator(".katex-error")).toHaveCount(0);
});

for (const path of [
  "ml/top-50-interview-questions",
  "ml/precision-recall",
  "ml/svm-poly-kernel",
  "os/top-50-interview-questions",
  "os/plan",
  "hld/sharding",
  "networking/keep-alive",
  "genai-agentic-ai/openai-api",
  "genai-agentic-ai/plan",
]) {
  test(`${path}: math survives course controls on desktop and mobile`, async ({ page }) => {
    await page.goto(`/courses/${path}`);
    const formulas = page.locator("article .katex");
    await expect(formulas.first()).toBeAttached();
    const count = await formulas.count();
    await page.getByRole("searchbox").fill("test filter");
    await expect(formulas).toHaveCount(count);
    await page.getByRole("searchbox").fill("");
    await page.setViewportSize({ width: 390, height: 844 });
    await page.locator(".burger").click();
    await expect(page.locator(".sidebar")).toHaveClass(/open/);
    await expect(formulas).toHaveCount(count);
    await page.locator(".scrim").click({ position: { x: 5, y: 5 } });
    await expect(page.locator(".sidebar")).not.toHaveClass(/open/);
    await expect(formulas).toHaveCount(count);
    await expect(page.locator(".katex-error")).toHaveCount(0);
  });
}

test("interview answers retain math and open state across React updates", async ({ page }) => {
  await page.goto("/courses/ml/top-50-interview-questions");
  await expect(page.locator(".note-body .katex").first()).toBeAttached();
  const count = await page.locator(".note-body .katex").count();
  await page.getByRole("button", { name: "Expand All Answers", exact: true }).click();
  await expect(page.locator("details[open]")).toHaveCount(50);
  await page.getByRole("searchbox").fill("regression");
  await expect(page.locator("details[open]")).toHaveCount(50);
  await expect(page.locator(".note-body .katex")).toHaveCount(count);
  await page.getByRole("button", { name: "Collapse All", exact: true }).click();
  await expect(page.locator("details[open]")).toHaveCount(0);
  await page.locator("details summary").first().click();
  await expect(page.locator("details[open] .katex").first()).toBeVisible();
  await expect(page.locator(".note-body .katex")).toHaveCount(count);
});

test("client-side navigation renders the new note and preserves code", async ({ page }) => {
  await page.goto("/courses/ml/linear-regression");
  await expect(page.locator(".note-body .katex").first()).toBeAttached();
  const code = await page.locator(".note-body pre").allTextContents();
  await page.getByRole("searchbox").fill("cost");
  expect(await page.locator(".note-body pre").allTextContents()).toEqual(code);
  await page.locator('.side-nav a[href="/courses/ml/cost-function"]').click();
  await expect(page).toHaveURL(/\/cost-function$/);
  await expect(page.locator(".note-body .katex-display").first()).toBeVisible();
  await expect(page.locator(".katex-error")).toHaveCount(0);
  await page.goBack();
  await expect(page.locator(".note-body .katex").first()).toBeAttached();
  expect(await page.locator(".note-body pre").allTextContents()).toEqual(code);
});

test("dynamic RAG output renders math and retains widget state", async ({ page }) => {
  await page.goto("/courses/genai-agentic-ai/rag");
  await page.locator("#tab-search-btn").click();
  await page.getByRole("button", { name: 'Mixed: "30 days refund invoice"', exact: true }).click();
  await expect(page.locator("#retrieval-results .katex")).toHaveCount(1);
  await page.getByRole("searchbox").fill("rag");
  await expect(page.locator("#tab-search")).toBeVisible();
  await expect(page.locator("#retrieval-results .katex")).toHaveCount(1);
  await expect(page.locator(".katex-error")).toHaveCount(0);
});

test("supported delimiters, entities, and repeated rendering preserve literal content", async ({ page }) => {
  await page.goto("/courses/ml/linear-regression");
  await expect(page.locator(".note-body .katex").first()).toBeAttached();
  const result = await page.evaluate(() => {
    const root = document.createElement("div");
    root.innerHTML = String.raw`<p>$x^2$ \(\alpha &lt; \beta\)</p>
      <div>$$\begin{aligned}x &amp;= 1 \\ y &amp;= 2\end{aligned}$$</div>
      <div>\[\frac{1}{2}\]</div>
      <pre><code>const price = "$5"; /\s+/</code></pre>
      <span class="katex-ignore">$5 to $10</span>
      <details><summary>Answer</summary>$\sqrt{4}$</details>`;
    const literals = root.querySelector("pre").outerHTML + root.querySelector(".katex-ignore").outerHTML;
    window.renderKaTeX(root);
    const once = root.innerHTML;
    window.renderKaTeX(root);
    return {
      formulas: root.querySelectorAll(".katex").length,
      errors: root.querySelectorAll(".katex-error").length,
      unchanged: root.innerHTML === once,
      literalsUnchanged: literals === root.querySelector("pre").outerHTML + root.querySelector(".katex-ignore").outerHTML,
    };
  });
  expect(result).toEqual({ formulas: 5, errors: 0, unchanged: true, literalsUnchanged: true });
});
