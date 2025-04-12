const scenarios = [
  { text: "It's okay to break a promise if it helps more people than it hurts.", tags: { utilitarianism: 1, deontology: -1, virtue: 0 } },
  { text: "Lying is wrong, even if it prevents someone from being hurt.", tags: { utilitarianism: -1, deontology: 2, virtue: 0 } },
  { text: "A good person should act based on the kind of character they want to have.", tags: { utilitarianism: 0, deontology: 0, virtue: 2 } },
  { text: "The morality of an action depends solely on its consequences.", tags: { utilitarianism: 2, deontology: -2, virtue: 0 } },
  { text: "You should follow moral rules even if breaking them would lead to better outcomes.", tags: { utilitarianism: -2, deontology: 2, virtue: 0 } },
  { text: "Virtue comes from consistently practicing good habits and decisions.", tags: { utilitarianism: 0, deontology: 0, virtue: 2 } },
  { text: "An action is right if it leads to the greatest happiness for the greatest number.", tags: { utilitarianism: 2, deontology: -1, virtue: 0 } },
  { text: "Doing the right thing means fulfilling your duty, regardless of outcome.", tags: { utilitarianism: -1, deontology: 2, virtue: 0 } },
  { text: "Ethics should focus more on personal growth than on abstract rules or outcomes.", tags: { utilitarianism: 0, deontology: -1, virtue: 2 } },
  { text: "If sacrificing one person saves five others, it is the right thing to do.", tags: { utilitarianism: 2, deontology: -2, virtue: 0 } }
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
        y: {
          beginAtZero: true
        }
      }
    }
  });
  sorted.forEach(([key, value]) => {
    results.innerHTML += `<p><strong>${key.toUpperCase()}:</strong> ${value}</p>`;
  });
}

window.onload = () => {
  document.getElementById("username").focus();

  const chartScript = document.createElement('script');
  chartScript.src = "https://cdn.jsdelivr.net/npm/chart.js";
  document.head.appendChild(chartScript);
};