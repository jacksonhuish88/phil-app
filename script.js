const scenarios = [
  {
    text: "You're hiding a refugee from a government that plans to torture them. The police ask if you're hiding anyone. Is it morally acceptable to lie?",
    tags: {
      utilitarianism: 2,    // Lying saves a life — ends justify means
      deontology: -2,       // Lying violates a moral duty regardless of outcome
      virtue: 1             // Compassion/courage aligns with virtuous character
    }
  },
  {
    text: "A hospital has 5 patients needing organ transplants. A healthy traveler with compatible organs walks in. Should the doctors sacrifice him to save the 5?",
    tags: {
      utilitarianism: 2,    // Maximizes overall lives saved
      deontology: -2,       // Killing an innocent violates moral law
      virtue: -1            // Lacks integrity, compassion, and justice
    }
  },
  {
    text: "You promised a dying friend you'd never reveal their secret. Years later, the secret could exonerate someone on death row. Should you break the promise?",
    tags: {
      utilitarianism: 1,    // Saves a life — overall good
      deontology: -2,       // Breaking a solemn promise violates duty
      virtue: 1             // Justice and truthfulness toward the innocent
    }
  },
  {
    text: "You're offered money to fake clinical trial data that could speed up approval of a drug that might help millions. Is it ethical to do so?",
    tags: {
      utilitarianism: 2,    // Potential to benefit many lives
      deontology: -2,       // Lying/fraud is inherently wrong
      virtue: -2            // Dishonest, corrupt character action
    }
  },
  {
    text: "During war, you're ordered to execute a civilian to intimidate others and prevent a larger uprising. Is obedience to duty ever moral here?",
    tags: {
      utilitarianism: -1,   // Likely causes more harm/fear/hatred long-term
      deontology: 2,        // A strict deontologist might obey orders/law/duty
      virtue: -1            // Cowardly, unjust — fails virtue ethics
    }
  },
  {
    text: "A friend cheats on their partner, who is also your friend. Telling the truth will destroy both friendships. Do you say nothing?",
    tags: {
      utilitarianism: 1,    // May preserve happiness/peace
      deontology: -1,       // You have a duty to tell the truth
      virtue: -1            // Avoiding truth lacks integrity/courage
    }
  },
  {
    text: "To win an election that could create massive social change, you fabricate parts of your opponent's record. The lie may benefit millions. Justified?",
    tags: {
      utilitarianism: 2,    // Consequences are highly beneficial
      deontology: -2,       // Dishonesty = wrong regardless of good result
      virtue: -2            // Lacks moral character — deceit, manipulation
    }
  },
  {
    text: "A violent criminal is about to be released on a technicality. You have the power to plant false evidence to keep them imprisoned. Do you do it?",
    tags: {
      utilitarianism: 1,    // May protect society
      deontology: -2,       // Framing someone is never morally acceptable
      virtue: -1            // Dishonest and unjust action
    }
  },
  {
    text: "You discover your company is dumping toxic waste, but exposing it would cost thousands of workers their jobs. Do you blow the whistle?",
    tags: {
      utilitarianism: 1,    // Helps environment, prevents long-term harm
      deontology: 2,        // Fulfills duty to truth, justice, and protection
      virtue: 1             // Demonstrates courage and integrity
    }
  },
  {
    text: "A terrorist threatens to kill hostages unless you torture their child for information. The child is innocent. Do you torture the child?",
    tags: {
      utilitarianism: 2,    // May save many lives
      deontology: -3,       // Torturing an innocent is deeply immoral
      virtue: -3            // Violates compassion, courage, humanity
    }
  }
];


let currentIndex = 0;
let scores = { utilitarianism: 0, deontology: 0, virtue: 0 };
let username = "";

function startQuiz() {
  const rawName = document.getElementById("username").value.trim();
  if (!rawName) return alert("Please enter your name.");
  username = rawName.charAt(0).toUpperCase() + rawName.slice(1).toLowerCase();
  document.getElementById("start-screen").style.display = "none";
  document.getElementById("quiz-container").style.display = "block";
  typeQuestion(scenarios[currentIndex].text);
}

function typeQuestion(text) {
  const typedEl = document.getElementById("typed-question");
  const counterEl = document.getElementById("question-counter");
  counterEl.textContent = `${currentIndex + 1}/${scenarios.length}`;

  typedEl.textContent = "";
  let i = 0;
  const interval = setInterval(() => {
    typedEl.textContent += text[i];
    i++;
    if (i >= text.length) clearInterval(interval);
  }, 40);
}

function submitResponse(value) {
  const tags = scenarios[currentIndex].tags;
  for (const theory in tags) {
    scores[theory] += value * tags[theory];
  }
  currentIndex++;
  if (currentIndex < scenarios.length) {
    typeQuestion(scenarios[currentIndex].text);
  } else {
    showResults();
  }
}

function showResults() {
  document.getElementById("quiz-container").style.display = "none";
  const results = document.getElementById("results");
  results.style.display = "block";

  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  results.innerHTML = `<h2>${username}, Your Ethical Alignment:</h2>`;

  const canvas = document.createElement('canvas');
  canvas.id = 'resultsChart';
  canvas.width = 400;
  canvas.height = 200;
  results.appendChild(canvas);

  new Chart(canvas, {
    type: 'bar',
    data: {
      labels: Object.keys(scores).map(k => k.charAt(0).toUpperCase() + k.slice(1)),
      datasets: [{
        label: 'Score',
        data: Object.values(scores),
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 159, 64, 0.6)', 'rgba(153, 102, 255, 0.6)']
      }]
    },
    options: {
      scales: {
        y: { beginAtZero: true }
      }
    }
  });

  sorted.forEach(([key, value]) => {
    results.innerHTML += `<p><strong>${key.toUpperCase()}:</strong> ${value}</p>`;
  });
}

function addHoverImageListeners() {
  const img = document.getElementById("professor-img");
  const buttons = document.querySelectorAll("#scale-options button");

  buttons.forEach((btn, index) => {
    btn.addEventListener("mouseenter", () => {
      if (index === 0 || index === 1) img.src = "worried.png";
      else if (index === 2) img.src = "neutral.png";
      else if (index === 3 || index === 4) img.src = "excited.png";
    });
    btn.addEventListener("mouseleave", () => {
      img.src = "professor.png";
    });
  });
}

window.onload = () => {
  document.getElementById("username").focus();

  const chartScript = document.createElement('script');
  chartScript.src = "https://cdn.jsdelivr.net/npm/chart.js";
  document.head.appendChild(chartScript);

  addHoverImageListeners();
};
