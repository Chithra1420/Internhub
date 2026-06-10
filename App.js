function login(){
  window.location.href = "dashboard.html";
}

function goJobs(){
  window.location.href = "internships.html";
}

function viewJob(){
  window.location.href = "jobdetail.html";
}

function applyJob(){

  const job = {
    company: "Microsoft",
    role: "Software Engineer Intern",
    status: "Applied"
  };

  let appliedJobs =
    JSON.parse(localStorage.getItem("jobs")) || [];

  const alreadyApplied = appliedJobs.find(
  (item)=> item.company === job.company
  );

  if(alreadyApplied){

    alert("Already Applied!");

    return;
  }

  appliedJobs.push(job);

  localStorage.setItem(
    "jobs",
    JSON.stringify(appliedJobs)
  );

  alert("Application Submitted Successfully!");

  window.location.href = "tracker.html";
}
let appliedJobs =
JSON.parse(
localStorage.getItem("appliedJobs")
) || [];

function applyJob(company){

if(!appliedJobs.includes(company)){

appliedJobs.push(company);

localStorage.setItem(
"appliedJobs",
JSON.stringify(appliedJobs)
);

alert("Applied Successfully");

}else{

alert("Already Applied");

}

}

function loadTracker(){

let container =
document.getElementById(
"trackerContainer"
);

if(!container) return;

container.innerHTML="";

appliedJobs.forEach(job=>{

container.innerHTML += `
<div class="card">

<h3>${job}</h3>

<p>Status : Applied</p>

</div>
`;

});

}

loadTracker();
function darkMode(){

document.body.classList.toggle(
"dark"
);

}
async function loadJobs(){

const response =
await fetch(
"https://internshala.com"
);

const data =
await response.json();

console.log(data);

}
fetch("jobs.json")
.then(res=>res.json())
.then(data=>{

data.forEach(job=>{

console.log(job);

});

});
fetch("jobs.json")
.then(res=>res.json())
.then(data=>{

data.forEach(job=>{

console.log(job);

});

});
const skills = [
"HTML",
"CSS",
"JavaScript"
];

function recommend(){

if(
!skills.includes("React")
){

alert(
"Recommended Skill : React"
);

}

}
fetch(API_URL,{
method:"POST"
});
gsap.from(".card",{

y:100,

opacity:0,

duration:1,

stagger:.2

});
gsap.from(".bottom-nav",{

y:100,

duration:1

});
gsap.to(".btn",{

scale:1.05,

duration:.3

});
document
.getElementById("users")
.innerHTML = 120;