// Scenarios
const scenarios = [
    {
      text: "Is it ever okay to lie to protect someone’s feelings?",
      choices: [
        { text: "Yes, if it reduces harm overall.", philosopher: "Mill" },
        { text: "No, lying is always wrong no matter the outcome.", philosopher: "Kant" },
        { text: "It depends on the kind of person you want to be.", philosopher: "Aristotle" }
      ]
    },
    {
      text: "You discover your best friend is cheating on exams. Do you report them?",
      choices: [
        { text: "Yes, rules should be followed no matter the situation.", philosopher: "Kant" },
        { text: "Only if reporting them creates a better outcome.", philosopher: "Mill" },
        { text: "Not unless their actions are infringing on others’ rights.", philosopher: "Locke" }
      ]
    },
    {
      text: "You wake up and suspect everything around you is a simulation. What do you do?",
      choices: [
        { text: "Doubt everything until you find certainty.", philosopher: "Descartes" },
        { text: "Trust your senses and proceed with practical reasoning.", philosopher: "Aristotle" },
        { text: "Focus on how you act now, regardless of what’s real.", philosopher: "Sartre" }
      ]
    },
    {
      text: "Should wealth be redistributed more equally in society?",
      choices: [
        { text: "Yes, because no one should benefit from advantages they didn’t earn.", philosopher: "Rawls" },
        { text: "No, people have a right to what they acquire fairly.", philosopher: "Locke" },
        { text: "Only if doing so improves the well-being of society.", philosopher: "Mill" }
      ]
    },
    {
      text: "You made a promise, but keeping it will hurt someone. Do you keep it?",
      choices: [
        { text: "Yes, a promise is a duty regardless of consequence.", philosopher: "Kant" },
        { text: "Only if keeping it leads to better outcomes.", philosopher: "Mill" },
        { text: "Depends on what a virtuous person would do.", philosopher: "Aristotle" }
      ]
    },
    {
      text: "A scientist offers to plug you into a machine that simulates a perfect life. Do you accept?",
      choices: [
        { text: "Yes—happiness is the ultimate goal.", philosopher: "Mill" },
        { text: "No—real experience matters more than illusion.", philosopher: "Aristotle" },
        { text: "No—freedom and authenticity matter most.", philosopher: "Sartre" }
      ]
    },
    {
      text: "A high-paying job is offered to you, but it feels meaningless. What do you do?",
      choices: [
        { text: "Take it—comfort and security matter most.", philosopher: "Mill" },
        { text: "Decline—I need work that fulfills my human potential.", philosopher: "Aristotle" },
        { text: "Decline—I define myself through free choices.", philosopher: "Sartre" }
      ]
    },
    {
      text: "Your government wants to draft you into a war you disagree with. What do you do?",
      choices: [
        { text: "Follow the law—it’s my civic duty.", philosopher: "Kant" },
        { text: "Refuse—the state exists to protect my freedom.", philosopher: "Locke" },
        { text: "Refuse—my freedom is mine to define.", philosopher: "Sartre" }
      ]
    },
    {
      text: "Should a doctor ever lie to a patient to give them hope?",
      choices: [
        { text: "Yes, if it helps them heal and reduces suffering.", philosopher: "Mill" },
        { text: "No, honesty is always required.", philosopher: "Kant" },
        { text: "Depends on what a wise and compassionate doctor would do.", philosopher: "Aristotle" }
      ]
    },
    {
      text: "A criminal committed a terrible act years ago but has reformed. Should they still be punished?",
      choices: [
        { text: "Yes—justice demands accountability.", philosopher: "Kant" },
        { text: "No—they are not the same person anymore.", philosopher: "Parfit" },
        { text: "Only if punishment prevents future harm.", philosopher: "Mill" }
      ]
    },
    {
      text: "If you could permanently alter your identity and memories to be someone happier, would you?",
      choices: [
        { text: "Yes—if it makes life better, why not?", philosopher: "Mill" },
        { text: "No—my identity matters, even if I’m unhappy.", philosopher: "Parfit" },
        { text: "Only if doing so helps me reach my full potential.", philosopher: "Aristotle" }
      ]
    },
    {
      text: "You can save five people by pushing one stranger onto the tracks. Do you do it?",
      choices: [
        { text: "Yes—saving more lives is the right call.", philosopher: "Mill" },
        { text: "No—it's wrong to use a person as a means to an end.", philosopher: "Kant" },
        { text: "I'd consider what a noble and balanced person would do.", philosopher: "Aristotle" }
      ]
    },
    {
      text: "Should people be allowed to sell their own organs?",
      choices: [
        { text: "Yes—it’s their body and their right.", philosopher: "Locke" },
        { text: "Only if it benefits society and avoids exploitation.", philosopher: "Mill" },
        { text: "No—it violates human dignity.", philosopher: "Kant" }
      ]
    }
  ]; // ← This is the end of the scenarios array


  let currentScenario = 0;
  const philosopherScores = {};
  let selectedEmoji = "";
  let username = "";
  
  function selectCharacter(emoji) {
    selectedEmoji = emoji;
    document.getElementById("selected-character").textContent = `You selected: ${emoji}`;
    document.getElementById("start-btn").disabled = false;
  }
  
  function startQuiz() {
    username = document.getElementById("username").value.trim();
    if (!username) {
      alert("Please enter your name.");
      return;
    }
  
    document.getElementById("character").textContent = selectedEmoji;
    document.getElementById("start-screen").style.display = "none";
  
    showScenario();
  }
  
  function showScenario() {
    const cloud = document.getElementById("cloud");
    cloud.style.opacity = "1";
    cloud.style.animation = "cloudFlash 1s ease-in-out infinite";
    const character = document.getElementById("character");
    const obstacle = document.getElementById("obstacle");
    const scenarioDiv = document.getElementById("scenario");
    const choicesDiv = document.getElementById("choices");
    const ground = document.getElementById("ground");
  
    scenarioDiv.textContent = "";
    choicesDiv.innerHTML = "";
  
    // Start ground animation
    ground.style.animationPlayState = "running";
  
    // Animate new obstacle
    obstacle.textContent = getRandomObstacle();
    obstacle.style.animation = "none";
    void obstacle.offsetWidth;
    obstacle.style.animation = "moveObstacle 2s linear forwards";
  
    // Delay the jump to align with obstacle passing under the character
    // Show cloud before jump
    setTimeout(() => {
      character.classList.remove("jump");
      cloud.classList.remove("jump");
      void character.offsetWidth;
      void cloud.offsetWidth;
      character.classList.add("jump");
      cloud.classList.add("jump");
  
      // Stop ground animation right after the jump finishes
      setTimeout(() => {
        ground.style.animationPlayState = "paused";
        cloud.style.animation = "none";
        cloud.style.opacity = "0";
      }, 1); // matches the jump animation duration
    }, 1000);
  
    // Show question and choices immediately
    const scenario = scenarios[currentScenario];
    scenarioDiv.textContent = scenario.text;
  
    scenario.choices.forEach(choice => {
      const btn = document.createElement("button");
      btn.textContent = choice.text;
      btn.onclick = () => {
        philosopherScores[choice.philosopher] = (philosopherScores[choice.philosopher] || 0) + 1;
        currentScenario++;
        if (currentScenario < scenarios.length) {
          showScenario();
        } else {
          showResults();
        }
      };
      choicesDiv.appendChild(btn);
    });
  }
  
  function getRandomObstacle() {
    const obstacles = ["🪵", "🦉", "🌵", "🪨", "🐍"];
    return obstacles[Math.floor(Math.random() * obstacles.length)];
  }
  
  function showResults() {
    document.getElementById("game-container").style.display = "none";
    document.getElementById("scenario").style.display = "none";
    document.getElementById("choices").style.display = "none";
  
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = `<h2>${username}, Your Philosophical Alignment:</h2>`;
  
    const total = Object.values(philosopherScores).reduce((a, b) => a + b, 0);
    const maxScore = Math.max(...Object.values(philosopherScores));
  
    const graph = document.createElement("div");
    graph.classList.add("vertical-graph");
  
    for (const [philosopher, score] of Object.entries(philosopherScores)) {
      const percentage = ((score / total) * 100).toFixed(1);
      const scaledHeight = (score / maxScore) * 300;
  
      const column = document.createElement("div");
      column.classList.add("bar-column");
  
      const percentageLabel = document.createElement("div");
      percentageLabel.classList.add("bar-percent");
      percentageLabel.textContent = `${percentage}%`;
  
      const bar = document.createElement("div");
      bar.classList.add("bar-vertical");
      bar.style.height = `${scaledHeight}px`;
  
      const label = document.createElement("div");
      label.classList.add("bar-label-vertical");
      label.textContent = philosopher;
  
      column.appendChild(percentageLabel);
      column.appendChild(bar);
      column.appendChild(label);
      graph.appendChild(column);
    }
  
    resultsDiv.appendChild(graph);
  }  

window.onload = () => {
  // optional: preload something or auto-focus name input
};
