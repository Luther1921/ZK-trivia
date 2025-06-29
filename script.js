// Firebase configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  limit,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCYS2oZSRLik7PvU1IdAphDLv7xHhd98tY",
  authDomain: "zk-trivia.firebaseapp.com",
  projectId: "zk-trivia",
  storageBucket: "zk-trivia.firebasestorage.app",
  messagingSenderId: "1099137193427",
  appId: "1:1099137193427:web:79f24baa97f537ca1dcb26",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

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
      "What cryptographic primitive underpins SP1's ability to verify Rust program execution?",
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
      "Optimizing for smaller proof sizes in zkVMs like SP1 can increase computational complexity, leading to longer verification times on-chain, a critical trade-off in blockchain applications where verification speed matters.",
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
    question:
      "Why is SP1’s Plonky3 proof system critical for enabling real-time CLOBs on blobs in high-frequency DeFi trading?",
    options: [
      "It converts CLOB orders into AMM-compatible transactions.",
      "It enables fast recursive proofs for frequent order book updates.",
      "It compresses CLOB data into smaller blobs for storage.",
      "It eliminates the need for blob-based data availability.",
    ],
    correct: 1,
    explanation:
      "Plonky3’s recursive proofs allow SP1 to efficiently verify frequent CLOB order book updates, enabling real-time trading with low latency, as seen in integrations like Hibachi’s Wynn Upgrade. No AMM conversion needed!",
  },
  {
    question:
      "What is a primary challenge in implementing zkRollups like SP1 for Ethereum's zkEVM, impacting smart contract compatibility?",
    options: [
      "High computational cost of generating ZKPs for EVM opcodes.",
      "Inability to support recursive proofs in zkEVM",
      "Lack of data availability on Layer 1.",
      "Requirement for a challenge period like Optimistic Rollups.",
    ],
    correct: 0,
    explanation:
      "Generating zero-knowledge proofs for EVM opcodes in zkRollups like SP1 is computationally intensive, making full EVM compatibility challenging due to the complexity of proving arbitrary code. SP1's precompiles help, but it's still a hurdle! No challenge periods here, unlike Optimistic Rollups.",
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
    question:
      "What decentralization challenge does SP1 Hypercube face when scaling its prover network for Ethereum proof generation?",
    options: [
      "Inability to distribute proof generation across multiple nodes.",
      "High hardware costs (~$100k–$300k for ~160 GPUs) limit prover participation.",
      "Dependence on Ethereum’s Layer 1 for prover coordination.",
      "Requirement for trusted setups in its proof system.",
    ],
    correct: 1,
    explanation:
      "SP1 Hypercube’s prover clusters require ~160 GPUs, costing $100k–$300k, which can limit participation and hinder full decentralization, despite its 5x cost efficiency over SP1 Turbo. No trusted setups or Layer 1 coordination needed!",
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
    question:
      "What security challenge arises when integrating CLOBs on blobs with SP1’s zkRollup for permissionless DeFi withdrawals?",
    options: [
      "Inability to support permissionless withdrawals in ZKPs.",
      "Ensuring blob data integrity for valid ZKP verification.",
      "Requiring trusted oracles for order matching.",
      "Increased proof size due to blob compression.",
    ],
    correct: 1,
    explanation:
      "CLOBs on blobs require robust blob propagation and data integrity to ensure SP1’s ZKPs verify order book states correctly, critical for secure, permissionless withdrawals in DeFi, as seen in Hibachi’s integration. No trusted oracles here!",
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
      "SP1's performance edge over other zkVMs, like RISC0, primarily stems from its precompile-centric architecture",
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
    question:
      "What is a key challenge when using blobs for CLOBs in a zkRollup powered by SP1, and how does it impact DeFi trading?",
    options: [
      "Blob expiry risks data unavailability, potentially disrupting order book reconstruction.",
      "Blobs increase proof size, slowing down verification.",
      "Blobs require CLOB data to be stored in ASCII format.",
      "Blobs prevent SP1 from using Plonky3 for proof generation.",
    ],
    correct: 0,
    explanation:
      "Blobs are temporary (pruned after ~18 days), risking data unavailability for CLOB order books, which can disrupt state reconstruction in zkRollups. SP1 mitigates this with efficient proofs, but hybrid storage solutions are often needed.",
  },
  {
    question:
      "How does a zkVM like SP1 optimize proof generation for Ethereum smart contracts compared to a circuit-based ZKP system?",
    options: [
      "It uses a general-purpose RISC-V architecture to prove arbitrary code.",
      "It relies on custom circuits tailored for each smart contract.",
      "It offloads proof generation to Ethereum’s Layer 1.",
      "It converts smart contracts to non-ZK proofs.",
    ],
    correct: 0,
    explanation:
      "zkVMs like SP1 use a general-purpose RISC-V architecture to prove arbitrary Ethereum smart contract code, offering flexibility over circuit-based ZKPs, which require custom circuits per contract. SP1’s precompiles boost efficiency, no Layer 1 offloading needed!",
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
let playerName = "";

// DOM Elements
const startScreen = document.getElementById("start-screen");
const game = document.getElementById("game");
const leaderboard = document.getElementById("leaderboard");
const leaderboardList = document.getElementById("leaderboard-list");
const playerNameInput = document.getElementById("player-name");
const startBtn = document.getElementById("start-btn");
const viewLeaderboardBtn = document.getElementById("view-leaderboard-btn");
const backToStartBtn = document.getElementById("back-to-start-btn");
const questionEl = document.getElementById("question");
const progressEl = document.getElementById("progress");
const optionsEl = document.getElementById("options");
const feedbackEl = document.getElementById("feedback");
const scoreEl = document.getElementById("score");
const levelEl = document.getElementById("level");
const nextBtn = document.getElementById("next-btn");
const shareBtn = document.getElementById("share-btn");
const resetBtn = document.getElementById("reset-btn");

// Event Listeners
playerNameInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    startGame();
  }
});

startBtn.onclick = startGame;
viewLeaderboardBtn.onclick = showLeaderboard;
backToStartBtn.onclick = backToStart;
nextBtn.onclick = nextQuestion;
resetBtn.onclick = resetGame;

shareBtn.onclick = () => {
  const text =
    currentQuestion < shuffledQuestions.length
      ? `I scored ${score} points in Level ${level} of ZK Trivia Quest by @succinctlabs! Can you beat my score? #ZKTrivia`
      : `I'm a ZK Master with ${score} points in ZK Trivia Quest by @mota_kidah for @succinctlabs! Think you can beat me? #ZKTrivia`;
  const url = `https://x.com/intent/post?text=${encodeURIComponent(text)}`;
  window.open(url, "_blank");
};

// Navigation Functions
function showLeaderboard() {
  startScreen.style.display = "none";
  game.style.display = "none";
  leaderboard.style.display = "block";
  loadLeaderboard();
}

function backToStart() {
  leaderboard.style.display = "none";
  game.style.display = "none";
  startScreen.style.display = "block";
}

// Game Functions
function startGame() {
  const name = playerNameInput.value.trim();
  if (!name) {
    alert("Please enter your name.");
    playerNameInput.focus();
    return;
  }
  playerName = name;
  startScreen.style.display = "none";
  leaderboard.style.display = "none";
  game.style.display = "block";
  loadQuestion();
}

function loadQuestion() {
  const q = shuffledQuestions[currentQuestion];
  questionEl.textContent = q.question;
  progressEl.value = currentQuestion + 1;
  optionsEl.innerHTML = "";

  q.options.forEach((option, index) => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.onclick = () => checkAnswer(index);
    optionsEl.appendChild(btn);
  });

  feedbackEl.textContent = "";
  feedbackEl.className = "feedback";
  nextBtn.disabled = true;
  shareBtn.style.display = "none";
}

function checkAnswer(selected) {
  const q = shuffledQuestions[currentQuestion];
  const buttons = optionsEl.querySelectorAll("button");

  // Disable all buttons
  buttons.forEach((btn) => (btn.disabled = true));

  // Highlight correct and incorrect answers
  buttons[q.correct].classList.add("correct");
  if (selected !== q.correct) {
    buttons[selected].classList.add("incorrect");
  }

  if (selected === q.correct) {
    score += 10;
    feedbackEl.textContent = `✅ Correct! ${q.explanation}`;
    feedbackEl.className = "feedback correct";
    scoreEl.textContent = score;
  } else {
    feedbackEl.textContent = `❌ Incorrect. ${q.explanation}`;
    feedbackEl.className = "feedback incorrect";
  }

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
    endGame();
  }
}

function endGame() {
  questionEl.innerHTML = `<div class="game-over">
    <h3>🎉 Game Over!</h3>
    <p>Congratulations, ${playerName}! You're a ZK Master!</p>
    <p><strong>Final Score: ${score} points</strong></p>
    <p>Level Reached: ${level}</p>
  </div>`;
  optionsEl.innerHTML = "";
  feedbackEl.textContent = "";
  feedbackEl.className = "feedback";
  nextBtn.style.display = "none";
  shareBtn.style.display = "inline-block";
  shareBtn.textContent = "📤 Share Final Score on X";
  updateLeaderboard();
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
  leaderboard.style.display = "none";
}

// Leaderboard Functions
async function updateLeaderboard() {
  try {
    await addDoc(collection(db, "leaderboard"), {
      name: playerName,
      score,
      timestamp: Date.now(),
    });
    console.log("Saved to global leaderboard");
  } catch (err) {
    console.error("Error saving score globally:", err);
  }

  renderLeaderboard();
}

async function loadLeaderboard() {
  leaderboardList.innerHTML = "<li>Loading leaderboard...</li>";
  await renderLeaderboard();
}

async function renderLeaderboard() {
  leaderboardList.innerHTML = "";

  try {
    const q = query(
      collection(db, "leaderboard"),
      orderBy("score", "desc"),
      limit(20)
    );
    const snapshot = await getDocs(q);
    const globalData = snapshot.docs.map((doc) => doc.data());

    if (globalData.length > 0) {
      leaderboardList.innerHTML += "<li><strong>🏆 Top Scores:</strong></li>";
      globalData.forEach((entry, index) => {
        const isCurrentPlayer =
          entry.name === playerName && entry.score === score;
        const highlight = isCurrentPlayer
          ? 'style="color: #00ffaa; font-weight: bold;"'
          : "";
        leaderboardList.innerHTML += `<li ${highlight}>#${index + 1} – ${
          entry.name
        }: ${entry.score} points</li>`;
      });
    } else {
      leaderboardList.innerHTML = "<li>No scores yet. Be the first!</li>";
    }
  } catch (err) {
    console.error("Failed to load global leaderboard:", err);
    leaderboardList.innerHTML =
      "<li>Unable to load leaderboard. Please try again later.</li>";
  }

  leaderboard.style.display = "block";
}
