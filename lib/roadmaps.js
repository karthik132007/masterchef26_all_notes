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
          title: "Nexora Machine Learning Notes & First-Principles Derivations",
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
          title: "Nexora GenAI & Agentic AI Track: Foundations & Attention",
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
          title: "Nexora RAG Architecture & Evaluation Notes",
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
          title: "Nexora Agentic AI & Multi-Agent Architecture Field Notes",
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
          title: "Nexora High-Level Design (HLD) Track",
          href: "/courses/hld",
        },
      },
    ],
  },
  {
    id: "backend-engineering",
    title: "Backend Engineering Roadmap",
    shortTitle: "Backend Engineering",
    role: "Core Platform & Distributed Systems",
    tagline:
      "APIs, distributed messaging, high-concurrency runtimes, ACID transactions, database sharding, and cloud architecture.",
    badge: "Coming Soon",
    status: "upcoming",
    accentColor: "var(--mint)",
    totalStages: 7,
    estimatedWeeks: "20–28 weeks",
    prerequisites: "General programming basics",
    chips: [
      "REST & gRPC",
      "RDBMS & SQL Internals",
      "Distributed Caching (Redis)",
      "Event-Driven & Kafka",
      "Auth & Security",
      "Docker & Kubernetes",
      "System Scalability",
    ],
  },
  {
    id: "software-engineering",
    title: "Software Engineering (SWE) Roadmap",
    shortTitle: "Software Engineering",
    role: "Full-Cycle Product & Core Software Engineer",
    tagline:
      "Data structures, algorithms, object-oriented design, testing frameworks, CI/CD, system architecture, and FAANG interview readiness.",
    badge: "Coming Soon",
    status: "upcoming",
    accentColor: "var(--blue)",
    totalStages: 6,
    estimatedWeeks: "16–24 weeks",
    prerequisites: "Introductory coding knowledge",
    chips: [
      "Data Structures & Algorithms",
      "Design Patterns & Clean Code",
      "Git & Version Control",
      "Automated Testing & CI/CD",
      "Web Architecture",
      "Interview Mastery",
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
