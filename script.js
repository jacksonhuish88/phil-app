const scenarios = [
  {
    text: "You're hiding a refugee from a government that plans to torture them. The police ask if you're hiding anyone. Is it morally acceptable to lie?",
    tags: { utilitarianism: 2, deontology: -2, virtue: 1 }
  },
  {
    text: "A hospital has 5 patients needing organ transplants. A healthy traveler with compatible organs walks in. Should the doctors sacrifice him to save the 5?",
    tags: { utilitarianism: 2, deontology: -2, virtue: -1 }
  },
  {
    text: "You promised a dying friend you'd never reveal their secret. Years later, the secret could exonerate someone on death row. Should you break the promise?",
    tags: { utilitarianism: 1, deontology: -2, virtue: 1 }
  },
  {
    text: "You're offered money to fake clinical trial data that could speed up approval of a drug that might help millions. Is it ethical to do so?",
    tags: { utilitarianism: 2, deontology: -2, virtue: -2 }
  },
  {
    text: "During war, you're ordered to execute a civilian to intimidate others and prevent a larger uprising. Is obedience to duty ever moral here?",
    tags: { utilitarianism: -1, deontology: 2, virtue: -1 }
  },
  {
    text: "A friend cheats on their partner, who is also your friend. Telling the truth will destroy both friendships. Do you say nothing?",
    tags: { utilitarianism: 1, deontology: -1, virtue: -1 }
  },
  {
    text: "A violent criminal is about to be released on a technicality. You have the power to plant false evidence to keep them imprisoned. Do you do it?",
    tags: { utilitarianism: 1, deontology: -2, virtue: -1 }
  },
  { text: "Withholding a terminal diagnosis from a patient to preserve their mental well-being is the right choice.", tags: { utilitarianism: 1, deontology: -1, virtue: 0 } },
  { text: "A soldier disobeys an order to kill civilians, even though doing so would demoralize the enemy and save his unit.", tags: { utilitarianism: -1, deontology: 2, virtue: 1 } },
  { text: "If someone consents to euthanasia, it is morally acceptable to end their life to relieve their suffering.", tags: { utilitarianism: 2, deontology: -1, virtue: 0 } },
];

let currentIndex = 0;
let scores = { utilitarianism: 0, deontology: 0, virtue: 0 };
let username = "";
let typeInterval;

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
  if (typeInterval) clearInterval(typeInterval);

  let i = 0;
  typeInterval = setInterval(() => {
    typedEl.textContent += text[i];
    i++;
    if (i >= text.length) clearInterval(typeInterval);
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
  canvas.style.maxWidth = '100%';
  canvas.style.maxHeight = '300px';
  canvas.style.marginTop = '20px';
  results.appendChild(canvas);

  window.renderChart = () => {
    new Chart(canvas, {
      type: 'bar',
      data: {
        labels: Object.keys(scores).map(k => k.charAt(0).toUpperCase() + k.slice(1)),
        datasets: [{
          label: 'Score',
          data: Object.values(scores),
          backgroundColor: [
            'rgba(75, 192, 192, 0.6)',
            'rgba(255, 159, 64, 0.6)',
            'rgba(153, 102, 255, 0.6)'
          ],
          borderColor: [
            'rgba(75, 192, 192, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(153, 102, 255, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  };

  sorted.forEach(([key, value]) => {
    results.innerHTML += `<p><strong>${key.toUpperCase()}:</strong> ${value}</p>`;
  });
}

function addHoverImageListeners() {
  const img = document.getElementById("professor-img");
  const buttons = document.querySelectorAll("#scale-options button");

  buttons.forEach((btn, index) => {
    btn.addEventListener("mouseenter", () => {
      switch (index) {
        case 0:
          img.src = "professor-strongly-disagree.png";
          break;
        case 1:
          img.src = "professor-disagree.png";
          break;
        case 2:
          img.src = "professor-neutral.png";
          break;
        case 3:
          img.src = "professor-agree.png";
          break;
        case 4:
          img.src = "professor-strongly-agree.png";
          break;
        default:
          img.src = "professor.png";
      }
    });
    btn.addEventListener("mouseleave", () => {
      img.src = "professor.png";
    });
  });
}

window.onload = () => {
  document.getElementById("username").focus();
  addHoverImageListeners();

  const chartScript = document.createElement('script');
  chartScript.src = "https://cdn.jsdelivr.net/npm/chart.js";
  chartScript.onload = () => {
    console.log("Chart.js loaded successfully.");
    if (typeof renderChart === 'function') renderChart();
  };
  chartScript.onerror = () => alert("Chart.js failed to load. Make sure you're connected to the internet.");
  document.head.appendChild(chartScript);
};