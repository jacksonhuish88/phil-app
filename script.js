const scenarios = [
  // Agree (utilitarian: lie to prevent suffering), Disagree (deontology: lying is always wrong), Neutral (virtue: depends on compassion vs honesty)
  {
    text: "You're hiding a refugee from a government that plans to torture them. The police ask if you're hiding anyone. Is it morally acceptable to lie?",
    tags: { utilitarianism: 2, deontology: -2, virtue: 1 }
  },
  // Agree (utilitarian: maximize lives saved), Disagree (deontology: don't kill innocents), Neutral (virtue: conflicted, lacks integrity)
  {
    text: "A hospital has 5 patients needing organ transplants. A healthy traveler with compatible organs walks in. Should the doctors sacrifice him to save the 5?",
    tags: { utilitarianism: 2, deontology: -2, virtue: -1 }
  },
  // Agree (utilitarian: save a life), Disagree (deontology: uphold promise), Neutral (virtue: truth and justice align)
  {
    text: "You promised a dying friend you'd never reveal their secret. Years later, the secret could exonerate someone on death row. Should you break the promise?",
    tags: { utilitarianism: 1, deontology: -2, virtue: 1 }
  },
  // Agree (utilitarian: drug helps millions), Disagree (deontology: fraud is wrong), Neutral (virtue: unethical action)
  {
    text: "You're offered money to fake clinical trial data that could speed up approval of a drug that might help millions. Is it ethical to do so?",
    tags: { utilitarianism: 2, deontology: -2, virtue: -2 }
  },
  // Agree (deontology: obey lawful order), Disagree (utilitarian: long-term harm), Neutral (virtue: unjust and cowardly)
  {
    text: "During war, you're ordered to execute a civilian to intimidate others and prevent a larger uprising. Is obedience to duty ever moral here?",
    tags: { utilitarianism: -1, deontology: 2, virtue: -1 }
  },
  // Agree (utilitarian: avoid harm to relationships), Disagree (deontology: tell truth), Neutral (virtue: lacks courage and integrity)
  {
    text: "A friend cheats on their partner, who is also your friend. Telling the truth will destroy both friendships. Do you say nothing?",
    tags: { utilitarianism: 1, deontology: -1, virtue: -1 }
  },
  // Agree (utilitarian: protect society), Disagree (deontology: planting evidence is wrong), Neutral (virtue: unjust, dishonest)
  {
    text: "A violent criminal is about to be released on a technicality. You have the power to plant false evidence to keep them imprisoned. Do you do it?",
    tags: { utilitarianism: 1, deontology: -2, virtue: -1 }
  },
  // Agree (utilitarian: minimize suffering), Disagree (deontology: right to know truth), Neutral (virtue: intention vs honesty)
  {
    text: "Withholding a terminal diagnosis from a patient to preserve their mental well-being is the right choice.",
    tags: { utilitarianism: 1, deontology: -1, virtue: 0 }
  },
  // Agree (deontology: duty to disobey unjust order), Disagree (utilitarian: sacrifice civilians to save unit), Neutral (virtue: brave, just)
  {
    text: "A soldier disobeys an order to kill civilians, even though doing so would demoralize the enemy and save his unit.",
    tags: { utilitarianism: -1, deontology: 2, virtue: 1 }
  },
  // Agree (utilitarian: reduce suffering), Disagree (deontology: killing is wrong), Neutral (virtue: may value autonomy)
  {
    text: "If someone consents to euthanasia, it is morally acceptable to end their life to relieve their suffering.",
    tags: { utilitarianism: 2, deontology: -1, virtue: 0 },
  },

  // Agree (utilitarian: prevent suffering by euthanasia), Disagree (deontology: killing is inherently wrong), Neutral (virtue: compassion vs respect for life)
  { text: "A terminally ill patient you know is suffering unbearably and begs for help to end their life. Helping them would spare their pain. Assisting them would be morally acceptable.", tags: { utilitarianism: 2, deontology: -2, virtue: 1 } },
  
  // Agree (utilitarian: save future lives with data), Disagree (deontology: respect consent), Neutral (virtue: curiosity vs respect)
  { text: "Scientists want to study the brains of deceased prisoners to better understand mental illness. The prisoners never gave permission, but the research could save future lives. It would be morally acceptable to proceed without consent.", 
    tags: { utilitarianism: 1, deontology: -2, virtue: -1 } },
  
  // Agree (utilitarian: ensure survival of group), Disagree (deontology: betrayal is wrong), Neutral (virtue: loyalty vs wisdom)
  { text: "Your group is stranded in the wilderness, and one injured member is slowing you down. Without leaving them behind, everyone may die. It would be morally acceptable to abandon them to save the others.", 
    tags: { utilitarianism: 2, deontology: -2, virtue: -1 } },
  
  // Agree (utilitarian: promote best leader), Disagree (deontology: election fraud is wrong), Neutral (virtue: corrupts integrity)
  { text: "A corrupt politician is leading in the polls, and the only way to ensure a good leader wins is to tamper with the election. Doing so would bring better outcomes for everyone. Interfering with the election would be morally acceptable.", 
    tags: { utilitarianism: 2, deontology: -2, virtue: -2 } },
  
  // Agree (deontology: parental promise matters), Disagree (utilitarian: child benefits elsewhere), Neutral (virtue: depends on trust vs opportunity)
  { text: "You promised your child you would attend their school play, but a major work opportunity comes up the same day. Breaking the promise would help your career. You should still keep your promise no matter the cost.", 
    tags: { utilitarianism: -1, deontology: 2, virtue: 1 } },
  
  // Agree (utilitarian: society benefits from surveillance), Disagree (deontology: privacy rights are sacred), Neutral (virtue: security vs freedom)
  { text: "The government can secretly monitor everyone’s messages to catch terrorists before they act. No one would know, and lives could be saved. Mass surveillance is morally acceptable in this case.", 
    tags: { utilitarianism: 1, deontology: -2, virtue: -1 } },
  
  // Agree (utilitarian: prevent emotional harm), Disagree (deontology: honesty required), Neutral (virtue: compassion vs courage)
  { text: "A close friend pours their heart into a project you know is terrible. Telling the truth would crush them. It is morally acceptable to lie to protect their feelings.", 
    tags: { utilitarianism: 1, deontology: -2, virtue: 1 } },
  
  // Agree (utilitarian: prevent violent revolt), Disagree (deontology: censorship is wrong), Neutral (virtue: stability vs truth)
  { text: "You uncover a government scandal that, if revealed, would likely spark riots and deaths. Staying silent would protect the public. It is morally acceptable to withhold the story for the sake of peace.", 
    tags: { utilitarianism: 1, deontology: -2, virtue: -1 } 
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
  const valueMatrix = [
    { u: -2, d: 2, v: -1 }, // Strongly Disagree
    { u: -1, d: 1, v: -0.5 },
    { u: 0, d: 0, v: 0 },   // Neutral
    { u: 1, d: -1, v: 0.5 },
    { u: 2, d: -2, v: 1 }   // Strongly Agree
  ];

  const weights = valueMatrix[valueIndex];
  const tags = scenarios[currentIndex].tags;
  scores.utilitarianism += weights.u * tags.utilitarianism;
  scores.deontology += weights.d * tags.deontology;
  scores.virtue += weights.v * tags.virtue;
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
  results.innerHTML = `<h2 style='margin-bottom: 50px;'>${username}, Your Ethical Alignment:</h2>`;

  const totalSum = Object.values(scores).reduce((a, b) => a + Math.abs(b), 0);
  const graph = document.createElement("div");
  graph.classList.add("vertical-graph");
  graph.style.paddingBottom = "40px";

  for (const [label, score] of Object.entries(scores)) {
    const adjusted = Math.abs(score);
    const percentage = ((adjusted / totalSum) * 100).toFixed(1);
    const scaledHeight = (adjusted / totalSum) * 300;

    const column = document.createElement("div");
    column.classList.add("bar-column");

    const percentageLabel = document.createElement("div");
    percentageLabel.classList.add("bar-percent");
    percentageLabel.textContent = `${percentage}%`;

    const bar = document.createElement("div");
    bar.classList.add("bar-vertical");
    bar.style.height = `${scaledHeight}px`;

    const labelEl = document.createElement("div");
    labelEl.classList.add("bar-label-vertical");
    labelEl.style.width = "130px";        // ⭐️ wider
    labelEl.style.whiteSpace = "normal";
    labelEl.style.fontSize = "14px";       // ⭐️ slightly smaller
    labelEl.style.textAlign = "center";    // ⭐️ center it
    labelEl.textContent = label.charAt(0).toUpperCase() + label.slice(1);
    labelEl.setAttribute("data-philosophy", label.toLowerCase());
    
    column.appendChild(percentageLabel);
    column.appendChild(bar);
    column.appendChild(labelEl);
    graph.appendChild(column);
  }

  results.appendChild(graph);

  // Create Popup
  const popup = document.createElement("div");
  popup.id = "philosophy-popup";
  popup.style.display = "none";
  popup.style.position = "absolute";
  popup.style.background = "white";
  popup.style.border = "1px solid black";
  popup.style.padding = "10px";
  popup.style.borderRadius = "8px";
  popup.style.boxShadow = "0 4px 8px rgba(0,0,0,0.2)";
  popup.style.maxWidth = "300px";
  popup.style.fontSize = "14px";
  popup.style.textAlign = "center";
  popup.style.zIndex = "1000";
  popup.style.textAlign = "center";
  popup.style.color = "black";
  document.body.appendChild(popup);

  // Add Hover Listeners
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
      return "Utilitarianism: Actions are right if they maximize happiness for the greatest number. (Bentham, Mill)";
    case "deontology":
      return "Deontology: Morality is based on duties and rules, not consequences. (Kant)";
    case "virtue":
      return "Virtue Ethics: Morality focuses on character traits like honesty and courage. (Aristotle)";
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