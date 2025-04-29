const scenarios = [
  // Virtue Ethics
  {
    text: "Being courageous and kind matters more than rigidly following moral rules.",
    tags: { utilitarianism: 0, deontology: 0, virtue: 2 }
  },
  {
    text: "Developing virtues like patience and courage is more important than rule-following.",
    tags: { utilitarianism: 0, deontology: 0, virtue: 2 }
  },
  {
    text: "Honesty and generosity guide moral behavior better than strict rules.",
    tags: { utilitarianism: 0, deontology: 0, virtue: 2 }
  },
  {
    text: "A good life is about cultivating virtues like honesty, courage, and wisdom.",
    tags: { utilitarianism: 0, deontology: 0, virtue: 2 }
  },
  {
    text: "Being a virtuous person matters more than simply following rules or maximizing happiness.",
    tags: { utilitarianism: 0, deontology: 0, virtue: 2 }
  },

  // Deontology
  {
    text: "Keeping a promise is always right, even if it leads to bad outcomes.",
    tags: { utilitarianism: 0, deontology: 2, virtue: 0 }
  },
  {
    text: "Moral laws must be obeyed even if compassion suggests otherwise.",
    tags: { utilitarianism: 0, deontology: 2, virtue: 0 }
  },
  {
    text: "It is wrong to kill one innocent person to save five others.",
    tags: { utilitarianism: 0, deontology: 2, virtue: 0 }
  },
  {
    text: "Certain actions, like lying or stealing, are always wrong regardless of the result.",
    tags: { utilitarianism: 0, deontology: 2, virtue: 0 }
  },
  {
    text: "Telling the truth is a duty even when a lie would lead to better outcomes.",
    tags: { utilitarianism: 0, deontology: 2, virtue: 0 }
  },

  // Utilitarianism
  {
    text: "Breaking a rule is acceptable if it maximizes overall happiness.",
    tags: { utilitarianism: 2, deontology: 0, virtue: 0 }
  },
  {
    text: "If the outcome brings more happiness, violating moral laws is justified.",
    tags: { utilitarianism: 2, deontology: 0, virtue: 0 }
  },
  {
    text: "You should act to create the greatest happiness for the greatest number.",
    tags: { utilitarianism: 2, deontology: 0, virtue: 0 }
  },
  {
    text: "It is acceptable to betray a friend if it greatly benefits many people.",
    tags: { utilitarianism: 2, deontology: 0, virtue: 0 }
  },
  {
    text: "The right action is the one that produces the best overall results.",
    tags: { utilitarianism: 2, deontology: 0, virtue: 0 }
  }
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

function submitResponse(valueIndex) {
  const weightValues = [-2, -1, 0, 1, 2]; // Strongly Disagree to Strongly Agree
  const userWeight = weightValues[valueIndex];

  const tags = scenarios[currentIndex].tags;

  // Only ADD positive contribution if user agrees or stays neutral
  if (tags.utilitarianism !== 0 && userWeight > 0) {
    scores.utilitarianism += tags.utilitarianism * userWeight;
  }
  if (tags.deontology !== 0 && userWeight > 0) {
    scores.deontology += tags.deontology * userWeight;
  }
  if (tags.virtue !== 0 && userWeight > 0) {
    scores.virtue += tags.virtue * userWeight;
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

  const total = scores.utilitarianism + scores.deontology + scores.virtue;

  const utilitarianismPct = (scores.utilitarianism / total) * 100;
  const deontologyPct = (scores.deontology / total) * 100;
  const virtuePct = (scores.virtue / total) * 100;

  results.innerHTML = `
    <h2 style="margin-bottom: 20px;">${username}, Your Ethical Alignment:</h2>
    <p style="margin-bottom: 50px; font-size: 16px;">Hover over the philosophical theory to learn more</p>
  `;

  const graph = document.createElement("div");
  graph.classList.add("vertical-graph");
  graph.style.paddingBottom = "40px";
  graph.style.width = "80%";
  graph.style.margin = "0 auto";

  const categories = [
    { label: "Utilitarianism", value: utilitarianismPct },
    { label: "Deontology", value: deontologyPct },
    { label: "Virtue", value: virtuePct }
  ];

  for (const { label, value } of categories) {
    const column = document.createElement("div");
    column.classList.add("bar-column");

    const percentageLabel = document.createElement("div");
    percentageLabel.classList.add("bar-percent");
    percentageLabel.textContent = `${value.toFixed(1)}%`;

    const bar = document.createElement("div");
    bar.classList.add("bar-vertical");
    bar.style.height = `${(value / 100) * 300}px`;

    const labelEl = document.createElement("div");
    labelEl.classList.add("bar-label-vertical");
    labelEl.style.width = "130px";
    labelEl.style.whiteSpace = "normal";
    labelEl.style.fontSize = "11px";
    labelEl.style.textAlign = "center";
    labelEl.textContent = label;
    labelEl.setAttribute("data-philosophy", label.toLowerCase());

    column.appendChild(percentageLabel);
    column.appendChild(bar);
    column.appendChild(labelEl);
    graph.appendChild(column);
  }

  results.appendChild(graph);

  // Create and setup popup element
  const popup = document.createElement("div");
  popup.id = "philosophy-popup";
  popup.style.display = "none";
  popup.style.position = "absolute";
  popup.style.background = "white";
  popup.style.color = "black";
  popup.style.border = "1px solid black";
  popup.style.padding = "10px";
  popup.style.borderRadius = "8px";
  popup.style.boxShadow = "0 4px 8px rgba(0,0,0,0.2)";
  popup.style.maxWidth = "250px";
  popup.style.fontSize = "13px";
  popup.style.textAlign = "center";
  popup.style.zIndex = "1000";
  document.body.appendChild(popup);

  // Add hover listeners to bar labels
  const labels = document.querySelectorAll(".bar-label-vertical");
  labels.forEach(label => {
    label.addEventListener("mouseenter", (e) => {
      const philosophy = e.target.dataset.philosophy;
      popup.textContent = getPhilosophyDescription(philosophy);
      const rect = e.target.getBoundingClientRect();
      popup.style.top = `${rect.bottom + window.scrollY + 10}px`;
      popup.style.left = `${rect.left + window.scrollX - 50}px`;
      popup.style.display = "block";
    });
    label.addEventListener("mouseleave", () => {
      popup.style.display = "none";
    });
  });
}

function getPhilosophyDescription(name) {
  switch (name) {
    case "utilitarianism":
      return "Utilitarianism is a consequentialist ethical theory stating that the right action is the one that produces the greatest overall happiness or pleasure for the greatest number of people. It focuses on outcomes and consequences, not intentions or duties. (Bentham, Mill)";
    case "deontology":
      return "Deontology is a duty-based ethical theory that argues actions are morally right or wrong regardless of their outcomes. Morality comes from following set rules, duties, or obligations. (Kant)";
    case "virtue":
      return "Virtue Ethics emphasizes the character and virtues of the individual rather than rules or consequences. A morally good person develops traits like honesty, courage, compassion, and wisdom over time. (Aristotle)";
    default:
      return "";
  }
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
  typeIntro("Welcome to the Philosopher's Dilemma. In this experiment, you'll face a series of ethical situations. Your choices will reveal which philosophical school of thought—Utilitarianism, Deontology, or Virtue Ethics—you lean toward.");
};

function typeIntro(text) {
  const introText = document.getElementById("intro-text");
  if (!introText) return;
  introText.textContent = "";
  let i = 0;
  const interval = setInterval(() => {
    introText.textContent += text[i];
    i++;
    if (i >= text.length) clearInterval(interval);
  }, 40);
}