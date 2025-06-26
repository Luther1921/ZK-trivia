// Fisher-Yates shuffle to randomize questions
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const questions = [
  {
    question:
      "What cryptographic primitive underpins SP1’s ability to verify Rust program execution?",
    options: [
      "Merkle trees",
      "SNARK-friendly hash functions",
      "zkVMs and constraint systems",
      "Public-key encryption",
    ],
    correct: 2,
    explanation:
      "SP1 compiles Rust code into constraint systems for zk proving within its zero-knowledge virtual machine (zkVM).",
  },
  {
    question:
      "In a zkVM, what is a potential trade-off when prioritizing proof size over proving time, as seen in some SP1 configurations?",
    options: [
      "Increased verification time on-chain.",
      "Higher memory usage during proof generation.",
      "Reduced compatibility with recursive proofs",
      "Loss of zero-knowledge properties.",
    ],
    correct: 0,
    explanation:
      "Optimizing for smaller proof sizes in zkVMs like SP1 can increase computational complexity, leading to longer verification times on-chain, a critical trade-off in blockchain applications where verification speed matter",
  },
  {
    question: "What does SP1 Hypercube optimize for when proving execution?",
    options: [
      "On-chain data size",
      "Interactive proofs",
      "Latency and throughput",
      "Key rotation",
    ],
    correct: 2,
    explanation:
      "SP1 Hypercube is engineered for real-time ZKP throughput, improving proving latency and cost significantly.",
  },
  {
    question: "What kind of applications benefit the most from SP1’s design?",
    options: [
      "Web hosting platforms",
      "Decentralized rollups and provable bridges",
      "NFT marketplaces",
      "DeFi wallets",
    ],
    correct: 1,
    explanation:
      "SP1 enables scalable ZK rollups, fast bridges, and any use case where off-chain logic needs verifiable proofs.",
  },
  {
    question:
      "What is a primary challenge in implementing zkRollups like SP1 for Ethereum’s zkEVM, impacting smart contract compatibility??",
    options: [
      "High computational cost of generating ZKPs for EVM opcodes.",
      "Inability to support recursive proofs in zkEVM",
      "Lack of data availability on Layer 1.",
      "Requirement for a challenge period like Optimistic Rollups.",
    ],
    correct: 0,
    explanation:
      "Generating zero-knowledge proofs for EVM opcodes in zkRollups like SP1 is computationally intensive, making full EVM compatibility challenging due to the complexity of proving arbitrary code. SP1’s precompiles help, but it’s still a hurdle! No challenge periods here, unlike Optimistic Rollups.",
  },
  {
    question: "What is SP1, developed by Succinct Labs?",
    options: [
      "A blockchain wallet",
      "A zero-knowledge virtual machine",
      "A smart contract platform",
      "A cryptocurrency token",
    ],
    correct: 1,
    explanation:
      "SP1 is a high-performance, open-source zkVM that proves the execution of Rust programs, enabling ZKP applications.",
  },
  {
    question: "What does 'Succinct' in Succinct Labs likely refer to?",
    options: [
      "Complex proofs",
      "Fast and efficient proofs",
      "Large blockchains",
      "Public keys",
    ],
    correct: 1,
    explanation:
      "'Succinct' refers to fast, efficient ZKPs, like those in zk-SNARKs, which Succinct Labs optimizes for developers.",
  },
  {
    question:
      "What is a key limitation of using non-recursive zkSNARKs in a zkVM like SP1 for real-world blockchain applications?",
    options: [
      "They require trusted setups, which can compromise security.",
      "They cannot handle dynamic loops in smart contracts.",
      "They are inherently slower than recursive zkSNARKs for proof aggregation.",
      "They do not support elliptic curve operations.",
    ],
    correct: 0,
    explanation:
      "Non-recursive zkSNARKs often rely on trusted setups, introducing potential security risks, unlike recursive systems like Plonky3 (used by SP1), which can avoid this while enabling efficient proof aggregation for blockchain use cases.",
  },
  {
    question: "What is a zk-SNARK?",
    options: [
      "A type of blockchain",
      "A zero-knowledge proof protocol",
      "A cryptocurrency",
      "A smart contract standard",
    ],
    correct: 1,
    explanation:
      "A zk-SNARK is a Zero-Knowledge Succinct Non-Interactive Argument of Knowledge, used for private, efficient proofs.",
  },
  {
    question:
      "What architectural feature helps SP1 outperform other zkVMs for real-world use cases?",
    options: [
      "Precompile-centric design",
      "AI-powered proof generation",
      "Cloud-based recursion",
      "Manual circuit writing",
    ],
    correct: 0,
    explanation:
      "SP1’s performance edge over other zkVMs, like RISC0, primarily stems from its precompile-centric architecture",
  },
  {
    question: "What is a key difference between zk-SNARKs and zk-STARKs?",
    options: [
      "zk-SNARKs require a trusted setup",
      "zk-STARKs are slower",
      "zk-SNARKs are less secure",
      "zk-STARKs use Rust",
    ],
    correct: 0,
    explanation:
      "zk-SNARKs require a trusted setup, while zk-STARKs do not, making STARKs more transparent but often larger.",
  },
  {
    question: "What does Succinct Labs’ Prover Network aim to provide?",
    options: [
      "Free cryptocurrency",
      "Decentralized proof generation",
      "Cloud storage",
      "AI training",
    ],
    correct: 1,
    explanation:
      "The Prover Network offers decentralized proof generation for ZKP applications like rollups and bridges.",
  },
  {
    question: "What is a key feature of Succinct Labs’ SP1 Hypercube?",
    options: [
      "Real-time proving for Ethereum",
      "NFT minting",
      "Smart contract deployment",
      "Data encryption",
    ],
    correct: 0,
    explanation:
      "SP1 Hypercube delivers real-time ZKP proving for Ethereum, with up to 5x better latency and cost.",
  },
  {
    question:
      "How much faster can SP1 be for certain programs compared to other zkVMs?",
    options: [
      "Up to 5x",
      "Up to 10x",
      "Up to 28x",
      "Not faster, just prettier",
    ],
    correct: 2,
    explanation:
      "SP1, developed by Succinct Labs, can be up to 28x faster than other zkVMs, such as RISC0, for specific programs",
  },
  {
    question: "What does 'non-interactive' mean in the context of zk-SNARKs?",
    options: [
      "Requires user input",
      "Single-round proof verification",
      "Slow computation",
      "Public blockchain",
    ],
    correct: 1,
    explanation:
      "Non-interactive means the proof is verified in a single round without ongoing interaction, making zk-SNARKs efficient.",
  },
];
let shuffledQuestions = shuffle([...questions]);

let currentQuestion = 0;
let score = 0;
let level = 1;

// DOM references
const questionEl = document.getElementById("question");
const progressEl = document.getElementById("progress");
const optionsEl = document.getElementById("options");
const feedbackEl = document.getElementById("feedback");
const scoreEl = document.getElementById("score");
const levelEl = document.getElementById("level");
const nextBtn = document.getElementById("next-btn");
const shareBtn = document.getElementById("share-btn");
const resetBtn = document.getElementById("reset-btn");

function loadQuestion() {
  const q = shuffledQuestions[currentQuestion];
  questionEl.textContent = q.question;
  progressEl.value = currentQuestion + 1;
  optionsEl.innerHTML = "";
  feedbackEl.textContent = "";
  feedbackEl.className = "feedback";
  nextBtn.disabled = true;

  q.options.forEach((option, index) => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.onclick = () => checkAnswer(index);
    optionsEl.appendChild(btn);
  });

  shareBtn.style.display = "none";
}

function checkAnswer(selected) {
  const q = shuffledQuestions[currentQuestion];
  const isCorrect = selected === q.correct;

  // Style feedback
  feedbackEl.textContent = `${isCorrect ? "✅ Correct!" : "❌ Incorrect."} ${
    q.explanation
  }`;
  feedbackEl.classList.add(isCorrect ? "correct" : "incorrect");

  // Update score
  if (isCorrect) {
    score += 10;
    scoreEl.textContent = score;
  }

  // Disable all buttons
  optionsEl.querySelectorAll("button").forEach((btn, i) => {
    btn.disabled = true;
    if (i === q.correct) {
      btn.style.backgroundColor = "#00ffaa";
      btn.style.color = "#000";
    } else {
      btn.style.opacity = 0.6;
    }
  });

  nextBtn.disabled = false;

  if (
    currentQuestion === shuffledQuestions.length - 1 ||
    (currentQuestion + 1) % 5 === 0
  ) {
    shareBtn.style.display = "inline-block";
  }
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion % 5 === 0 && currentQuestion < shuffledQuestions.length) {
    level++;
    levelEl.textContent = level;
  }

  if (currentQuestion < shuffledQuestions.length) {
    loadQuestion();
  } else {
    showFinalResult();
  }
}

function showFinalResult() {
  questionEl.textContent = `🎉 Game Over! You're a ZK Master!`;
  feedbackEl.textContent = `Final Score: ${score} points`;
  feedbackEl.className = "feedback correct";
  optionsEl.innerHTML = "";
  nextBtn.style.display = "none";
  shareBtn.style.display = "inline-block";
  shareBtn.textContent = "📤 Share Final Score on X";
}

function resetGame() {
  currentQuestion = 0;
  score = 0;
  level = 1;
  scoreEl.textContent = score;
  levelEl.textContent = level;
  shuffledQuestions = shuffle([...questions]);

  loadQuestion();
  nextBtn.style.display = "inline-block";
  nextBtn.disabled = true;
  resetBtn.disabled = false;
}

// Share to X handler
shareBtn.onclick = () => {
  const isFinal = currentQuestion >= shuffledQuestions.length;
  const text = isFinal
    ? `I'm a ZK Master with ${score} points in ZK Trivia Quest by @mota_kidah for @succinctlabs! Play it here 👉 ${window.location.href} #ZKTrivia`
    : `I scored ${score} points in Level ${level} of ZK Trivia Quest by @mota_kidah for @succinctlabs! Can you top that? 👉 ${window.location.href} #ZKTrivia`;
  const tweetUrl = `https://x.com/intent/post?text=${encodeURIComponent(text)}`;
  window.open(tweetUrl, "_blank");
};

// Init
nextBtn.onclick = nextQuestion;
resetBtn.onclick = resetGame;
loadQuestion();
