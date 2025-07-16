const input = document.getElementById("textInput");
const button = document.getElementById("txtInputBtn");
const taskList = document.getElementById("taskList");

button.addEventListener("click", () => {
  const taskText = input.value.trim();
  if (taskText === "") {
    alert("at least pretend to care");
    return;
  }

  const li = createTaskElement(taskText);
  taskList.appendChild(li);

  input.value = "";
  saveTask();
});

loadTask(); // initial load

function saveTask() {
  const tasks = [];
  document.querySelectorAll("#taskList li .task-text").forEach(span => {
    tasks.push(span.textContent.trim());
  });
  localStorage.setItem("myTasks", JSON.stringify(tasks));
  updateProgress();
}

function loadTask() {
  let saved = localStorage.getItem("myTasks");

  if (!saved) {
    const defaultTasks = [
      "Build a portfolio",
      "Learn a skill",
      "Take care of myself"
    ];
    localStorage.setItem("myTasks", JSON.stringify(defaultTasks));
    saved = JSON.stringify(defaultTasks);
  }

  const tasks = JSON.parse(saved);
  tasks.forEach(task => {
    const li = createTaskElement(task);
    taskList.appendChild(li);
  });

  updateProgress();
}

function updateProgress() {
  const totalTasks = document.querySelectorAll("#taskList li").length;
  const completedTasks = document.querySelectorAll("#taskList li.completed").length;
  const percent = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  const progressBar = document.getElementById("progress-bar");
  const progressText = document.getElementById("progress-text");

  progressBar.style.width = percent + "%";

  if (percent === 0) {
    progressText.textContent = "No progress yet. Just dread.";
  } else if (percent === 100) {
    progressText.textContent = "you did it. are you okay?";
  } else {
    progressText.textContent = `${percent}% done. you're trying. i guess.`;
  }
}

function createTaskElement(taskText) {
  const li = document.createElement("li");

  const textSpan = document.createElement("span");
  textSpan.textContent = taskText;
  textSpan.classList.add("task-text");

  const delBtn = document.createElement("span");
  delBtn.textContent = "⌫";
  delBtn.classList.add("delete-btn");

  textSpan.addEventListener("click", () => {
    li.classList.toggle("completed");
    textSpan.classList.add("clicked"); //temporary flash
    setTimeout(()=>textSpan.classList.remove("clicked"),400);
    updateProgress();
  });

  delBtn.addEventListener("click", () => {
    li.style.animation = "fadeOut 0.5s forwards";
    setTimeout(() => {
      li.remove();
      saveTask();
    }, 500);
  });

  li.appendChild(textSpan);
  li.appendChild(delBtn);
  return li;
}

// Glitch animation for h2
const header = document.querySelector("h2");
setInterval(() => {
  if (Math.random() > 0.9) {
    header.style.opacity = 0.3;
    setTimeout(() => {
      header.style.opacity = 1;
    }, 100);
  }
}, 1000);

// Emotional weather updates
const emotionalStates = [
  "Foggy with 60% chance of spiraling.",
  "Clear skies, but inner monologue is screaming.",
  "Partly dissociating with low motivation winds.",
  "Scattered overthinking, highs of regret.",
  "Melancholy front moving in from the past.",
  "Emotionally unavailable with scattered rage.",
  "Cloudy with suppressed ambition.",
  "Sunny outside, hollow inside.",
  "Pressure dropping, anxiety surge likely.",
  "Currently rebooting emotions… please wait.",
  "Low dopamine pressure with mild existential drizzle.",
  "Hope? Sighted faintly. Might be a hallucination.",
  "Restless winds and regret accumulation warning.",
  "Overcast with social dread.",
  "Time is fake. Productivity lower than usual.",
  "Burnout detected. Recommend immediate disconnection.",
  "Self-worth undefined; please check syntax.",
  "Tsunami of thoughts; brain evacuated.",
  "Memory leak — too many tabs open in soul.",
  "Core meltdown averted... for now.",
  "Forecast: choking on unspoken sentences.",
  "Low visibility: thoughts fogged by shame.",
  "Muffled thunderstorms in throat region.",
  "Winds carrying fragments of conversations I wish I never had.",
  "Speech advisory: verbal overexposure warning.",
  "Tidal surge of wanting to disappear quietly.",
  "Rain expected: heavy with regret and things left unsaid.",
  "Partly cloudy with high risk of being perceived.",
  "Muted skies — internal monologue on loudspeaker.",
  "Drought conditions in self-trust levels.",
  "Smog advisory: choking on everyone else's expectations.",
  "Crumbling pressure systems from long-forgotten dreams.",
  "Heatwave of 'I should've shut up' incoming.",
  "Scattered attempts to connect, none sticking.",
  "Severe emotional isolation front approaching fast.",
  "Air thick with old selves clawing to be understood.",
  "Overcast with fragmented identity patterns.",
  "Radio silence likely — emotional systems offline.",
  "Ghost rains: longing with no source of storm.",
  "Psychic cold snap: all warmth retreated overnight.",
  "Fog advisory: no direction, no destination.",
  "Forecast shows a longing-shaped void forming.",
  "Perception storm warning: mirror cracked beyond repair.",
  "Eclipse of self — light never fully returns.",
  "Abandoned outpost vibes in the chest region.",
  "Need to shut up forever.",
  "Being known feels like a burden.",
  "Dragging a ghost version of myself behind me.",
  "Everything I say feels like betrayal.",
  "I wish I was mute, words only ruin me.",
  "I want to vanish quietly, like an unused room.",
  "Being perceived feels like violence.",
  "I'm not healing, I'm just hiding better.",
  "I only exist in almosts and not quites"
];

function updateMood() {
  const randomIndex = Math.floor(Math.random() * emotionalStates.length);
  const mood = emotionalStates[randomIndex];
  document.getElementById("emotion-text").textContent = mood;
}
updateMood();
setInterval(updateMood, 8000);

// Bonus list strikethrough logic
document.querySelectorAll("#bonusList li").forEach(item => {
  item.addEventListener("click", () => {
    item.classList.toggle("completed");
    item.classList.add("clicked");
    setTimeout(()=>item.classList.remove("clicked"),400);
  });
});
