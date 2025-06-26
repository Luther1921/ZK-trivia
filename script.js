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
    question: "What is the main purpose of a blockchain?",
    options: [
      "Store private data",
      "Ensure transparent and secure transactions",
      "Run video games",
      "Host websites",
    ],
    correct: 1,
    explanation:
      "A blockchain ensures transparent and secure transactions by maintaining a decentralized, tamper-resistant ledger.",
  },
  {
    question: "What does 'ZK' stand for in zk-SNARK?",
    options: ["Zero Knowledge", "Zipped Key", "Zone Keeper", "Zigzag Knot"],
    correct: 0,
    explanation:
      "ZK stands for Zero Knowledge, a cryptographic method to prove a statement without revealing details.",
  },
  {
    question:
      "True or False: Zero-knowledge proofs allow verifying information without sharing the actual data.",
    options: ["True", "False"],
    correct: 0,
    explanation:
      "True! ZKPs enable proving a statement (e.g., a transaction) is valid without revealing sensitive details, enhancing privacy.",
  },
  {
    question:
      "What is a key benefit of using zero-knowledge proofs in blockchain?",
    options: [
      "Faster internet",
      "Private transactions",
      "More storage",
      "Better graphics",
    ],
    correct: 1,
    explanation:
      "ZKPs allow private transactions by verifying data without exposing it, improving blockchain privacy and scalability.",
  },
  {
    question: "What type of technology is Succinct Labs primarily focused on?",
    options: [
      "Artificial Intelligence",
      "Zero-Knowledge Proofs",
      "Cloud Storage",
      "Virtual Reality",
    ],
    correct: 1,
    explanation:
      "Succinct Labs focuses on zero-knowledge proofs, building tools like SP1 to make ZKPs accessible for developers.",
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
      "Which programming language does Succinct Labs’ SP1 primarily use for ZKP development?",
    options: ["Python", "Rust", "JavaScript", "Solidity"],
    correct: 1,
    explanation:
      "SP1 allows developers to write ZKPs in Rust, making it easier to create proofs without learning new languages.",
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
      "True or False: Succinct Labs’ Prover Network is centralized and controlled by a single entity.",
    options: ["True", "False"],
    correct: 1,
    explanation:
      "False! Succinct Labs’ Prover Network is decentralized, coordinating multiple provers to generate ZKPs for anyone.",
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
      "Which blockchain does Succinct Labs’ Prover Network primarily integrate with?",
    options: ["Bitcoin", "Ethereum", "Solana", "Cardano"],
    correct: 1,
    explanation:
      "Succinct Labs’ Prover Network is built on Ethereum, enabling ZKP-based interoperability and applications.",
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
