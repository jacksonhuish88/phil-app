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
    text: "A violent criminal is about to be released on a technicality. You have the power to plant false evidence to keep them imprisoned. Do you do it?",
    tags: {
      utilitarianism: 1,    // May protect society
      deontology: -2,       // Framing someone is never morally acceptable
      virtue: -1            // Dishonest and unjust action
    }
  },
  { text: "Withholding a terminal diagnosis from a patient to preserve their mental well-being is the right choice.", tags: { utilitarianism: 1, deontology: -1, virtue: 0 } },
  { text: "A soldier disobeys an order to kill civilians, even though doing so would demoralize the enemy and save his unit.", tags: { utilitarianism: -1, deontology: 2, virtue: 1 } },
  { text: "If someone consents to euthanasia, it is morally acceptable to end their life to relieve their suffering.", tags: { utilitarianism: 2, deontology: -1, virtue: 0 } },
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
