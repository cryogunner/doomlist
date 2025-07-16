const input=document.getElementById("textInput");//input box variable
const button=document.getElementById("txtInputBtn");//button box variable

const taskList=document.getElementById("taskList");//variable that stores ul where task will be added

button.addEventListener("click",()=>{//button click run function

const taskText=input.value.trim();//input value with white spaces
if (taskText==="") {
    alert("at least pretend to care")
return;//if no input return nothing
}
const li=createTaskElement(taskText);//memory list item
taskList.appendChild(li);//adds li to the actual list

input.value="";
saveTask(); 
});
loadTask(); //initial load

//function to save tasks
function saveTask(){
    
    const tasks=[];//empty array to store task texts

    document.querySelectorAll("#taskList li .task-text").forEach(span => {
        tasks.push(span.textContent.trim());
    });//go through each element to grab texts
    localStorage.setItem("myTasks",JSON.stringify(tasks));//convert array to string and store it
    updateProgress();
}

//function to add tasks
function loadTask(){

    let saved=localStorage.getItem("myTasks");//get string of saved items from LocalStorage
    if(!saved) {
        //create default task list
        const defaultTasks=[
            "Build a portfolio",
            "Learn a skill",
            "Take a bath"
        ];
        localStorage.setItem("myTasks",JSON.stringify(defaultTasks));//save it to localstorage
        saved=JSON.stringify(defaultTasks);//assign it to saved to use right after
    }//for first load when no new items added
    
    const tasks=JSON.parse(saved);//parse to create araay of tasks from string 

    tasks.forEach(task=>{
        const li=createTaskElement(task);
        taskList.appendChild(li);
    });//go through each element and add to tasklist
    updateProgress();
}
function updateProgress(){
    const totalTasks=document.querySelectorAll("#taskList li").length; /*count of all current tasks */
    const completedTasks=document.querySelectorAll("#taskList li.completed").length;
    const percent=totalTasks===0?0:Math.round((completedTasks/totalTasks)*100);

    const progressBar=document.getElementById("progress-bar");
    const progressText=document.getElementById("progress-text");

    progressBar.style.width=percent+"%";

    if(percent===0){
        progressText.textContent="no progress yet. just dread.";
    }else if(percent===100){
        progressText.textContent="you did it. are you okay?";
    }else{
        progressText.textContent=`${percent}% done. you're trying. i guess.`;
    }

    
}
//helper function
function createTaskElement(taskText){
const li=document.createElement("li");//create list item

const textSpan=document.createElement("span");//holds text
textSpan.textContent=taskText;
textSpan.classList.add("task-text");

const delBtn=document.createElement("span");//delete button variable
delBtn.textContent = "⌫";
delBtn.classList.add("delete-btn");

textSpan.addEventListener("click",()=>{ //strikethrough only on textspan
    li.classList.toggle("completed");
    updateProgress(); //update progress bar
});
delBtn.addEventListener("click",()=>{
    li.style.animation="fadeOut 0.5s forwards";
    setTimeout(()=>{
    li.remove();//remove from DOM
    saveTask();//update localStorage
    },500);
});
li.appendChild(textSpan);
li.appendChild(delBtn);//add delete button
return li;
}
//glitch animation
const header=document.querySelector("h2");

setInterval(()=>{ /*runs code every second*/
    if(Math.random>0.9){ /*randomly allows glitch*/
        header.style.opacity=0.3; /*makes element nearly transparent*/
        setTimeout(()=>{
            header.style.opacity=1; //full opacity
        },100);
    }
},1000);

// emotional weather panel
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
//funtion for dynamic mood change
function updateMood(){

const randomIndex=Math.floor(Math.random()*emotionalStates.length); /*choose random phrase*/
const mood=emotionalStates[randomIndex];

document.getElementById("emotion-text").textContent=mood;
}
updateMood();
setInterval(updateMood,8000); /*update every 8seconds*/

/*click to strikethrough for bonus-tasks*/
document.querySelectorAll("#bonusList li").forEach(item=>{ /*select each item in bonusList*/
    item.addEventListener("click",()=>{ /*listens for click*/
        item.classList.toggle("completed"); /*adds or removes strikethrough class when clicked*/
    });
});
