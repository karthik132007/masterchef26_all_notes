// Single source of truth for engineering roadmaps

export const roadmaps = [
  {
    id: "ai-engineer",
    title: "AI Engineer Roadmap",
    shortTitle: "AI Engineer",
    role: "Frontier AI & LLM Systems Engineer",
    tagline:
      "From bare-metal programming and classical ML to PyTorch, Transformer internals, production RAG, autonomous agents, and high-throughput LLM serving infrastructure.",
    badge: "Active Track",
    status: "active",
    accentColor: "var(--yellow)",
    totalStages: 8,
    estimatedWeeks: "24–36 weeks",
    prerequisites: "Basic computational intuition & curiosity to build",
    chips: [
      "Python & C++",
      "SQL",
      "Machine Learning",
      "Deep Learning & PyTorch",
      "GenAI & Transformers",
      "Advanced RAG",
      "Agentic AI",
      "AI System Design (HLD)",
    ],
    stages: [
      {
        number: 1,
        slug: "programming-fundamentals",
        title: "Programming Fundamentals: Python & Modern C++",
        tag: "Stage 01 · Foundations",
        color: "var(--yellow)",
        summary:
          "Master Python for rapid AI prototyping, data manipulation, and orchestration, combined with Modern C++ for high-performance tensor computing, memory efficiency, and GPU inference engines.",
        mentalModel:
          "Python is your cockpit (high-level abstraction, APIs, orchestration); C++ is your jet engine (zero-cost abstractions, memory layout, direct hardware control). An elite AI Engineer writes Python that respects what C++ and hardware are doing under the hood.",
        coreConcepts: [
          "Python 3 internals: Memory management, reference counting, Garbage Collection (cyclic GC), and the Global Interpreter Lock (GIL)",
          "Object-Oriented & Functional Python: Classes, dunder methods (__call__, __enter__), decorators, generators, and iterators",
          "Concurrency in Python: Threading vs Multiprocessing vs asyncio event loop for I/O-bound LLM API calls",
          "NumPy Vectorization: Strides, memory contiguous arrays (C-order vs Fortran-order), broadcasting rules, and avoiding Python-level loops",
          "Modern C++ (C++17/20): Pointers, references, value categories (lvalue vs rvalue), and move semantics",
          "Resource Acquisition Is Initialization (RAII): std::unique_ptr, std::shared_ptr, and safe manual memory allocation",
          "C++ Standard Template Library (STL): std::vector, std::unordered_map, memory alignment, and cache-friendly data structures",
          "C++ in Modern AI: How PyTorch C++ extensions (ATen / LibTorch), CUDA kernels, and llama.cpp bridge to Python",
        ],
        handsOnProject: {
          title: "High-Throughput Token Batcher & Vector Math Engine",
          description:
            "Build a custom 2D matrix multiplication and tensor reduction library in Modern C++ with Pybind11 bindings, then benchmark its memory throughput against pure Python and NumPy.",
        },
        interviewDrill:
          "Explain why NumPy array operations are 50-100x faster than pure Python lists, and how Python's GIL affects multi-threaded model inference vs multi-threaded I/O network calls.",
        resources: [
          {
            title: "Python 3 Official Documentation & Tutorial",
            provider: "Python Software Foundation",
            url: "https://docs.python.org/3/tutorial/",
            type: "Documentation",
            badge: "Free",
            description: "The definitive reference for Python language mechanics, data structures, and standard library.",
          },
          {
            title: "CS50x: Introduction to Computer Science",
            provider: "Harvard University",
            url: "https://cs50.harvard.edu/x/",
            type: "Course",
            badge: "Free / Top Pick",
            description: "World-class foundation in computational thinking, memory allocation, pointers, and algorithms in C.",
          },
          {
            title: "Learn C++ (Comprehensive Modern C++ Guide)",
            provider: "learncpp.com",
            url: "https://www.learncpp.com/",
            type: "Interactive Guide",
            badge: "Free",
            description: "Step-by-step masterclass in Modern C++ (C++14/17/20), pointer arithmetic, RAII, and object lifetime.",
          },
          {
            title: "NeetCode Roadmap: Data Structures & Algorithms",
            provider: "NeetCode",
            url: "https://neetcode.io/roadmap",
            type: "Practice",
            badge: "Free Practice",
            description: "Targeted problem sets for arrays, hashing, two pointers, trees, and graphs needed in technical interviews.",
          },
        ],
      },
      {
        number: 2,
        slug: "sql-and-data-engineering",
        title: "SQL & Relational Data Engineering",
        tag: "Stage 02 · Data Layer",
        color: "var(--mint)",
        summary:
          "AI models are only as good as the underlying data pipelines. Master relational modeling, query optimization, analytical window functions, and hybrid vector storage in SQL.",
        mentalModel:
          "Think of SQL not as an imperative programming language, but as a declarative contract with a query planner. You specify 'what' data you need; the database optimizer uses statistics, B-Trees, and hash joins to find the fastest physical path.",
        coreConcepts: [
          "Declarative Querying: SELECT, WHERE filtering, GROUP BY aggregations, and HAVING clauses",
          "Advanced JOIN Mechanics: INNER, LEFT, RIGHT, FULL OUTER, CROSS JOIN, and self-joins; Nested Loop vs Hash Join vs Merge Join",
          "Window Functions: ROW_NUMBER(), RANK(), DENSE_RANK(), NTILE(), and analytical sliding windows (LAG, LEAD, AVG OVER PARTITION)",
          "Common Table Expressions (CTEs) & Subqueries: Recursive CTEs for hierarchical data and graph traversals",
          "Database Indexing & Performance: B-Tree vs Hash vs GIN indexes, composite indexes, and understanding EXPLAIN ANALYZE cost outputs",
          "ACID Guarantees & Concurrency: Isolation levels (Read Committed, Repeatable Read, Serializable) and MVCC (Multi-Version Concurrency Control)",
          "Vector Data in SQL: pgvector extension, cosine distance (<=>), L2 distance (<->), and IVFFlat / HNSW index builds inside PostgreSQL",
        ],
        handsOnProject: {
          title: "AI Training & Evaluation Metadata Warehouse",
          description:
            "Design and optimize a PostgreSQL schema storing prompt logs, model token usage, user ratings, and pgvector embeddings with analytical queries calculating 7-day rolling user retention and p99 query latency.",
        },
        interviewDrill:
          "Write a query using Window Functions to identify the top 3 highest-latency LLM calls per day for each model variant, without using subqueries.",
        resources: [
          {
            title: "Select Star SQL — Interactive SQL Learning",
            provider: "Select Star SQL",
            url: "https://selectstarsql.com/",
            type: "Interactive Tutorial",
            badge: "Free / Highly Recommended",
            description: "Learn SQL by exploring real-world Texas death row execution data. Clear, hands-on, and intuitive.",
          },
          {
            title: "Mode Analytics SQL Tutorial for Data Analysis",
            provider: "Mode Analytics",
            url: "https://mode.com/sql-tutorial/",
            type: "Course",
            badge: "Free",
            description: "Industry-standard curriculum covering basic, intermediate, and advanced SQL window functions with an interactive SQL runner.",
          },
          {
            title: "PostgreSQL Official Documentation",
            provider: "PostgreSQL Global Development Group",
            url: "https://www.postgresql.org/docs/current/",
            type: "Documentation",
            badge: "Reference",
            description: "Authoritative reference for Postgres query execution, table partitioning, and indexing internals.",
          },
          {
            title: "pgvector: Vector Similarity Search for Postgres",
            provider: "GitHub / pgvector",
            url: "https://github.com/pgvector/pgvector",
            type: "Open Source Tool",
            badge: "Essential",
            description: "How to store embeddings, perform exact and approximate nearest neighbor (ANN) searches directly in Postgres.",
          },
        ],
      },
      {
        number: 3,
        slug: "machine-learning",
        title: "Classical Machine Learning",
        tag: "Stage 03 · Core ML",
        color: "var(--lavender)",
        summary:
          "Develop rigorous first-principles intuition for mathematical optimization, cost functions, decision boundaries, generalization, and tabular predictive modeling.",
        mentalModel:
          "All machine learning boils down to three components: a Model representation f_w(x), a Loss function J(w) quantifying error, and an Optimization algorithm (like Gradient Descent) that updates parameters in the direction of steepest descent.",
        coreConcepts: [
          "Supervised vs Unsupervised Learning: Continuous targets (regression) vs discrete labels (classification) vs latent clustering",
          "Linear Regression & Normal Equation: Closed-form analytical solution vs iterative Batch Gradient Descent",
          "Logistic Regression & Cross-Entropy: Sigmoid activation, log-loss derivation, and maximum likelihood estimation (MLE)",
          "Bias-Variance Tradeoff: High bias (underfitting) vs high variance (overfitting), learning curves, and cross-validation strategies",
          "Regularization: L1 Lasso (sparsity inducing) vs L2 Ridge (weight shrinkage) and elastic net formulations",
          "Support Vector Machines (SVM): Maximum margin hyperplanes, soft-margin Slack variables, and the Dual formulation with Kernel tricks (RBF)",
          "Decision Trees & Ensembles: Gini impurity / Entropy splits, Bagging (Random Forests), and Gradient Boosting (XGBoost / LightGBM)",
          "Evaluation Metrics: Precision, Recall, F1-Score, ROC-AUC curve, Confusion Matrix, and handling imbalanced datasets",
        ],
        handsOnProject: {
          title: "Scikit-Learn From Scratch: ML Algorithm Suite",
          description:
            "Implement Linear Regression, Logistic Regression with Gradient Descent, and a Decision Tree classifier purely in NumPy without importing scikit-learn, then benchmark results on synthetic datasets.",
        },
        interviewDrill:
          "Derive the gradient update rule for Logistic Regression using Cross-Entropy loss. Why can't Mean Squared Error be used cleanly with Sigmoid for classification?",
        resources: [
          {
            title: "Machine Learning Specialization",
            provider: "Coursera & DeepLearning.AI (Andrew Ng)",
            url: "https://www.coursera.org/specializations/machine-learning-introduction",
            type: "Specialization",
            badge: "Foundational / Must-Do",
            description: "The gold-standard 3-course specialization covering Supervised ML, Advanced Algorithms, and Unsupervised Learning & Recommenders by Andrew Ng.",
          },
          {
            title: "StatQuest with Josh Starmer: ML Playlist",
            provider: "StatQuest (YouTube)",
            url: "https://statquest.org/video-index/",
            type: "Video Series",
            badge: "Free Visuals",
            description: "Step-by-step visual breakdowns of Decision Trees, Random Forests, SVMs, and Gradient Boosting without skipping steps.",
          },
          {
            title: "Scikit-Learn User Guide & API Reference",
            provider: "scikit-learn.org",
            url: "https://scikit-learn.org/stable/user_guide.html",
            type: "Documentation",
            badge: "Industry Standard",
            description: "Exemplary engineering documentation detailing algorithms, mathematical equations, and best practice pipelines.",
          },
        ],
        nexoraCourseLink: {
          title: "Riviso Machine Learning Notes & First-Principles Derivations",
          href: "/courses/ml",
        },
      },
      {
        number: 4,
        slug: "deep-learning-and-pytorch",
        title: "Deep Learning & PyTorch",
        tag: "Stage 04 · Neural Nets",
        color: "var(--pink)",
        summary:
          "Bridge classical statistical models to modern neural computing. Master backpropagation, autograd mechanics, PyTorch tensor pipelines, GPU acceleration, and deep network training.",
        mentalModel:
          "A deep neural network is a parameterized computational DAG (directed acyclic graph). Forward pass evaluates composite functions; backward pass applies the multivariable chain rule in reverse topological order to compute exact gradients.",
        coreConcepts: [
          "Perceptrons to MLPs: Linear transformations (W^T x + b) combined with non-linear activation functions (ReLU, Leaky ReLU, GELU, SiLU)",
          "Backpropagation & Autograd: Reverse-mode automatic differentiation, computational graphs, and gradient accumulation",
          "PyTorch Core Primitives: torch.Tensor, device allocation (CPU/CUDA/MPS), broadcasting, memory strides, and contiguous tensors",
          "Building with torch.nn: Custom nn.Module, forward pass definition, parameter registration, and custom autograd Functions",
          "Data Pipelines: Custom Dataset subclasses, DataLoader multi-processing, pin_memory, dynamic collate functions, and batching",
          "Optimizers & Schedulers: SGD with Momentum, Adam, AdamW (weight decay decoupled from gradient updates), and Cosine Annealing",
          "Training Dynamics & Stability: Weight initialization (He / Xavier), Batch Normalization vs Layer Normalization vs RMSNorm, and gradient clipping",
          "Hardware Acceleration: Mixed Precision Training (torch.amp / autocast / GradScaler), FP16 vs BF16 vs FP8, and measuring GPU memory bandwidth",
        ],
        handsOnProject: {
          title: "PyTorch Deep Learning Engine & Character-Level Model",
          description:
            "Construct a complete PyTorch training loop from scratch: data loader, custom MLP & residual blocks, AdamW optimizer, mixed-precision scaler, and checkpointing logic for text prediction.",
        },
        interviewDrill:
          "Explain why LayerNorm is preferred over BatchNorm in NLP/Transformers, and describe what happens to memory when calling optimizer.zero_grad() vs set_to_none=True.",
        resources: [
          {
            title: "Deep Learning Specialization",
            provider: "Coursera & DeepLearning.AI (Andrew Ng)",
            url: "https://www.coursera.org/specializations/deep-learning",
            type: "Specialization",
            badge: "Foundational / Must-Do",
            description: "5-course masterclass in neural networks, hyperparameter tuning, structuring ML projects, CNNs, and sequence models.",
          },
          {
            title: "Deep Learning with PyTorch: A 60 Minute Blitz",
            provider: "PyTorch Official",
            url: "https://pytorch.org/tutorials/beginner/deep_learning_60min_blitz.html",
            type: "Official Tutorial",
            badge: "Essential",
            description: "The official introduction to PyTorch tensors, autograd engine, neural networks, and classifier training.",
          },
          {
            title: "Neural Networks: Zero to Hero",
            provider: "Andrej Karpathy",
            url: "https://karpathy.ai/zero-to-hero.html",
            type: "Video & Code Course",
            badge: "Masterpiece",
            description: "Build micrograd from scratch, understand backprop mechanics, and implement GPT from first principles.",
          },
          {
            title: "Practical Deep Learning for Coders",
            provider: "Fast.ai (Jeremy Howard)",
            url: "https://course.fast.ai/",
            type: "Course",
            badge: "Top-Down Intuition",
            description: "Pragmatic, top-down deep learning with PyTorch for practitioners shipping real models.",
          },
        ],
      },
      {
        number: 5,
        slug: "generative-ai-and-transformers",
        title: "Generative AI & Foundation Models (GenAI)",
        tag: "Stage 05 · Frontier AI",
        color: "var(--yellow)",
        summary:
          "Dive deep into the Transformer architecture, attention mechanisms, modern autoregressive LLMs (Llama, GPT), tokenization, parameter-efficient fine-tuning (PEFT), and inference mechanics.",
        mentalModel:
          "An autoregressive LLM is a next-token probability distribution generator: P(w_t | w_1, ..., w_{t-1}). Self-attention lets each token dynamically route information from every other token based on Query-Key compatibility and Value projection.",
        coreConcepts: [
          "Attention Mechanisms: Scaled Dot-Product Attention (softmax(QK^T / sqrt(d_k))V), Multi-Head Attention, and Multi-Query / Grouped-Query Attention (GQA)",
          "Transformer Architecture: Decoder-only stack (GPT/Llama), causal masking, RMSNorm, SwiGLU activations, and Rotary Position Embeddings (RoPE)",
          "Tokenization Algorithms: Byte-Pair Encoding (BPE), SentencePiece, Tiktoken, and vocabulary management",
          "KV-Caching Mechanics: Why autoregressive generation is memory-bandwidth bound and how caching past Key-Value states eliminates redundant computation",
          "Parameter-Efficient Fine-Tuning (PEFT): Low-Rank Adaptation (LoRA: W = W_0 + B A), QLoRA (4-bit NormalFloat NF4 with double quantization)",
          "Model Alignment: Reinforcement Learning from Human Feedback (RLHF), Direct Preference Optimization (DPO), and instruction tuning",
          "Model Quantization: Weight-only vs Weight-Activation quantization (GGUF, AWQ, GPTQ, SmoothQuant)",
          "Prompt Engineering & Evaluation: In-context few-shot learning, chain-of-thought (CoT), structured JSON output enforcement, and hallucination reduction",
        ],
        handsOnProject: {
          title: "Mini-GPT & Domain-Adapted LoRA Fine-Tuner",
          description:
            "Implement multi-head causal self-attention in PyTorch, load an open-weights model (such as Llama-3-8B or SmolLM), attach custom LoRA adapter layers, and fine-tune on a custom dataset.",
        },
        interviewDrill:
          "Explain why the denominator in Scaled Dot-Product Attention is sqrt(d_k). What happens to softmax gradients if this scaling factor is omitted as dimension size increases?",
        resources: [
          {
            title: "Generative AI with Large Language Models",
            provider: "Coursera (AWS & DeepLearning.AI)",
            url: "https://www.coursera.org/learn/generative-ai-with-llms",
            type: "Specialization Course",
            badge: "Must-Do",
            description: "Deep dive into the GenAI lifecycle, Transformer architecture, pre-training, fine-tuning with PEFT/LoRA, RLHF, and deployment.",
          },
          {
            title: "Hugging Face NLP Course",
            provider: "Hugging Face",
            url: "https://huggingface.co/learn/nlp-course/",
            type: "Interactive Course",
            badge: "Free / Hands-on",
            description: "Master the Hugging Face ecosystem: Transformers, Datasets, Tokenizers, Accelerate, and PEFT.",
          },
          {
            title: "The Illustrated Transformer",
            provider: "Jay Alammar",
            url: "https://jalammar.github.io/illustrated-transformer/",
            type: "Visual Guide",
            badge: "Classic",
            description: "The most famous visual explanation of Self-Attention, Encoders, Decoders, and tensor shapes.",
          },
          {
            title: "Attention Is All You Need (Vaswani et al.)",
            provider: "ArXiv Research Paper",
            url: "https://arxiv.org/abs/1706.03762",
            type: "Original Paper",
            badge: "Foundational",
            description: "The seminal paper that introduced the Transformer and launched the modern generative AI era.",
          },
        ],
        nexoraCourseLink: {
          title: "Riviso GenAI & Agentic AI Track: Foundations & Attention",
          href: "/courses/genai-agentic-ai/attention",
        },
      },
      {
        number: 6,
        slug: "retrieval-augmented-generation",
        title: "Retrieval-Augmented Generation (RAG)",
        tag: "Stage 06 · Knowledge Retrieval",
        color: "var(--blue)",
        summary:
          "Solve LLM hallucinations and static training cutoffs. Build enterprise-grade retrieval pipelines combining semantic embeddings, hybrid search, re-ranking, and the RAG Triad evaluation.",
        mentalModel:
          "RAG treats the LLM as an open-book reasoning engine. Instead of forcing billions of domain facts into frozen weights, you retrieve relevant, verifiable evidence at query time and inject it into the context window.",
        coreConcepts: [
          "Document Ingestion & Chunking: Fixed size vs Recursive Character splitting vs Semantic sentence boundary splitting; metadata tagging",
          "Embedding Models & Representation: Contrastive training, bi-encoders (e.g. OpenAI text-embedding-3, BGE, Voyage), and dimensionality tradeoffs",
          "Vector Databases & Indexing: HNSW (Hierarchical Navigable Small World graphs), IVFFlat, vector databases (Chroma, Pinecone, Qdrant, Milvus)",
          "Dense vs Sparse Retrieval: Semantic similarity (Dense) vs exact keyword match (Sparse BM25) and reciprocal rank fusion (RRF)",
          "Re-ranking Pipelines: Cross-Encoder re-rankers (Cohere Rerank, BGE-Reranker) to score (Query, Chunk) pairs with full cross-attention",
          "Context Optimization: Context compression, sliding window retrieval, parent-document retrieval, and lost-in-the-middle positioning",
          "Advanced RAG Architectures: Self-RAG (reflection tokens), Corrective RAG (CRAG), and query rewriting (HyDE - Hypothetical Document Embeddings)",
          "RAG Triad Evaluation: Measuring Context Relevance, Groundedness (Faithfulness), and Answer Relevance using Ragas / TruLens",
        ],
        handsOnProject: {
          title: "Production Multi-Source RAG with Hybrid Re-Ranking & Evaluation",
          description:
            "Build a production document Q&A system with PDF ingestion, hybrid search (Chroma vector + BM25 keyword), Cohere Cross-Encoder re-ranking, and automated evaluation metrics reporting RAG Triad scores.",
        },
        interviewDrill:
          "How does a Cross-Encoder re-ranker differ in computational complexity from a Bi-Encoder embedding model, and why do we use a two-stage retrieval pipeline instead of re-ranking the entire corpus?",
        resources: [
          {
            title: "Building and Evaluating Advanced RAG Applications",
            provider: "DeepLearning.AI & LlamaIndex",
            url: "https://www.deeplearning.ai/short-courses/building-evaluating-advanced-rag/",
            type: "Short Course",
            badge: "Must-Do",
            description: "Learn two core methods for expanding context (Sentence-window and Auto-merging) and evaluate performance with the TruLens RAG triad.",
          },
          {
            title: "Advanced Retrieval for AI with Chroma",
            provider: "DeepLearning.AI & Chroma",
            url: "https://www.deeplearning.ai/short-courses/advanced-retrieval-for-ai/",
            type: "Short Course",
            badge: "DeepLearning.AI Pick",
            description: "Taught by Chroma co-founder Anton Troynikov. Master query expansion, cross-encoder re-ranking, and embedding fine-tuning.",
          },
          {
            title: "Building Systems with the ChatGPT API",
            provider: "DeepLearning.AI & OpenAI",
            url: "https://www.deeplearning.ai/short-courses/building-systems-with-chatgpt/",
            type: "Short Course",
            badge: "Free",
            description: "Break down complex tasks into pipelines, evaluate outputs, and construct robust retrieval chains with Andrew Ng and Isa Fulford.",
          },
          {
            title: "Pinecone: The RAG Handbook",
            provider: "Pinecone",
            url: "https://www.pinecone.io/learn/retrieval-augmented-generation/",
            type: "E-Book & Guide",
            badge: "In-Depth Reference",
            description: "Comprehensive guide to vector search, similarity metrics, index tuning, and production RAG patterns.",
          },
        ],
        nexoraCourseLink: {
          title: "Riviso RAG Architecture & Evaluation Notes",
          href: "/courses/genai-agentic-ai/rag",
        },
      },
      {
        number: 7,
        slug: "agentic-ai",
        title: "Agentic AI & Autonomous Systems",
        tag: "Stage 07 · Autonomous Agents",
        color: "var(--orange)",
        summary:
          "Transform passive chatbots into proactive agents that reason, plan, use tools, maintain state, interact with external environments, and collaborate in multi-agent swarms.",
        mentalModel:
          "An agent combines an LLM (the Brain/Planner), Tools (the Hands/APIs), Memory (Short-term working context + Long-term vector store), and an Execution Loop (Observe -> Think -> Act -> Reflect).",
        coreConcepts: [
          "Reasoning Frameworks: ReAct (Reason + Act loop), Plan-and-Solve, Chain-of-Thought (CoT), and Tree-of-Thoughts (ToT)",
          "Function Calling & Tool Use: JSON schema tool definitions, schema validation (Pydantic), error feedback loops, and idempotency",
          "Memory Architectures: Short-term conversational context, rolling buffer memory, semantic long-term memory, and reflection generation",
          "Agent State Machines: Graph-based stateful orchestration (LangGraph), cycle handling, branching, and state checkpointing",
          "Multi-Agent Orchestration: Supervisor patterns, hierarchical delegation, peer collaboration (CrewAI, AutoGen), and debate systems",
          "Human-in-the-Loop (HITL): Approval gates for sensitive actions, interrupt states, human override, and dry-run execution",
          "Reliability & Guardrails: Output parsers, constrained generation (Instructor / Outlines), rate limiters, fallback chains, and circuit breakers",
          "Agent Observability & Tracing: Step-by-step trace inspection, tool latency tracking, and evaluation using LangSmith / Phoenix / Arize",
        ],
        handsOnProject: {
          title: "Autonomous Code Refactoring & GitHub PR Agent",
          description:
            "Create a multi-agent system with LangGraph/CrewAI that takes a GitHub issue, clones a repo, uses bash/search tools to locate the bug, executes unit tests, writes a fix, and opens a formatted Pull Request.",
        },
        interviewDrill:
          "How do you prevent an autonomous agent from entering an infinite tool-calling loop, and how do you handle tool execution failures gracefully without crashing the conversational state?",
        resources: [
          {
            title: "Multi AI Agent Systems with crewAI",
            provider: "DeepLearning.AI & CrewAI",
            url: "https://www.deeplearning.ai/short-courses/multi-ai-agent-systems-with-crewai/",
            type: "Short Course",
            badge: "DeepLearning.AI Must-Do",
            description: "Taught by João Moura. Design multi-agent workflows where agents take specialized roles, share memory, and collaborate on complex goals.",
          },
          {
            title: "Functions, Tools and Agents with LangChain",
            provider: "DeepLearning.AI & LangChain",
            url: "https://www.deeplearning.ai/short-courses/functions-tools-agents-langchain/",
            type: "Short Course",
            badge: "DeepLearning.AI Classic",
            description: "Harrison Chase walks through OpenAI function calling, tool binding, and building ReAct agent execution loops from scratch.",
          },
          {
            title: "LLM Powered Autonomous Agents",
            provider: "Lilian Weng (Head of Safety Systems at OpenAI)",
            url: "https://lilianweng.github.io/posts/2023-06-23-agent/",
            type: "Research Blog",
            badge: "Seminal Article",
            description: "The most cited synthesis on agent components: planning, memory types, tool use, and safety limitations.",
          },
          {
            title: "Hugging Face Deep Reinforcement Learning Course",
            provider: "Hugging Face",
            url: "https://huggingface.co/learn/deep-rl-course/",
            type: "Course",
            badge: "Advanced",
            description: "Understand Q-learning, Policy Gradients, and environments for sequential decision-making foundations.",
          },
        ],
        nexoraCourseLink: {
          title: "Riviso Agentic AI & Multi-Agent Architecture Field Notes",
          href: "/courses/genai-agentic-ai/agents",
        },
      },
      {
        number: 8,
        slug: "high-level-design-and-ai-systems",
        title: "High-Level Design (HLD) & Distributed AI Systems",
        tag: "Stage 08 · System Scale",
        color: "var(--lavender)",
        summary:
          "Scale AI systems to millions of users. Master high-performance inference serving (vLLM, TensorRT-LLM), continuous batching, distributed caching, rate-limiting gateways, and AI cost optimization.",
        mentalModel:
          "Serving an LLM is completely different from serving a stateless web API. Model weights consume tens of gigabytes of VRAM, generation is memory-bandwidth bounded, tokens stream asynchronously, and KV-cache footprint grows dynamically with every user request.",
        coreConcepts: [
          "LLM Serving Engines: vLLM, Hugging Face TGI, NVIDIA TensorRT-LLM, and Ollama/llama.cpp runtime architectures",
          "PagedAttention & Memory Optimization: Eliminating KV-cache fragmentation by treating GPU VRAM like virtual memory pages",
          "Continuous & Dynamic Batching: Iteration-level scheduling to interleave prompt prefill and token decode phases across concurrent requests",
          "Speculative Decoding: Using a small draft model to generate candidate tokens verified in parallel by the target model in a single forward pass",
          "Caching Strategies for AI: Exact prompt caching, prefix caching (vLLM automatic prefix cache), and semantic caching (GPTCache/Redis)",
          "API Gateway & Orchestration: SSE (Server-Sent Events) streaming, WebSockets, token bucket rate limiters, fallback model routing, and cost budgeting",
          "Distributed Architecture & Sharding: Tensor Parallelism (TP), Pipeline Parallelism (PP), Data Parallelism (DP), and ZeRO memory stages",
          "Observability & Reliability: Tracing distributed spans, measuring Time To First Token (TTFT), Inter-Token Latency (ITL), and SLA monitoring",
        ],
        handsOnProject: {
          title: "Resilient Distributed LLM Gateway with Semantic Caching & Failover",
          description:
            "Design an enterprise AI gateway in Python/FastAPI or Go with Redis semantic caching, dynamic model load-balancing across vLLM and OpenAI, and real-time Prometheus telemetry dashboards.",
        },
        interviewDrill:
          "Design a system capable of handling 50,000 concurrent conversational AI users with sub-500ms TTFT. Detail the GPU compute requirements, KV-cache sizing, and caching topology.",
        resources: [
          {
            title: "Designing Machine Learning Systems",
            provider: "Chip Huyen (O'Reilly Book)",
            url: "https://chiphuyen.com/book/",
            type: "Book & Guide",
            badge: "Industry Standard",
            description: "The holistic guide to ML system design: data pipelines, model serving, monitoring, and continual learning.",
          },
          {
            title: "Patterns for Building LLM-based Systems & Products",
            provider: "Eugene Yan (Amazon)",
            url: "https://eugeneyan.com/writing/llm-patterns/",
            type: "Technical Guide",
            badge: "Practical Goldmine",
            description: "Battle-tested architectural patterns for evaluations, RAG, fine-tuning, guardrails, and caching.",
          },
          {
            title: "Machine Learning System Design Interview",
            provider: "ByteByteGo (Ali Aminian & Alex Xu)",
            url: "https://www.bytebytego.com/",
            type: "Interview Guide",
            badge: "Interview Prep",
            description: "Frameworks for tackling Staff & Principal ML System Design interview loops with end-to-end architecture diagrams.",
          },
          {
            title: "Designing Data-Intensive Applications",
            provider: "Martin Kleppmann",
            url: "https://dataintensive.net/",
            type: "Classic Book",
            badge: "Must-Read",
            description: "The fundamental bible of distributed systems, replication, partitioning, transactions, and stream processing.",
          },
        ],
        nexoraCourseLink: {
          title: "Riviso High-Level Design (HLD) Track",
          href: "/courses/hld",
        },
      },
    ],
  },
  {
    id: "backend-engineering",
    title: "Backend Engineering Roadmap",
    shortTitle: "Backend Engineering",
    role: "Core Platform, High-Throughput APIs & Distributed Systems",
    tagline:
      "A framework-independent path to production-grade backend engineering: networking protocols, database internals, caching topology, event-driven streaming, container orchestration, and high-level distributed systems design.",
    badge: "Active Track",
    status: "active",
    accentColor: "var(--mint)",
    totalStages: 8,
    estimatedWeeks: "24–32 weeks",
    prerequisites: "Comfortable with at least one programming language & basic CLI literacy",
    terminalEndTitle: "◆ Production-ready Backend Platform Engineer",
    terminalEndSub: "distributed architectures, cloud resilience & high scale",
    chips: [
      "Networking & HTTP/3",
      "Framework Specialization",
      "RDBMS & SQL Internals",
      "Redis & Distributed Caches",
      "Auth, OAuth2 & Security",
      "Kafka & Event-Driven",
      "Docker & Kubernetes",
      "HLD & Distributed Scale",
    ],
    phases: [
      {
        id: "protocols-runtimes",
        index: "01",
        title: "Protocols & Framework Specialization",
        sub: "Networking fundamentals and your chosen language runtime",
        numbers: [1, 2],
      },
      {
        id: "data-caching",
        index: "02",
        title: "Data Persistence & Distributed Caching",
        sub: "ACID transactions, indexing internals, and in-memory caches",
        numbers: [3, 4],
      },
      {
        id: "security-messaging",
        index: "03",
        title: "Security, Auth & Asynchronous Messaging",
        sub: "OAuth2, rate limiting, Kafka event streams, and sagas",
        numbers: [5, 6],
      },
      {
        id: "cloud-distributed",
        index: "04",
        title: "Cloud, Containers & Distributed Scale",
        sub: "Docker, Kubernetes, HLD, consistent hashing, and observability",
        numbers: [7, 8],
      },
    ],
    frameworks: [
      {
        id: "nodejs",
        name: "Node.js (Express / Fastify / NestJS)",
        tag: "Hot",
        tagType: "hot",
        color: "#22c55e",
        goal: "Fullstack TypeScript & WebSockets",
        codeFilename: "server.ts",
        language: "JavaScript / TypeScript",
        badge: "Most Ubiquitous",
        pitch:
          "Single-threaded asynchronous event loop powered by Google's V8 engine and libuv. The global powerhouse for high-throughput I/O-bound web services, real-time WebSockets, and unified TypeScript frontend/backend codebases.",
        runtime:
          "V8 execution engine with the libuv event loop. Asynchronous non-blocking I/O with async/await, microtask (Promises) and macrotask (timers/I/O) phases, backed by a C++ thread pool for file system operations and cryptographic hashing.",
        matrix: {
          concurrency: "Single-Thread Event Loop (libuv)",
          memoryFootprint: "~40–60 MB",
          startupTime: "< 250 ms",
          rpsTier: "Very High (I/O) · Moderate (CPU)",
          learningCurve: "Gentle (Unified JS/TS)",
          famousUsers: "Netflix, PayPal, Uber, LinkedIn",
        },
        stageMapping: {
          db: "Prisma, Drizzle ORM, Kysely, pg",
          cache: "ioredis, redis",
          auth: "Jose (JWT RS256), Lucia Auth, Passport",
          streaming: "kafkajs, amqplib (RabbitMQ)",
          container: "node:20-alpine (~55 MB)",
        },
        ecosystem: [
          { name: "High Perf Frameworks", value: "Fastify (maximum req/sec, JSON schema compiler), Express.js (ubiquitous standard), NestJS (opinionated Angular-like enterprise architecture)" },
          { name: "ORMs & DB Drivers", value: "Prisma, Drizzle ORM, Kysely, pg (node-postgres)" },
          { name: "Validation & Types", value: "Zod, Valibot, TypeScript" },
          { name: "Testing", value: "Vitest, Jest, Supertest, Testcontainers Node" },
          { name: "Package Ecosystem", value: "pnpm, npm, Bun" },
        ],
        pros: [
          "Vastest third-party package ecosystem on Earth (npm)",
          "Unified fullstack TypeScript across API, database types, and frontend",
          "Exceptional for high-concurrency I/O and streaming applications",
        ],
        cons: [
          "CPU-intensive computations can freeze the single-threaded event loop unless offloaded to Worker Threads",
          "High architectural freedom requires strict discipline to prevent spaghetti code in large teams",
        ],
        starterSnippet: `// Modern Fastify + TypeScript API with Zod validation
import Fastify from "fastify";
import { z } from "zod";

const app = Fastify({ logger: true });

const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
});

app.get("/health", async () => ({
  status: "ok",
  runtime: "Node.js " + process.version,
  uptime: process.uptime(),
}));

app.listen({ port: 8080, host: "0.0.0.0" }, (err) => {
  if (err) { app.log.error(err); process.exit(1); }
});`,
        resources: [
          {
            title: "Node.js Official Documentation & Guides",
            provider: "OpenJS Foundation",
            url: "https://nodejs.org/docs/latest/api/",
            type: "Documentation",
            badge: "Official",
            description: "Authoritative reference for Event Loop internals, Buffers, Streams, Clustering, and Worker Threads.",
          },
          {
            title: "Fastify: Fast and Low Overhead Web Framework",
            provider: "Fastify Core Team",
            url: "https://fastify.dev/",
            type: "Framework Docs",
            badge: "Top Pick",
            description: "Learn high-throughput routing, plugin architecture, lifecycle hooks, and JSON schema compilation.",
          },
          {
            title: "NestJS Official Enterprise Architecture Guide",
            provider: "NestJS",
            url: "https://docs.nestjs.com/",
            type: "Course & Guide",
            badge: "Enterprise",
            description: "Master dependency injection, modular architecture, guards, interceptors, and microservices in TypeScript.",
          },
        ],
      },
      {
        id: "fastapi",
        name: "FastAPI (Python)",
        tag: "Hot",
        tagType: "hot",
        color: "#06b6d4",
        goal: "AI & LLM Services",
        codeFilename: "main.py",
        language: "Python 3.11+",
        badge: "AI & Data Standard",
        pitch:
          "Modern, high-performance async web framework built on Starlette and Pydantic. The undisputed gold standard for integrating AI/LLM models, data pipelines, and clean REST APIs with automatic interactive OpenAPI documentation.",
        runtime:
          "Python asyncio event loop running on ASGI servers (Uvicorn or Rust-powered Granian). Type annotations powered by Pydantic v2 (core rewritten in Rust) for lightning-fast request deserialization, validation, and serialization.",
        matrix: {
          concurrency: "Asyncio ASGI + uvloop (Event Loop)",
          memoryFootprint: "~50–80 MB",
          startupTime: "< 450 ms",
          rpsTier: "High (Async I/O) · Moderate (CPU)",
          learningCurve: "Very Gentle (Pythonic)",
          famousUsers: "OpenAI, Microsoft, Uber, Netflix",
        },
        stageMapping: {
          db: "SQLAlchemy 2.0 Async, SQLModel, asyncpg",
          cache: "redis-py, aioredis",
          auth: "Authlib, python-jose, PyJWT, OAuth2PasswordBearer",
          streaming: "confluent-kafka, aiokafka, Celery + Redis",
          container: "python:3.12-slim (~70 MB)",
        },
        ecosystem: [
          { name: "ASGI Servers", value: "Uvicorn (uvloop + httptools), Granian (Rust ASGI), Hypercorn" },
          { name: "ORMs & Async DB", value: "SQLAlchemy 2.0 Async, SQLModel, Tortoise ORM, asyncpg" },
          { name: "Schema Validation", value: "Pydantic v2 (Rust-accelerated validation)" },
          { name: "Background Tasks", value: "Celery + Redis/RabbitMQ, ARQ, Taskiq" },
          { name: "Testing", value: "pytest, pytest-asyncio, HTTPX (AsyncClient)" },
        ],
        pros: [
          "Native synergy with the modern AI & Machine Learning ecosystem (PyTorch, vLLM, LangChain, HuggingFace)",
          "Automatic interactive Swagger UI (/docs) and ReDoc generated from Python type hints",
          "Declarative dependency injection system for database sessions, auth, and permissions",
        ],
        cons: [
          "Python GIL requires multi-process workers (e.g. Uvicorn with multiple workers) or C/Rust extensions for CPU concurrency",
          "Mixing blocking sync library calls in async endpoints blocks the event loop unless handled with threadpools",
        ],
        starterSnippet: `# Modern FastAPI + Pydantic v2 API
from fastapi import FastAPI, Depends, HTTPException, status
from pydantic import BaseModel, EmailStr
import time

app = FastAPI(title="Core Platform API", version="1.0.0")

class HealthResponse(BaseModel):
    status: str
    runtime: str
    timestamp: float

@app.get("/health", response_model=HealthResponse)
async def health_check():
    return {
        "status": "ok",
        "runtime": "FastAPI + Python 3.12",
        "timestamp": time.time()
    }`,
        resources: [
          {
            title: "FastAPI Official Interactive User Guide",
            provider: "Tiangolo / FastAPI",
            url: "https://fastapi.tiangolo.com/tutorial/",
            type: "Interactive Guide",
            badge: "Must-Do",
            description: "World-class documentation covering path operations, Pydantic models, OAuth2 flows, and background tasks.",
          },
          {
            title: "Asyncio in Python: Complete Tutorial",
            provider: "Real Python",
            url: "https://realpython.com/async-io-python/",
            type: "Deep-Dive",
            badge: "Foundational",
            description: "Demystify async, await, event loops, tasks, futures, and non-blocking I/O execution mechanics.",
          },
          {
            title: "Full Stack FastAPI Template & Best Practices",
            provider: "Tiangolo (GitHub)",
            url: "https://github.com/fastapi/full-stack-fastapi-template",
            type: "Production Template",
            badge: "Reference",
            description: "Production-ready blueprint with PostgreSQL, Docker Compose, Celery, Alembic migrations, and JWT auth.",
          },
        ],
      },
      {
        id: "go-gin",
        name: "Go + Gin (Golang)",
        tag: "Hot",
        tagType: "hot",
        color: "#00add8",
        goal: "Raw Throughput & Cloud Microservices",
        codeFilename: "main.go",
        language: "Go (Golang 1.22+)",
        badge: "Cloud-Native Power",
        pitch:
          "Compiled, statically typed language engineered at Google for massive network concurrency. The language behind Docker, Kubernetes, Terraform, and CockroachDB. Produces tiny single-binary deployments with microsecond startup.",
        runtime:
          "Compiled directly to native machine code with an integrated M:N user-space scheduler (Go Runtime). Goroutines start with only 2KB of stack memory, multiplexed onto OS threads using non-blocking epoll/kqueue network pollers and CSP channels.",
        matrix: {
          concurrency: "Goroutines (M:N User-Space Scheduler)",
          memoryFootprint: "~10–25 MB (Ultra-low)",
          startupTime: "< 15 ms (Sub-second static)",
          rpsTier: "Extreme (Top of benchmarks)",
          learningCurve: "Moderate (Explicit error handling)",
          famousUsers: "Google, Docker, Kubernetes, Cloudflare",
        },
        stageMapping: {
          db: "sqlc (Type-safe SQL), pgx, GORM",
          cache: "go-redis/v9, rueidis",
          auth: "golang-jwt/jwt/v5, casbin (RBAC)",
          streaming: "segmentio/kafka-go, confluent-kafka-go",
          container: "scratch / distroless:static (~15 MB)",
        },
        ecosystem: [
          { name: "Web Routers", value: "Gin (fast radixed-tree router), Chi (lightweight idiomatic net/http), Fiber (Express-like over Fasthttp)" },
          { name: "SQL & DB Tools", value: "sqlc (generates type-safe Go code from pure SQL queries), pgx, GORM" },
          { name: "Serialization", value: "Standard encoding/json, Protocol Buffers (proto3), FlatBuffers" },
          { name: "Testing", value: "go test (standard library), testify/assert, mockery, dockertest" },
          { name: "Build Tooling", value: "Go Toolchain (compiles into a zero-dependency static binary)" },
        ],
        pros: [
          "Microscopic memory consumption (5–20MB per service) and lightning-fast sub-second cold starts",
          "Concurrency is a first-class language primitive (go keyword, channels, select multiplexer)",
          "Single static binary deployment with no external runtime or virtual machine required",
        ],
        cons: [
          "Strict error handling requires verbose boilerplate (if err != nil { return err })",
          "No classical OOP inheritance (struct embedding and interfaces require idiomatic mindset shift)",
        ],
        starterSnippet: `// Idiomatic Gin HTTP Service with graceful shutdown
package main

import (
	"net/http"
	"github.com/gin-gonic/gin"
)

type HealthResponse struct {
	Status  string \`json:"status"\`
	Runtime string \`json:"runtime"\`
}

func main() {
	r := gin.New()
	r.Use(gin.Recovery(), gin.Logger())

	r.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, HealthResponse{
			Status:  "ok",
			Runtime: "Go 1.22 + Gin",
		})
	})

	r.Run(":8080")
}`,
        resources: [
          {
            title: "A Tour of Go (Interactive Concurrency & Language Basics)",
            provider: "Go Dev Team (Google)",
            url: "https://go.dev/tour/",
            type: "Interactive Tutorial",
            badge: "Official",
            description: "Step-by-step introduction to Go syntax, pointers, structs, interfaces, goroutines, and channels.",
          },
          {
            title: "Gin Web Framework Official Documentation",
            provider: "Gin-Gonic",
            url: "https://gin-gonic.com/docs/",
            type: "Framework Docs",
            badge: "Essential",
            description: "Guides on routing, custom middleware pipelines, JSON binding, file uploads, and graceful shutdown.",
          },
          {
            title: "Learn Go with Tests",
            provider: "Chris James",
            url: "https://quii.gitbook.io/learn-go-with-tests/",
            type: "Interactive Book",
            badge: "Must-Read",
            description: "Build robust Go microservices using Test-Driven Development (TDD), mocks, and dependency injection.",
          },
        ],
      },
      {
        id: "spring-boot",
        name: "Spring Boot (Java)",
        tag: "Old school · Industry standard",
        tagType: "oldschool",
        color: "#10b981",
        goal: "Enterprise Banking & Job Security",
        codeFilename: "PlatformApplication.java",
        language: "Java 21 LTS / Kotlin",
        badge: "Enterprise Backbone",
        pitch:
          "The undisputed workhorse of global tier-1 banking, Fortune 500 platforms, and mission-critical enterprise systems. Decades of hardened transaction management, declarative security, and an immense global corporate hiring demand.",
        runtime:
          "Java Virtual Machine (JVM) with HotSpot JIT compiler and G1 / ZGC garbage collectors. Java 21+ introduces Project Loom Virtual Threads, enabling millions of lightweight concurrent threads with traditional blocking imperative code.",
        matrix: {
          concurrency: "Project Loom Virtual Threads / JVM Pools",
          memoryFootprint: "~200–350 MB (JVM Heap)",
          startupTime: "~1.5–4 sec",
          rpsTier: "Very High (JIT-optimized)",
          learningCurve: "Steep (Enterprise annotations)",
          famousUsers: "JPMorgan, Netflix, Amazon, Alibaba",
        },
        stageMapping: {
          db: "Spring Data JPA, Hibernate, jOOQ, Flyway",
          cache: "Spring Cache + Redis (Lettuce/Jedis)",
          auth: "Spring Security 6 (OAuth2 Resource Server, OIDC)",
          streaming: "Spring for Apache Kafka, Spring Cloud Stream",
          container: "eclipse-temurin:21-jre (~180 MB)",
        },
        ecosystem: [
          { name: "Web Framework", value: "Spring Boot 3, Spring Web MVC (Servlet model) / Spring WebFlux (Reactive Streams)" },
          { name: "Persistence", value: "Spring Data JPA, Hibernate, jOOQ (type-safe SQL), Flyway / Liquibase migrations" },
          { name: "Security & Auth", value: "Spring Security (OAuth 2.0 Resource Server, OIDC, JWT, Method-level security)" },
          { name: "Build Systems", value: "Gradle, Apache Maven" },
          { name: "Observability", value: "Spring Boot Actuator, Micrometer, Prometheus, OpenTelemetry" },
        ],
        pros: [
          "Unmatched enterprise battle-testing, backward compatibility, and massive corporate job market demand",
          "Declarative transaction boundaries (@Transactional) and rock-solid ACID database integration",
          "Project Loom virtual threads provide high concurrency without callback or reactive complexity",
        ],
        cons: [
          "Higher baseline memory footprint (200MB+ JVM heap) and slower cold start times (unless using GraalVM Native Image)",
          "Steeper initial learning curve with heavy annotation abstraction magic (Inversion of Control & DI)",
        ],
        starterSnippet: `// Modern Spring Boot 3 REST Controller with Java 21 Record
package com.riviso.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;

@SpringBootApplication
@RestController
public class PlatformApplication {

    public record HealthResponse(String status, String runtime, long timestamp) {}

    @GetMapping("/health")
    public HealthResponse health() {
        return new HealthResponse("ok", "Spring Boot 3.3 (Java 21 Virtual Threads)", System.currentTimeMillis());
    }

    public static void main(String[] args) {
        SpringApplication.run(PlatformApplication.class, args);
    }
}`,
        resources: [
          {
            title: "Spring Boot Official Guides & Tutorials",
            provider: "VMware Tanzu / Spring.io",
            url: "https://spring.io/guides",
            type: "Tutorials",
            badge: "Official",
            description: "Building RESTful web services, securing APIs with Spring Security, and consuming relational databases.",
          },
          {
            title: "Riviso Spring Boot 10-Day Accelerated Track",
            provider: "Riviso Engineering Notes",
            url: "/courses/spring-boot/day-1",
            type: "Curriculum Track",
            badge: "Riviso Notes",
            description: "Deep dive from controllers and services to JPA, exception handling, and shipping real REST APIs.",
          },
          {
            title: "Baeldung Spring Boot Tutorials",
            provider: "Baeldung",
            url: "https://www.baeldung.com/spring-boot",
            type: "Guide Series",
            badge: "Industry Standard",
            description: "Comprehensive step-by-step technical guides for every Spring component, annotation, and pattern.",
          },
        ],
      },
      {
        id: "rails",
        name: "Ruby on Rails",
        tag: "For nerds / Artisanal",
        tagType: "nerd",
        color: "#e11d48",
        goal: "Solo Founder & Maximum Velocity",
        codeFilename: "health_controller.rb",
        language: "Ruby 3.3+",
        badge: "Artisanal Speed",
        pitch:
          "The legendary full-stack developer velocity powerhouse. Conceived by DHH, Rails powers Shopify ($1T+ cumulative GMV), GitHub, Airbnb, GitLab, and Basecamp. Convention-over-configuration elegance for craftspeople who want to ship entire production systems solo.",
        runtime:
          "Ruby 3.3+ with YJIT (Rust-backed Just-In-Time compiler). Multi-threaded application server (Puma). Solid Queue for database-backed background jobs, ActionCable for WebSockets, and Hotwire (Turbo + Stimulus) for real-time reactivity without client-side JS framework sprawl.",
        matrix: {
          concurrency: "Multi-Thread Puma + YJIT (Process & Threads)",
          memoryFootprint: "~80–140 MB",
          startupTime: "~1–2 sec",
          rpsTier: "Moderate-High (YJIT-accelerated)",
          learningCurve: "Moderate (The Rails Convention)",
          famousUsers: "Shopify, GitHub, Airbnb, GitLab, Basecamp",
        },
        stageMapping: {
          db: "Active Record (Built-in)",
          cache: "Solid Cache / Redis (redis-rb)",
          auth: "Devise, Rodauth, JWT gem",
          streaming: "Karafka, Sidekiq, Solid Queue",
          container: "ruby:3.3-slim (~110 MB)",
        },
        ecosystem: [
          { name: "Web Stack", value: "Rails 7+, Puma application server, Propshaft asset pipeline" },
          { name: "Active Record ORM", value: "The most intuitive, expressive relational ORM in the software industry" },
          { name: "Background Jobs", value: "Solid Queue (DB-backed, no Redis required), Sidekiq + Redis" },
          { name: "Real-time & WebSockets", value: "ActionCable, Hotwire (Turbo 8 + Stimulus)" },
          { name: "Testing", value: "RSpec, Capybara, FactoryBot, Minitest" },
        ],
        pros: [
          "Unrivaled solo-developer velocity: scaffolding, migrations, mailers, and auth built-in",
          "Convention over configuration eliminates thousands of lines of boilerplate setup",
          "ActiveRecord gives unparalleled data manipulation expressiveness and productivity",
        ],
        cons: [
          "Lower raw throughput per CPU core compared to compiled Go or async C++",
          "Heavy metaprogramming magic requires engineers to learn and respect the 'Rails Way'",
        ],
        starterSnippet: `# Modern Rails 7+ API controller
class Api::V1::HealthController < ApplicationController
  def show
    render json: {
      status: "ok",
      framework: "Ruby on Rails #{Rails.version}",
      ruby_version: RUBY_VERSION,
      yjit_enabled: RubyVM::YJIT.enabled?,
      timestamp: Time.current.to_i
    }, status: :ok
  end
end`,
        resources: [
          {
            title: "Ruby on Rails Official Guides",
            provider: "Rails Core Team",
            url: "https://guides.rubyonrails.org/",
            type: "Documentation",
            badge: "Official",
            description: "The gold standard of web framework documentation: Active Record, routing, controllers, and security.",
          },
          {
            title: "GoRails Screencasts & Engineering Blueprints",
            provider: "GoRails (Chris Oliver)",
            url: "https://gorails.com/",
            type: "Video Series",
            badge: "Practitioner Pick",
            description: "Hands-on tutorials for payment processing (Stripe), background workers, multi-tenancy, and Turbo streams.",
          },
          {
            title: "The Rails 7 Way",
            provider: "Lucas Dohmen & Obie Fernandez",
            url: "https://leanpub.com/therails7way",
            type: "Book",
            badge: "Comprehensive",
            description: "The definitive reference manual for architecting and deploying professional Ruby on Rails applications.",
          },
        ],
      },
    ],
    stages: [
      {
        number: 1,
        slug: "networking-and-web-protocols",
        title: "Computer Networking & Web Protocols",
        tag: "Stage 01 · Protocols & Transport",
        color: "var(--blue)",
        summary:
          "Understand how packets traverse the wire, how connections are established, and how modern transport and application layer protocols govern client-server communication.",
        mentalModel:
          "Every backend request is fundamentally an ephemeral TCP stream or UDP datagram transformed by transport and application protocol parsers into structured memory buffers. You cannot build scalable APIs without mastering the physical constraints of sockets, handshakes, and packet serialization.",
        coreConcepts: [
          "OSI 7-Layer vs TCP/IP 4-Layer Model: Transport Layer (L4 TCP/UDP) vs Application Layer (L7 HTTP, gRPC, DNS)",
          "TCP Deep-Dive: Three-Way Handshake (SYN, SYN-ACK, ACK), Flow Control (Sliding Window), Congestion Control (Cubic, BBR), and TCP Slow-Start",
          "UDP & QUIC Protocol: Connectionless datagrams, head-of-line blocking elimination, 0-RTT handshakes, and UDP socket mechanics",
          "HTTP Protocol Evolution: HTTP/1.1 (Keep-Alive, pipelining bottlenecks) vs HTTP/2 (binary framing, stream multiplexing, HPACK header compression) vs HTTP/3 (QUIC over UDP)",
          "Socket Lifecycle & OS Networking: BSD Sockets API, socket(), bind(), listen(), accept(), non-blocking sockets, and epoll/kqueue event polling",
          "DNS Resolution & Infrastructure: Recursive resolvers, Root/TLD/Authoritative nameservers, A/AAAA/CNAME/SRV records, TTL caching, and Anycast routing",
          "TLS/SSL 1.3 Cryptography: Asymmetric key exchange (ECDHE), symmetric session cipher suites (AES-GCM / ChaCha20-Poly1305), X.509 Certificate Authorities, and ALPN negotiation",
          "Bidirectional Communication: WebSockets (HTTP Upgrade handshake, frame masking) vs Server-Sent Events (SSE over HTTP) vs Long Polling",
          "gRPC & Protocol Buffers: Compact binary wire format, strict schema definition (.proto), HTTP/2 multiplexed streams, bi-directional streaming vs REST JSON",
        ],
        handsOnProject: {
          title: "Raw Multi-Threaded HTTP/1.1 Server & Reverse Proxy From Scratch",
          description:
            "Build an HTTP/1.1 server from bare OS sockets (using C, Go, or Python) that parses raw HTTP request headers, handles Keep-Alive connection pooling, enforces timeouts, and forwards requests to upstream origin servers with X-Forwarded-For headers.",
        },
        interviewDrill:
          "Walk through the entire network lifecycle when a client requests https://api.service.com/checkout: DNS resolution, TCP handshake, TLS 1.3 key exchange, HTTP/2 multiplexed stream transmission, and connection teardown (FIN vs RST).",
        resources: [
          {
            title: "Computer Networking: A Top-Down Approach (Kurose & Ross)",
            provider: "Pearson Higher Ed",
            url: "https://gaia.cs.umass.edu/kurose_ross/index.php",
            type: "Textbook",
            badge: "The Bible",
            description: "The legendary computer networking textbook covering transport layer, congestion algorithms, and application protocols.",
          },
          {
            title: "High Performance Browser Networking (Ilya Grigorik)",
            provider: "O'Reilly / Google",
            url: "https://hpbn.co/",
            type: "Free Online Book",
            badge: "Must-Read / Free",
            description: "Essential guide to TCP, UDP, TLS 1.3, HTTP/2, HTTP/3, WebSocket performance, and network latency physics.",
          },
          {
            title: "Cloudflare Learning: How Does the Internet Work?",
            provider: "Cloudflare",
            url: "https://www.cloudflare.com/learning/",
            type: "Guides",
            badge: "Visual & Free",
            description: "Crisp architectural breakdowns of DNS, BGP, TCP vs UDP, SSL/TLS handshakes, and DDoS mitigation.",
          },
        ],
        nexoraCourseLink: {
          title: "Riviso Computer Networking & Request Lifecycle Notes",
          href: "/courses/networking/request-lifecycle",
        },
      },
      {
        number: 2,
        slug: "framework-specialization-and-runtimes",
        title: "Language Runtime & Framework Specialization",
        tag: "Stage 02 · Frameworks & Runtimes",
        color: "var(--yellow)",
        summary:
          "Choose your primary backend framework based on your product goals. Master its concurrency model, memory runtime, routing mechanics, middleware pipelines, and idiomatic production ecosystem.",
        mentalModel:
          "Frameworks are ergonomic abstractions over an execution runtime. The architectural differences between frameworks trace back to how their concurrency models handle I/O: single-threaded event loop (Node.js), coroutine event loop (Python asyncio), M:N green threads (Go goroutines), OS threads with Project Loom (Java), or multi-process Puma with YJIT (Ruby).",
        coreConcepts: [
          "Runtime Concurrency Models: Event loop + libuv (Node.js) vs Asyncio (Python) vs Goroutines with M:N scheduler (Go) vs Virtual Threads (Java 21 Project Loom) vs Multi-process Puma (Rails)",
          "Clean Layered Architecture: Controllers/Handlers -> Business Services -> Data Repositories -> Domain Entities; separating I/O transport from business logic",
          "Middleware Pipelines & Interceptors: Request context propagation, correlation IDs (X-Request-ID), timing headers, CORS negotiation, recovery panic/exception handlers",
          "Serialization & Schema Validation: Declarative schema validation (Zod, Pydantic, struct tags), JSON deserialization benchmarks, and serialization reflection costs",
          "12-Factor App Configuration: Environment variable injection, secrets isolation, dynamic configuration reload, and avoiding hardcoded runtime state",
          "Database Abstraction & Query Builders: Raw SQL vs query builders (sqlc, Kysely) vs Object-Relational Mappers (Prisma, SQLAlchemy, Hibernate, ActiveRecord)",
          "Graceful Shutdown & Signal Trapping: Intercepting SIGINT/SIGTERM, stopping ingress traffic, draining in-flight requests, flushing buffered logs, and closing DB pools",
          "Automated Testing Strategies: Unit tests, mock boundaries, integration tests with real databases using Testcontainers, and end-to-end HTTP contract testing",
        ],
        handsOnProject: {
          title: "Production-Grade REST API with Structured Middleware & Graceful Shutdown",
          description:
            "Implement an idiomatic microservice in your chosen framework (Node.js, FastAPI, Go, Spring Boot, or Rails) featuring structured JSON logging with correlation IDs, declarative input validation, health/readiness endpoints, and graceful connection draining.",
        },
        interviewDrill:
          "Contrast the concurrency model of Node.js (single-threaded event loop) with Go (goroutines with M:N cooperative scheduler) and Java Spring Boot (worker thread pool vs Project Loom virtual threads) under 10,000 concurrent I/O-bound requests.",
        resources: [
          {
            title: "The Twelve-Factor App Methodology",
            provider: "Adam Wiggins (Heroku)",
            url: "https://12factor.net/",
            type: "Architecture Standard",
            badge: "Must-Read",
            description: "The timeless blueprint for building modern, cloud-native, scalable, and maintainable backend services.",
          },
          {
            title: "Testcontainers: Real Dependencies for Integration Tests",
            provider: "AtomicJar / Docker",
            url: "https://testcontainers.com/",
            type: "Testing Tool",
            badge: "Industry Standard",
            description: "Spin up throwaway Docker instances of PostgreSQL, Redis, and Kafka directly inside automated test suites.",
          },
        ],
        nexoraCourseLink: {
          title: "Riviso Low-Level Design & SOLID Principles Notes",
          href: "/courses/lld/solid-overview",
        },
      },
      {
        number: 3,
        slug: "relational-databases-and-sql-internals",
        title: "Relational Databases & SQL Storage Internals",
        tag: "Stage 03 · Relational Storage",
        color: "var(--mint)",
        summary:
          "Master database storage engines, ACID transactions, relational modeling, query planners, indexing data structures, and high-concurrency connection management.",
        mentalModel:
          "A relational database is an on-disk page engine optimized for atomic reads and writes. High performance is achieved by structuring schemas and queries so the storage engine accesses the minimum number of disk blocks and buffer pool pages.",
        coreConcepts: [
          "Relational Modeling & Normalization: 1NF, 2NF, 3NF, Boyce-Codd (BCNF), surrogate vs natural keys, foreign key constraints, and intentional denormalization",
          "Storage Engine Architecture: Disk pages (8KB Postgres / 16KB InnoDB), Buffer Pool management, Write-Ahead Logging (WAL) for durability, and row vs columnar layouts",
          "B-Trees & B+Trees Indexing: Balanced tree branching factor, clustered vs secondary indexes, composite index leftmost prefix rule, index-only scans, and covering indexes",
          "ACID Transaction Guarantees: Atomicity (WAL undo logs), Consistency (constraints), Isolation (concurrency control), Durability (fsync write guarantees)",
          "Transaction Isolation Levels: Read Uncommitted, Read Committed, Repeatable Read, and Serializable; Dirty reads, non-repeatable reads, phantom reads, and serialization anomalies",
          "Multi-Version Concurrency Control (MVCC): How Postgres and MySQL handle non-blocking concurrent reads and writes using tuple versioning (xmin, xmax) and VACUUM garbage collection",
          "Database Locking Mechanics: Shared (S) vs Exclusive (X) locks, row locks (SELECT FOR UPDATE), intention locks, lock escalation, and deadlock detection algorithms",
          "Query Execution Plans: EXPLAIN ANALYZE interpretation, cost estimation, Sequential Scan vs Index Scan vs Bitmap Index Scan, Nested Loop vs Hash Join vs Merge Join",
          "Connection Pooling & Sizing: Why thread-per-connection databases collapse under high connections, pool sizing formula ((cores * 2) + disk spindles), and PgBouncer connection pooling",
        ],
        handsOnProject: {
          title: "High-Concurrency Financial Ledger with Strict ACID Guarantees",
          description:
            "Design a double-entry banking ledger database schema in PostgreSQL. Write concurrent fund transfer transactions with row-level pessimistic locking (SELECT FOR UPDATE), idempotency keys, and stress-test concurrent balance transfers with zero race conditions.",
        },
        interviewDrill:
          "Explain how PostgreSQL MVCC handles UPDATE queries without mutating data in-place. Why do heavy UPDATE workloads lead to table bloat, and how does the autovacuum daemon reclaim dead space?",
        resources: [
          {
            title: "Use The Index, Luke! — A Guide to Database Performance",
            provider: "Markus Winand",
            url: "https://use-the-index-luke.com/",
            type: "Interactive Guide",
            badge: "The Index Bible",
            description: "The ultimate reference on B-tree index mechanics, composite indexing, SQL execution plans, and query optimization.",
          },
          {
            title: "PostgreSQL Official Internals & Documentation",
            provider: "PostgreSQL Global Development Group",
            url: "https://www.postgresql.org/docs/current/internals.html",
            type: "Documentation",
            badge: "Deep Reference",
            description: "Authoritative manual on PostgreSQL storage engines, page layout, WAL, and MVCC transaction processing.",
          },
          {
            title: "Database Internals: A Deep Dive (Alex Petrov)",
            provider: "O'Reilly Media",
            url: "https://www.databass.dev/",
            type: "Book",
            badge: "Masterpiece",
            description: "Comprehensive guide to distributed storage engines, B-Trees, LSM-Trees, and concurrency control algorithms.",
          },
        ],
        nexoraCourseLink: {
          title: "Riviso Databases: Storage Engines, Replication & Sharding",
          href: "/courses/hld/db",
        },
      },
      {
        number: 4,
        slug: "nosql-and-distributed-caching",
        title: "NoSQL, Key-Value Stores & Distributed Caching",
        tag: "Stage 04 · Fast Memory & NoSQL",
        color: "var(--orange)",
        summary:
          "Overcome relational bottlenecks with in-memory caching, distributed key-value stores, document databases, and write-heavy distributed storage engines.",
        mentalModel:
          "Fast access is a function of memory proximity and simplified access patterns. Relational DBs provide arbitrary query flexibility at high latency; in-memory caches and NoSQL databases trade relational joins for sub-millisecond, key-addressed predictability.",
        coreConcepts: [
          "Caching Topologies & Patterns: Cache-Aside (Lazy Loading), Write-Through, Write-Behind (Write-Back), and Refresh-Ahead strategies",
          "Cache Invalidation & Pathology: Cache Stampede (Thundering Herd) & probabilistic early expiration (XFetch), Cache Penetration (Bloom filters), Cache Breakdown, and Cache Avalanche",
          "Redis Internals & In-Memory Data Structures: Strings, Hashes, Lists, Sets, Sorted Sets (SkipLists), HyperLogLog, Bitmaps, and memory overhead",
          "Redis Memory Management & Eviction: Maxmemory limits, eviction policies (allkeys-lru, volatile-lru, allkeys-lfu, volatile-ttl), and memory fragmentation ratio",
          "Redis Persistence & High Availability: RDB point-in-time snapshots vs AOF (Append-Only File with fsync policies), Redis Sentinel automatic failover, and Redis Cluster 16,384 hash slots",
          "Distributed Locking with Redis: SET NX PX single-instance lock vs Redlock algorithm, lease timeouts, lock renewal heartbeats, and fencing tokens",
          "Document Stores (MongoDB): BSON document model, embedding vs referencing relations, replica sets (oplog), read/write concerns, and compound indexes",
          "Log-Structured Merge-Trees (LSM-Trees): MemTables, Write-Ahead Logs, SSTables (Sorted String Tables), and compaction strategies in write-heavy databases (Cassandra, ScyllaDB, DynamoDB)",
        ],
        handsOnProject: {
          title: "Sub-Millisecond Real-Time Gaming Leaderboard with Redis & Bloom Filters",
          description:
            "Build a high-throughput gaming leaderboard backend using Redis Sorted Sets (ZADD, ZREVRANGEBYSCORE, ZRANK) combined with a Bloom filter to prevent cache penetration, backed by a write-behind asynchronous batch worker updating PostgreSQL.",
        },
        interviewDrill:
          "How do you protect a distributed caching tier from a Cache Stampede when a high-traffic cache key expires? Compare mutex-locking with probabilistic early expiration (XFetch algorithm).",
        resources: [
          {
            title: "Redis Official Documentation & University",
            provider: "Redis.io",
            url: "https://redis.io/docs/latest/",
            type: "Interactive Learning",
            badge: "Essential",
            description: "Master Redis data structures, pipeline transactions, Lua scripting, Streams, and clustering.",
          },
          {
            title: "Designing Data-Intensive Applications (Martin Kleppmann)",
            provider: "O'Reilly Media",
            url: "https://dataintensive.net/",
            type: "Classic Book",
            badge: "Mandatory",
            description: "Chapter 3: Storage and Retrieval (B-Trees vs LSM-Trees, SSTables, MemTables) is required reading.",
          },
        ],
        nexoraCourseLink: {
          title: "Riviso High-Level Design: Caching & Distributed Caches",
          href: "/courses/hld/caching",
        },
      },
      {
        number: 5,
        slug: "authentication-authorization-and-api-security",
        title: "Authentication, Authorization & API Security",
        tag: "Stage 05 · Auth & Security",
        color: "var(--pink)",
        summary:
          "Protect backend APIs, customer identities, and sensitive infrastructure against unauthorized access, data breaches, cryptographic vulnerabilities, and web exploits.",
        mentalModel:
          "Security is not a plugin added at the end; it is a defense-in-depth perimeter where every network call, header, token, and payload is considered untrusted until cryptographically verified and bounded by strict rate limits.",
        coreConcepts: [
          "Stateful Sessions vs Stateless Tokens: Secure HttpOnly SameSite cookies with Redis session store vs JSON Web Tokens (JWT: Header, Payload, Signature)",
          "JWT Security & Cryptographic Algorithms: Symmetric HMAC-SHA256 (HS256) vs Asymmetric RSA/ECDSA (RS256/ES256), public key distribution via JWKS (JSON Web Key Set)",
          "Token Lifecycle & Revocation: Short-lived access tokens (15m), rotating refresh tokens with reuse detection / family invalidation, and Redis revocation blacklists",
          "OAuth 2.0 & OpenID Connect (OIDC): Authorization Code Flow with PKCE (Proof Key for Code Exchange), Client Credentials flow, scopes, claims, and Identity Providers (IdP)",
          "Access Control Paradigms: Role-Based Access Control (RBAC), Attribute-Based Access Control (ABAC), and centralized Policy as Code (Open Policy Agent - OPA)",
          "Password Hashing & Key Derivation: Salt, pepper, work factors, and modern memory-hard hashing algorithms (Argon2id, bcrypt, PBKDF2) resistant to GPU/ASIC attacks",
          "API Rate Limiting Algorithms: Token Bucket, Leaky Bucket, Fixed Window, Sliding Window Log, and Sliding Window Counter implemented with Redis atomic scripts",
          "OWASP Top 10 API Security: SQL Injection (SQLi), Cross-Site Scripting (XSS), Cross-Site Request Forgery (CSRF), Server-Side Request Forgery (SSRF), and Broken Object Level Authorization (BOLA/IDOR)",
          "Secrets & Cryptography at Rest: HashiCorp Vault, AWS Secrets Manager, envelope encryption, KMS keys, and zero-trust internal service-to-service mTLS",
        ],
        handsOnProject: {
          title: "Zero-Trust OAuth2 & Sliding-Window Rate Limiting Gateway",
          description:
            "Build an authentication and security gateway service that verifies RS256 JWT tokens using a dynamic JWKS endpoint, enforces fine-grained RBAC permissions, and implements a sub-millisecond Redis sliding-window rate limiter per API key.",
        },
        interviewDrill:
          "Why should access tokens never be stored in browser localStorage for web applications? Contrast localStorage with HttpOnly SameSite=Strict cookies in the context of XSS and CSRF vectors.",
        resources: [
          {
            title: "OWASP API Security Top 10",
            provider: "Open Worldwide Application Security Project (OWASP)",
            url: "https://owasp.org/www-project-api-security/",
            type: "Security Standard",
            badge: "Essential",
            description: "The authoritative catalog of the most critical security vulnerabilities affecting modern backend APIs.",
          },
          {
            title: "OAuth 2.0 and OpenID Connect (OIDC) Explained",
            provider: "Auth0 / Okta",
            url: "https://auth0.com/intro-to-iam/what-is-oauth-2",
            type: "Guide & Diagrams",
            badge: "Clear Intuition",
            description: "Comprehensive visual breakdown of OAuth 2.0 grant types, PKCE flow, and identity token validation.",
          },
          {
            title: "The Practical Cryptography for Developers Book",
            provider: "Svetlin Nakov",
            url: "https://cryptobook.nakov.com/",
            type: "Free Online Book",
            badge: "Practical",
            description: "Hands-on guide to hashes, MACs, symmetric and asymmetric ciphers, key derivation, and digital signatures.",
          },
        ],
        nexoraCourseLink: {
          title: "Riviso High-Level Design: API Gateway Architecture",
          href: "/courses/hld/api-gateway",
        },
      },
      {
        number: 6,
        slug: "asynchronous-messaging-and-event-driven-architecture",
        title: "Asynchronous Messaging & Event-Driven Architecture",
        tag: "Stage 06 · Event Streaming",
        color: "var(--lavender)",
        summary:
          "Decouple synchronous request-response bottlenecks. Build resilient, loosely coupled microservices with message brokers, distributed commit logs, and distributed transaction patterns.",
        mentalModel:
          "Synchronous RPCs (HTTP/gRPC) couple producer and consumer in both time and availability: if the downstream service fails or slows down, the entire upstream chain collapses. Asynchronous messaging decouples systems: producers append immutable events to a durable log; consumers process at their own rate.",
        coreConcepts: [
          "Message Queues vs Distributed Event Logs: Point-to-Point message brokers (RabbitMQ, AWS SQS) vs Partitioned Distributed Commit Logs (Apache Kafka, Redpanda)",
          "RabbitMQ & AMQP Mechanics: Exchanges (Direct, Fanout, Topic, Headers), Queues, Bindings, consumer acknowledgments (ACK/NACK), and prefetch counts",
          "Apache Kafka Architecture Internals: Topics, Partitions, Offsets, Consumer Groups, Brokers, ZooKeeper vs KRaft consensus, and write-ahead segment files",
          "Replication & Fault Tolerance in Kafka: Replication factor, Leader vs Follower partitions, In-Sync Replicas (ISR), and acks=all / min.insync.replicas",
          "Message Delivery Semantics: At-most-once, At-least-once, and Exactly-Once Semantics (EOS via Kafka idempotent producers and transactional APIs)",
          "Consumer Scalability & Rebalancing: Consumer lag metrics, partition rebalance protocols (Eager vs Cooperative Sticky), Poison Pills, and Dead Letter Queues (DLQ)",
          "Distributed Transaction Patterns: Why Two-Phase Commit (2PC) does not scale vs the Saga Pattern (Choreography vs Orchestration) with compensating transactions",
          "Reliability & Data Consistency: Transactional Outbox Pattern with Change Data Capture (Debezium / Kafka Connect), Idempotent Consumers with deduplication tables",
          "Event Sourcing & CQRS: Storing events as the immutable source of truth vs separating Command (write mutation) models from Query (read projection) models",
        ],
        handsOnProject: {
          title: "Fault-Tolerant E-Commerce Order Processing Pipeline with Kafka & Outbox Pattern",
          description:
            "Build an order checkout microservice that writes orders to PostgreSQL using the Transactional Outbox Pattern, uses CDC to publish events to a partitioned Kafka topic, processes inventory & payment via concurrent consumer groups, and routes poison messages to a DLQ.",
        },
        interviewDrill:
          "What is the Transactional Outbox pattern, why does dual-writing directly to a database and a message broker risk data inconsistency, and how does Change Data Capture (CDC) resolve this race condition?",
        resources: [
          {
            title: "Apache Kafka: The Definitive Guide (Gwen Shapira et al.)",
            provider: "Confluent & O'Reilly",
            url: "https://www.confluent.io/resources/kafka-the-definitive-guide/",
            type: "Free E-Book",
            badge: "The Kafka Bible",
            description: "Authoritative architectural guide to Kafka topics, partition design, broker internals, and stream processing.",
          },
          {
            title: "Microservices Patterns: With Examples in Java (Chris Richardson)",
            provider: "Manning Publications",
            url: "https://microservices.io/patterns/index.html",
            type: "Pattern Catalog",
            badge: "Industry Standard",
            description: "The definitive reference on the Saga Pattern, CQRS, Event Sourcing, and Transactional Outbox.",
          },
        ],
        nexoraCourseLink: {
          title: "Riviso High-Level Design: Message Queues & Streaming (Kafka / SQS / RabbitMQ)",
          href: "/courses/hld/messaging",
        },
      },
      {
        number: 7,
        slug: "containerization-cicd-and-cloud-infrastructure",
        title: "Containerization, CI/CD & Cloud Infrastructure",
        tag: "Stage 07 · Cloud & Containers",
        color: "var(--mint)",
        summary:
          "Package, ship, and orchestrate backend services reliably. Master container internals, Linux namespaces, Kubernetes primitives, automated CI/CD pipelines, and cloud primitives.",
        mentalModel:
          "'It works on my machine' is an infrastructure failure. Containers are not mini virtual machines; they are standard Linux processes isolated by kernel namespaces and bounded by cgroups. Understanding container internals turns Docker and Kubernetes from black boxes into predictable tools.",
        coreConcepts: [
          "Container Internals from Scratch: Linux Kernel Namespaces (PID, Mount, Net, IPC, UTS), Control Groups (cgroups v2 for CPU/Memory quotas), and Union File Systems (overlayfs)",
          "Production Docker Mastery: Multi-stage builds, non-root user execution, minimal base images (Google Distroless, Alpine, Scratch), layer caching optimization, and dive inspection",
          "Container Networking: Docker bridge networks, host networking, port mapping, internal DNS resolution, and inter-container communication",
          "Kubernetes Core Primitives: Pods, ReplicaSets, Deployments, Services (ClusterIP, NodePort, LoadBalancer), Ingress controllers, and ConfigMaps / Secrets",
          "Pod Lifecycle & Reliability: Liveness probes (process restart), Readiness probes (traffic routing), Startup probes, and graceful SIGTERM handling with preStop lifecycle hooks",
          "Continuous Integration (CI): Automated linting, static analysis, unit/integration test suites, container vulnerability scanning (Trivy), and reproducible artifact generation via GitHub Actions",
          "Continuous Delivery (CD) & Deployment Strategies: Rolling Updates, Blue/Green deployments, Canary releases with traffic percentage splitting, and GitOps with ArgoCD",
          "Cloud Primitives & Infrastructure as Code (IaC): AWS ECS / EKS, S3 object storage, VPC subnets, security groups, IAM least-privilege roles, and declarative Terraform provisioning",
        ],
        handsOnProject: {
          title: "Zero-Downtime Multi-Service Cloud Deployment Pipeline",
          description:
            "Dockerize a backend API with a multi-stage distroless build under 30MB, construct Kubernetes deployment manifests with horizontal pod autoscaling (HPA) and rolling updates, and automate the entire lint-test-build-push pipeline using GitHub Actions.",
        },
        interviewDrill:
          "What is the difference between a Kubernetes Liveness probe and a Readiness probe? What cascading failure happens if a database slows down and an API's Liveness probe is configured to ping the database?",
        resources: [
          {
            title: "Docker Official Documentation & Best Practices",
            provider: "Docker Inc.",
            url: "https://docs.docker.com/develop/develop-images/dockerfile_best-practices/",
            type: "Documentation",
            badge: "Essential",
            description: "Guide to writing clean, secure, multi-stage Dockerfiles with optimized layer caching.",
          },
          {
            title: "Kubernetes Up & Running (Kelsey Hightower et al.)",
            provider: "O'Reilly Media",
            url: "https://www.oreilly.com/library/view/kubernetes-up-and/9781098110192/",
            type: "Book",
            badge: "Top Pick",
            description: "Practical guide to deploying, scaling, and managing containerized applications on Kubernetes.",
          },
        ],
        nexoraCourseLink: {
          title: "Riviso OS: Virtualization, Linux Namespaces & Containers",
          href: "/courses/os/virtualization-and-containers",
        },
      },
      {
        number: 8,
        slug: "distributed-systems-and-high-level-design",
        title: "Distributed Systems, High-Level Design & Observability",
        tag: "Stage 08 · Scale & Reliability",
        color: "var(--lavender)",
        summary:
          "Scale backend architectures to millions of concurrent requests. Master distributed consensus, sharding, load balancing algorithms, resilience patterns, and production observability.",
        mentalModel:
          "At scale, hardware fails continuously, networks partition unpredictably, and latency spikes propagate across microservice boundaries. Designing distributed systems is the art of embracing failure as the default operating state and engineering graceful degradation.",
        coreConcepts: [
          "Distributed Systems Fundamentals: CAP Theorem (Consistency vs Availability under Partition), PACELC theorem, Fallacies of Distributed Computing, and Lamport Clocks",
          "Horizontal Database Sharding: Sharding keys, Range-based vs Hash-based partitioning, Directory-based routing, and Resharding challenges",
          "Consistent Hashing: Virtual nodes, ring topology, minimizing key redistribution when nodes join or leave clusters (Dynamo paper style)",
          "Load Balancing Strategies: L4 TCP load balancing vs L7 HTTP reverse proxying; Round Robin, Weighted Least Connections, IP Hash, and Power of Two Random Choices",
          "Distributed Resilience Patterns: Circuit Breakers (Resilience4j), Bulkheads, Exponential Backoff with Jitter, Request Hedging, and Distributed Rate Limiting",
          "The Three Pillars of Observability: Structured Logs (JSON with trace_id / span_id context), Metrics (Prometheus counters, gauges, histograms), and Distributed Tracing (OpenTelemetry)",
          "Latency Percentiles & SLIs/SLOs: Why averages are dangerous lies, measuring p50, p95, p99, and p99.9 latency, Error Budgets, and Service Level Agreements",
          "High-Level Design (HLD) Interview Blueprints: System design frameworks for URL Shortener (TinyURL), Distributed Rate Limiter, Ride-Sharing Dispatcher (Uber), Chat Architecture (WhatsApp), and Video Streaming Platform (YouTube)",
        ],
        handsOnProject: {
          title: "Resilient Distributed URL Shortener with Consistent Hashing & Distributed Tracing",
          description:
            "Design and build a distributed URL shortener backend with Base62 encoding, Redis caching, multiple sharded PostgreSQL instances routed via Consistent Hashing, circuit breaker fallbacks, and OpenTelemetry distributed spans exported to Jaeger.",
        },
        interviewDrill:
          "Explain Consistent Hashing and describe how it minimizes key redistribution when cache or database nodes are added or removed compared to traditional modulo hashing (hash(key) % N). Why are virtual nodes necessary?",
        resources: [
          {
            title: "Designing Data-Intensive Applications (Martin Kleppmann)",
            provider: "Martin Kleppmann",
            url: "https://dataintensive.net/",
            type: "The Masterpiece",
            badge: "Mandatory Reading",
            description: "The universally acclaimed bible of distributed systems, replication, partitioning, consensus, and batch/stream processing.",
          },
          {
            title: "System Design Interview — An Insider's Guide (Alex Xu)",
            provider: "ByteByteGo",
            url: "https://bytebytego.com/",
            type: "Interview Guide",
            badge: "Interview Standard",
            description: "Step-by-step blueprints for real-world system design interview loops with clean architectural diagrams.",
          },
          {
            title: "OpenTelemetry Official Documentation & Standards",
            provider: "Cloud Native Computing Foundation (CNCF)",
            url: "https://opentelemetry.io/docs/",
            type: "Documentation",
            badge: "Standard",
            description: "Standardized telemetry APIs, SDKs, and tooling for collecting traces, metrics, and logs across distributed services.",
          },
        ],
        nexoraCourseLink: {
          title: "Riviso High-Level Design (HLD) Track",
          href: "/courses/hld",
        },
      },
    ],
  },
  {
    id: "software-engineering",
    title: "Software Engineering (SWE) Roadmap",
    shortTitle: "Software Engineering",
    role: "Full-Cycle Product & Core Software Engineer",
    tagline:
      "From computer systems fundamentals and rigorous algorithmic problem-solving to clean architecture, automated testing, CI/CD, and scalable system design.",
    badge: "Active Track",
    status: "active",
    accentColor: "var(--blue)",
    totalStages: 8,
    estimatedWeeks: "24–32 weeks",
    prerequisites: "Basic coding knowledge in any programming language (Python, Java, C++, TypeScript, or Go)",
    terminalEndTitle: "◆ Production-ready Full-Cycle Software Engineer",
    terminalEndSub: "clean abstractions, algorithmic rigour, CI/CD & resilient system design",
    chips: [
      "CS Fundamentals & Memory",
      "Data Structures & Algorithms",
      "SOLID & Design Patterns",
      "Git Internals & Code Review",
      "Testing (TDD & Automation)",
      "CI/CD & Containerization",
      "System Design & Scalability",
      "Observability & Debugging",
    ],
    phases: [
      {
        id: "foundations-algorithms",
        index: "01",
        title: "Foundations & Algorithmic Thinking",
        sub: "Memory mechanics, computational complexity, and essential data structures",
        numbers: [1, 2],
      },
      {
        id: "craftsmanship-collaboration",
        index: "02",
        title: "Software Craftsmanship & Team Collaboration",
        sub: "Clean code, SOLID principles, design patterns, and advanced Git workflow",
        numbers: [3, 4],
      },
      {
        id: "testing-devops",
        index: "03",
        title: "Testing, Verification & DevOps Automation",
        sub: "Test pyramid, mocks vs stubs, GitHub Actions CI/CD, and containerization",
        numbers: [5, 6],
      },
      {
        id: "architecture-production",
        index: "04",
        title: "Distributed Architecture & Production Reliability",
        sub: "High-level system design, database choices, caching, metrics, and incident triage",
        numbers: [7, 8],
      },
    ],
    stages: [
      {
        number: 1,
        slug: "cs-fundamentals-memory",
        title: "Stage 01: Computer Systems, Memory & Machine Execution",
        tag: "Stage 01 · Foundations",
        color: "var(--blue)",
        summary:
          "Code is not abstract magic; it is instructions executed on a CPU backed by a hierarchical memory system. Master stack vs. heap allocation, pointers, cache line alignment, and system calls.",
        mentalModel:
          "Software does not execute in a vacuum. A high-level variable translates to memory addresses, registers, and cache lines. When you know where bytes physically live in RAM and how the CPU accesses them, algorithmic analysis shifts from theoretical Big-O to mechanical reality.",
        coreConcepts: [
          "Stack vs Heap memory: Stack frames, return pointers, allocation latency (pointer bump vs arena/freelist), fragmentation, and stack overflow vulnerabilities",
          "Memory hierarchy & CPU caching: Registers (0.5ns), L1/L2/L3 caches (1-10ns), RAM (100ns), NVMe SSD, cache lines (64 bytes), spatial and temporal locality",
          "Data representation & Bitwise arithmetic: Two's complement integer storage, IEEE 754 floating-point precision hazards, bit masks, bitwise shifts, and bit manipulation tricks",
          "Compilation & Linking pipeline: Preprocessing, AST generation, assembly generation, object files (.o), static vs dynamic linking (.so / .dylib / .dll), and ELF binary execution",
          "Operating system boundary & Syscalls: Kernel space vs User space, hardware interrupts, context switching costs, and fundamental POSIX syscalls (read, write, fork, exec, mmap)",
          "Asymptotic complexity analysis: Big-O, Big-Omega, Big-Theta, worst-case vs amortized time complexity, auxiliary space vs total space, and cache-friendly contiguous arrays",
        ],
        handsOnProject: {
          title: "Custom Memory Arena Allocator & Dynamic Array in C / C++",
          description:
            "Implement a fixed-capacity arena memory allocator and dynamic growable array from scratch, benchmarking allocation throughput and cache locality against standard library malloc/free.",
        },
        interviewDrill:
          "Explain what happens at the hardware level during a CPU cache miss. Why is iterating row-major through a 2D array drastically faster than column-major in C, C++, and Go?",
        resources: [
          {
            title: "Operating Systems Deep Dive & Kernel Architecture",
            provider: "Riviso Notes Track",
            url: "/courses/os",
            type: "Riviso Course",
          },
          {
            title: "CS50: Introduction to Computer Science",
            provider: "Harvard University / edX",
            url: "https://cs50.harvard.edu/x/",
            type: "Video Course",
          },
          {
            title: "What Every Programmer Should Know About Memory",
            provider: "Ulrich Drepper (Red Hat)",
            url: "https://people.freebsd.org/~lstewart/articles/cpumemory.pdf",
            type: "Classic Paper",
          },
          {
            title: "Dive Into Systems: A Gentle Introduction to Computer Systems",
            provider: "Suzanne J. Matthews et al.",
            url: "https://diveintosystems.org/",
            type: "Open Textbook",
          },
        ],
      },
      {
        number: 2,
        slug: "data-structures-algorithms",
        title: "Stage 02: Data Structures & Algorithmic Problem Solving",
        tag: "Stage 02 · Algorithmic Mastery",
        color: "var(--yellow)",
        summary:
          "Data structures are specific layouts of memory tailored to optimize access and mutation patterns. Master the core data structures and 14 repeatable algorithmic problem-solving patterns.",
        mentalModel:
          "Do not memorize individual coding interview questions. Recognize underlying invariant patterns: pointers advancing across sequences, searching monotonic spaces, partitioning graphs, or accumulating optimal subproblems in dynamic programming tables.",
        coreConcepts: [
          "Linear Structures: Contiguous dynamic arrays, singly and doubly linked lists, ring buffers, stacks, and queues with amortized resizing dynamics",
          "Hash-based Storage: Hash functions, uniform distribution, collision handling via chaining vs open addressing (linear probing, Robin Hood hashing), load factor, and rehashing cost",
          "Trees & Balanced BSTs: Tree traversals (Inorder, Preorder, Postorder, Level-order), Binary Search Trees, AVL/Red-Black balancing invariants, and Trie prefix trees",
          "Priority Queues & Binary Heaps: Min/Max heaps, array-backed complete binary trees, O(N) heapify construction, and running median dual-heap pattern",
          "Graphs & Shortest Paths: Adjacency list representation, Breadth-First Search (BFS), Depth-First Search (DFS), Topological Sort (Kahn's algorithm), and Dijkstra's algorithm",
          "The 14 Algorithmic Patterns: Two Pointers, Sliding Window, Fast & Slow Pointers, Merge Intervals, Monotonic Stack/Queue, Binary Search on Answer Space, and Backtracking",
          "Dynamic Programming (DP): Optimal substructure, overlapping subproblems, top-down memoization vs bottom-up tabulation, state compression, and 0/1 Knapsack patterns",
        ],
        handsOnProject: {
          title: "High-Throughput In-Memory LRU & LFU Cache Engine",
          description:
            "Build an O(1) concurrent LRU (Doubly-Linked List + Hash Map) and LFU (Frequency Buckets + Linked List) cache with thread-safe read/write operations and automated time-to-live (TTL) expiration.",
        },
        interviewDrill:
          "Given an unsorted stream of integers arriving continuously, design a data structure that calculates the running median in O(1) time with O(log N) insertion. Explain why dual heaps (max-heap + min-heap) provide optimal balance.",
        resources: [
          {
            title: "NeetCode 150 Algorithmic Patterns & Practice",
            provider: "NeetCode",
            url: "https://neetcode.io/practice",
            type: "Interactive Problem Set",
          },
          {
            title: "Visualizing Data Structures and Algorithms",
            provider: "VisuAlgo",
            url: "https://visualgo.net/en",
            type: "Interactive Tool",
          },
          {
            title: "USACO Guide: Algorithmic Problem Solving",
            provider: "USA Computing Olympiad",
            url: "https://usaco.guide/",
            type: "Curriculum",
          },
          {
            title: "Operating Systems & Concurrency Interview Drills",
            provider: "Riviso Interview Track",
            url: "/interview/os",
            type: "Riviso Track",
          },
        ],
      },
      {
        number: 3,
        slug: "ood-clean-architecture",
        title: "Stage 03: Object-Oriented Design & Clean Architecture",
        tag: "Stage 03 · Craftsmanship",
        color: "var(--mint)",
        summary:
          "Move beyond naive inheritance hierarchies. Encapsulate business logic, enforce loose coupling through interfaces, adhere to SOLID principles, and master Low-Level Design (LLD).",
        mentalModel:
          "Code is written once, but read and modified hundreds of times. Clean architecture does not mean over-engineering with 20 layers of abstraction; it means drawing clear boundaries so a change to your payment provider or database does not break your core business domain.",
        coreConcepts: [
          "SOLID Principles in Practice: Single Responsibility, Open/Closed (strategy injection), Liskov Substitution, Interface Segregation, and Dependency Inversion",
          "Composition over Inheritance: Avoiding fragile base classes, delegation patterns, and modular trait/interface composition",
          "Creational Design Patterns: Factory Method, Abstract Factory, Builder pattern for complex domain objects, and thread-safe Singleton",
          "Structural Design Patterns: Adapter (interfacing external APIs), Decorator (middleware, metrics wrapping), Facade, and Proxy",
          "Behavioral Design Patterns: Strategy (swappable algorithms/payment gateways), Observer (pub/sub events), Command (undo/redo pipelines), and State machine pattern",
          "Refactoring & Code Smells: Detecting Long Methods, Feature Envy, Primitive Obsession, and applying Martin Fowler's refactoring catalog safely",
          "Low-Level Design (LLD) Framework: Requirements clarification, identifying core domain actors, defining strict interfaces first, drawing class relationships, and handling concurrency",
        ],
        handsOnProject: {
          title: "Modular E-Commerce Checkout & Payment Engine (LLD)",
          description:
            "Design and implement a complete checkout domain with swappable payment gateways (Strategy), coupon discount chains (Chain of Responsibility), and notification emitters (Observer) with 100% unit test coverage.",
        },
        interviewDrill:
          "Design an In-Memory File System supporting mkdir, addContentToFile, readContentFromFile, and ls. Walk through requirements, class hierarchies, interfaces, handling concurrent directory traversals, and applying SOLID principles.",
        resources: [
          {
            title: "Spring Boot & Enterprise Architecture Track",
            provider: "Riviso Notes Track",
            url: "/courses/spring-boot",
            type: "Riviso Course",
          },
          {
            title: "Refactoring Guru: Design Patterns & Refactoring Guide",
            provider: "Refactoring.Guru",
            url: "https://refactoring.guru/design-patterns",
            type: "Interactive Guide",
          },
          {
            title: "Catalog of Refactorings & Architecture Notes",
            provider: "Martin Fowler",
            url: "https://martinfowler.com/articles.html",
            type: "Architecture Catalog",
          },
          {
            title: "SourceMaking: Design Patterns & Antipatterns",
            provider: "SourceMaking",
            url: "https://sourcemaking.com/design_patterns",
            type: "Reference",
          },
        ],
      },
      {
        number: 4,
        slug: "git-collaboration-workflow",
        title: "Stage 04: Git Internals, Team Collaboration & Code Review",
        tag: "Stage 04 · Collaboration",
        color: "var(--orange)",
        summary:
          "Demystify Git by understanding its content-addressable directed acyclic graph (DAG). Master branch history surgery, interactive rebase, git bisect bug hunting, and PR review etiquette.",
        mentalModel:
          "Git is not a black box of commands; it is a simple content-addressable storage system storing snapshots of files as SHA-keyed objects (blobs, trees, commits, tags). Once you understand the graph, merge conflicts are simple set theory and history rewriting is safe.",
        coreConcepts: [
          "Git Object Model: Blobs (content), Trees (directory structures), Commits (pointers to root tree + parent commits + metadata), and Annotated Tags",
          "Plumbing vs Porcelain: How git hash-object, cat-file, write-tree, and update-ref construct commits under the hood",
          "Branching Mechanics: Fast-forward merges vs 3-way merge commits (--no-ff), squash merges, rebase vs merge trade-offs, and golden rules of shared history",
          "Advanced History Surgery: Interactive rebase (git rebase -i) for squashing and rewording, git cherry-pick, git reflog disaster recovery, and git stash branching",
          "Automated Bug Pinpointing: git bisect with automated test runner scripts to locate offending regressions across hundreds of commits in logarithmic time",
          "Trunk-Based Development & Feature Flags: Eliminating long-lived feature branches, continuous integration cadence, dark launches, and blue-green toggles",
          "Code Review Standards: Writing informative pull request descriptions, atomic commits, conventional commit syntax, and constructive feedback loops",
        ],
        handsOnProject: {
          title: "Rebuilding Git Plumbing from Scratch in Python / Go",
          description:
            "Build a CLI tool that implements init, hash-object, cat-file, write-tree, and commit-tree, reading and writing real .git/objects directly to disk and verifying them with official git commands.",
        },
        interviewDrill:
          "A production regression was introduced somewhere in the last 250 commits on the main branch. Explain step-by-step how you would use `git bisect run` with an automated bash test script to identify the exact offending commit in seconds.",
        resources: [
          {
            title: "Pro Git: Official Comprehensive Guide",
            provider: "Scott Chacon & Ben Straub",
            url: "https://git-scm.com/book/en/v2",
            type: "Free Book",
          },
          {
            title: "Git from the Inside Out",
            provider: "Mary Rose Cook",
            url: "https://maryrosecook.com/blog/post/git-from-the-inside-out",
            type: "Visual Guide",
          },
          {
            title: "Google Engineering Practices: How to Do a Code Review",
            provider: "Google Open Source Documentation",
            url: "https://google.github.io/eng-practices/review/",
            type: "Industry Guide",
          },
          {
            title: "Conventional Commits 1.0.0 Specification",
            provider: "Conventional Commits",
            url: "https://www.conventionalcommits.org/en/v1.0.0/",
            type: "Standard",
          },
        ],
      },
      {
        number: 5,
        slug: "testing-tdd-verification",
        title: "Stage 05: Automated Testing, TDD & Quality Assurance",
        tag: "Stage 05 · Quality Engineering",
        color: "var(--lavender)",
        summary:
          "Testing is a design tool that forces modularity and guarantees you can refactor without fear. Master the Test Pyramid, Test-Driven Development (TDD), test doubles, and mutation testing.",
        mentalModel:
          "Untested code is legacy code the moment it is committed. The Test Pyramid guides your strategy: fast, deterministic unit tests at the base; containerized integration tests in the middle; minimal, critical end-to-end flows at the top.",
        coreConcepts: [
          "The Test Pyramid: Unit tests (fast, in-memory, deterministic), Integration tests (database, filesystem, network I/O), and End-to-End (E2E) user flow verification",
          "Test-Driven Development (TDD): The Red-Green-Refactor cadence, writing the smallest failing assertion first, and driving architecture from consumer call sites",
          "Test Doubles Taxonomy (Meszaros): Dummies, Stubs (canned answers), Fakes (in-memory SQLite/hashing implementations), Mocks (verifying interactions), and Spies",
          "Mocking Pitfalls: Avoiding over-mocking internal class collaborators, testing behavior instead of implementation details, and preventing brittle test suites",
          "Mutation Testing: Injecting deliberate syntactic mutants (altering operators, boundary conditions) to verify your test suite actually fails when bugs occur",
          "Code Coverage Metrics: Statement coverage vs Branch coverage vs Path coverage, and why 100% line coverage can still miss fatal edge cases",
          "Property-Based Testing & Fuzzing: Generating hundreds of randomized edge-case inputs to verify mathematical invariants (Hypothesis, QuickCheck)",
        ],
        handsOnProject: {
          title: "TDD-Driven Double-Entry Banking Ledger with Testcontainers",
          description:
            "Develop an ACID double-entry accounting ledger entirely using strict TDD (Red-Green-Refactor), using mock payment gateways for unit tests and Testcontainers spinning up a real PostgreSQL container for integration testing.",
        },
        interviewDrill:
          "Distinguish between a Mock and a Stub. Why does over-mocking internal collaborator classes create brittle test suites, and under what circumstances should you prefer an in-memory Fake over a Mock?",
        resources: [
          {
            title: "The Practical Test Pyramid",
            provider: "Martin Fowler / Ham Vocke",
            url: "https://martinfowler.com/articles/practical-test-pyramid.html",
            type: "Classic Guide",
          },
          {
            title: "Google Testing Blog: Testing on the Toilet",
            provider: "Google Engineering",
            url: "https://testing.googleblog.com/",
            type: "Engineering Blog",
          },
          {
            title: "Testcontainers Official Documentation",
            provider: "Testcontainers",
            url: "https://testcontainers.com/",
            type: "Documentation",
          },
          {
            title: "Test-Driven Development by Example",
            provider: "Kent Beck (Addison-Wesley)",
            url: "https://www.oreilly.com/library/view/test-driven-development/0321146530/",
            type: "Classic Book",
          },
        ],
      },
      {
        number: 6,
        slug: "cicd-containers-builds",
        title: "Stage 06: CI/CD Pipelines, Containerization & Build Systems",
        tag: "Stage 06 · DevOps & Automation",
        color: "var(--pink)",
        summary:
          "Package software into reproducible, immutable container images and automate everything—from linting and security scanning to testing and deployment—via declarative CI/CD pipelines.",
        mentalModel:
          "If a project cannot be built from scratch on a clean Linux machine with one command, it is not production-ready. Containers eliminate 'it works on my machine' by bundling code with its exact kernel namespace boundaries, runtime, and dependencies.",
        coreConcepts: [
          "Containerization Internals: Linux namespaces (PID, Mount, Net, IPC, UTS), Control Groups (cgroups v2 for CPU/memory limits), and copy-on-write filesystems (OverlayFS)",
          "Dockerfile Production Best Practices: Multi-stage builds, layer caching optimization, minimal distroless/alpine base images, and running non-root containers",
          "Declarative CI/CD Pipelines: GitHub Actions / GitLab CI workflows, trigger events, dependency caching, parallel test matrices, and artifact publishing",
          "Static Analysis & Linting: Automated AST linting, code formatting, type checking, and enforcing git pre-commit hooks across engineering teams",
          "DevSecOps & Supply Chain Security: Software Bill of Materials (SBOM), container CVE scanning (Trivy, Grype), and secret leak detection (Gitleaks) in CI",
          "Zero-Downtime Deployment Strategies: Rolling updates, Blue-Green deployments, and Canary deployments with automated error-rate rollbacks",
        ],
        handsOnProject: {
          title: "Multi-Stage Production Pipeline with Zero-Vulnerability Docker Image",
          description:
            "Build an automated GitHub Actions pipeline that lints code, runs unit & integration tests against containerized databases, builds a minimal non-root Docker image with multi-stage caching, scans for CVEs with Trivy, and pushes to a registry.",
        },
        interviewDrill:
          "Explain how Docker layer caching works. If your Dockerfile copies all project source code before running dependency installation commands, what performance penalty occurs on subsequent builds, and how do you fix it?",
        resources: [
          {
            title: "Operating Systems & Containerization Internals",
            provider: "Riviso Notes Track",
            url: "/courses/os/virtualization-and-containers",
            type: "Riviso Course",
          },
          {
            title: "Docker Best Practices for Writing Dockerfiles",
            provider: "Docker Official Docs",
            url: "https://docs.docker.com/build/building/best-practices/",
            type: "Documentation",
          },
          {
            title: "GitHub Actions Documentation & CI/CD Guides",
            provider: "GitHub Docs",
            url: "https://docs.github.com/en/actions",
            type: "Documentation",
          },
          {
            title: "Continuous Delivery: Reliable Software Releases",
            provider: "Jez Humble & David Farley",
            url: "https://continuousdelivery.com/",
            type: "Foundational Book",
          },
        ],
      },
      {
        number: 7,
        slug: "system-design-scalability",
        title: "Stage 07: System Design, Distributed Systems & Scalability",
        tag: "Stage 07 · Architecture & HLD",
        color: "var(--mint)",
        summary:
          "Scale software systems to handle millions of requests. Master horizontal scaling, load balancing, relational vs NoSQL storage, caching layers, CAP theorem, and event-driven decoupling.",
        mentalModel:
          "No single computer can scale indefinitely. Scalable engineering means decomposing state, embracing asynchronous processing, understanding consistency vs availability trade-offs, and designing systems that expect component failures continuously.",
        coreConcepts: [
          "Scaling Vectors: Vertical scaling (CPU/RAM bounds) vs Horizontal scaling (stateless compute tier behind load balancers), session management, and sticky sessions",
          "Load Balancing & Proxies: Layer 4 (TCP) vs Layer 7 (HTTP/gRPC) routing, Round Robin, Weighted Least Connections, and Consistent Hashing for sharding",
          "Data Layer Scaling: Read replicas, vertical vs horizontal partitioning (database sharding), connection pooling, and SQL ACID vs NoSQL eventual consistency",
          "Caching Strategies: Cache-Aside, Read-Through, Write-Through, Write-Behind, cache eviction (LRU/LFU), cache stampede mitigation, and Redis clustering",
          "Distributed Systems Theorems: CAP Theorem (Consistency vs Availability vs Partition Tolerance), PACELC theorem, and distributed consensus overview (Raft/Paxos)",
          "Asynchronous Messaging & Decoupling: Point-to-point queues (RabbitMQ/SQS) vs append-only distributed event streams (Apache Kafka), consumer groups, and idempotent consumers",
        ],
        handsOnProject: {
          title: "Distributed URL Shortener & Click Analytics Engine (HLD)",
          description:
            "Design and implement a scalable URL shortener featuring Base62 encoding, Redis caching for hot links, asynchronous click analytics published to a message queue, and horizontal database sharding simulations.",
        },
        interviewDrill:
          "Design a distributed Rate Limiter (e.g. 100 requests/minute per user). Compare the Token Bucket, Leaky Bucket, and Sliding Window Log algorithms, and explain how you handle race conditions across multiple distributed application servers using Redis Lua scripts.",
        resources: [
          {
            title: "High-Level System Design (HLD) Track",
            provider: "Riviso Notes Track",
            url: "/courses/hld",
            type: "Riviso Course",
          },
          {
            title: "Networking & HTTP Architecture Notes",
            provider: "Riviso Notes Track",
            url: "/courses/networking",
            type: "Riviso Course",
          },
          {
            title: "The System Design Primer",
            provider: "Donne Martin (GitHub)",
            url: "https://github.com/donnemartin/system-design-primer",
            type: "Open Source Guide",
          },
          {
            title: "Designing Data-Intensive Applications (DDIA)",
            provider: "Martin Kleppmann (O'Reilly)",
            url: "https://dataintensive.net/",
            type: "Essential Book",
          },
        ],
      },
      {
        number: 8,
        slug: "observability-debugging-reliability",
        title: "Stage 08: Observability, Debugging & Incident Response",
        tag: "Stage 08 · Production Operations",
        color: "var(--yellow)",
        summary:
          "Writing code is only the first 20% of the lifecycle; running it reliably in production is the rest. Master structured telemetry, distributed tracing, profiling memory leaks, and blameless incident triage.",
        mentalModel:
          "When an outage occurs at 3 AM in production, you cannot attach an interactive IDE debugger. You must rely entirely on your telemetry instrumentation—structured logs, time-series metrics, and distributed trace spans—to diagnose and remediate issues in real time.",
        coreConcepts: [
          "The Three Pillars of Observability: Structured JSON logging with contextual trace/span IDs, dimensional metrics (Prometheus), and distributed tracing (OpenTelemetry)",
          "Reliability Frameworks: Service Level Indicators (SLI), Service Level Objectives (SLO), Service Level Agreements (SLA), and Error Budgets",
          "The Four Golden Signals: Latency (p50, p95, p99 percentiles), Traffic (requests per second), Errors (rate of 5xx responses), and Saturation (CPU, memory, thread pool exhaustion)",
          "Profiling & Performance Debugging: Generating CPU flame graphs, analyzing memory allocation profiles, identifying memory leaks and thread deadlocks",
          "Resiliency & Fault Tolerance: Circuit breakers (fail fast), exponential backoff with randomized jitter, bulkhead isolation, and fallback degradation",
          "Production Incident Management: Sev-1 triage protocols, mitigating customer impact before diagnosing root causes, and conducting blameless post-mortems",
        ],
        handsOnProject: {
          title: "End-to-End Telemetry Dashboard with OpenTelemetry, Prometheus & Grafana",
          description:
            "Instrument a multi-service web application with OpenTelemetry distributed trace headers, export Prometheus metrics on request latencies and error rates, build an interactive Grafana alerting dashboard, and simulate traffic spikes with k6 load testing.",
        },
        interviewDrill:
          "Your service's p99 latency suddenly jumps from 20ms to 2.5 seconds, while p50 latency remains steady at 15ms. Walk through your diagnostic workflow: which telemetry signals do you inspect first, and what are the most common root causes of high tail latency?",
        resources: [
          {
            title: "Operating Systems & Concurrency Debugging",
            provider: "Riviso Notes Track",
            url: "/courses/os/faang-interview-playbook",
            type: "Riviso Course",
          },
          {
            title: "OpenTelemetry Official Documentation",
            provider: "OpenTelemetry / CNCF",
            url: "https://opentelemetry.io/docs/",
            type: "Documentation",
          },
          {
            title: "Google Site Reliability Engineering (SRE) Books",
            provider: "Google SRE Team",
            url: "https://sre.google/books/",
            type: "Free Books",
          },
          {
            title: "Systems Performance & Flame Graphs",
            provider: "Brendan Gregg",
            url: "https://www.brendangregg.com/",
            type: "Performance Guide",
          },
        ],
      },
    ],
  },
  {
    id: "systems-engineering",
    title: "Systems & Low-Level Engineering",
    shortTitle: "Systems Engineering",
    role: "Kernel, Concurrency & High-Performance Computing",
    tagline:
      "Operating systems, Linux kernel syscalls, memory hierarchies, cache coherence, epoll zero-copy I/O, and GPU computing.",
    badge: "Coming Soon",
    status: "upcoming",
    accentColor: "var(--pink)",
    totalStages: 6,
    estimatedWeeks: "20–26 weeks",
    prerequisites: "C / C++ foundations",
    chips: [
      "Linux Kernel & Syscalls",
      "Virtual Memory & Paging",
      "Multi-threading & Futexes",
      "epoll, DMA & Zero-Copy",
      "Networking Protocols",
      "GPU RDMA & CUDA",
    ],
  },
];

export function getRoadmap(id) {
  return roadmaps.find((r) => r.id === id);
}

export function getAllRoadmaps() {
  return roadmaps;
}
