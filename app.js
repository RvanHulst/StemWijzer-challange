//buttons
const btnEens = document.querySelector(".btn1");
const btnGeenVanBeide = document.querySelector(".btn2");
const btnOnEens = document.querySelector(".btn3");
const btnSkip = document.querySelector(".btnSkip");
const btnBack = document.querySelector(".btnBack");
//pages
const titleDOM = document.querySelector(".title");
const questionDOM = document.querySelector(".question");

const resultContainer = document.getElementById("result_container");
const nullContainer = document.getElementById("null_container");
const btnContainer = document.querySelector(".w3-display-bottommiddle");
//buttons for party choosing
const allesBtn = document.getElementById("allesBtn");
const sclrBtn = document.getElementById("sclrBtn");
const grootBtn = document.getElementById("grootBtn");
const partyKeuzen = document.getElementById("partyKeuzen");
const chkBox = document.getElementById("chkBox");
const chkText = document.getElementById("chkText");

//Numbers
let answers = [];
let countervraag = 1;
let counter = 0;

(function() {
  titleDOM.innerHTML = countervraag + ". " + subjects[counter].title;
  questionDOM.innerHTML = subjects[counter].statement;
})();

//BUTTONS! all function, skipp , back ,and more, (Button Events.)
btnEens.addEventListener("click", () => {
  if (counter <= 30) {
    updateQuestion("pro");
    chkBox.checked = false;
  }
});
btnGeenVanBeide.addEventListener("click", () => {
  if (counter <= 30) {
    updateQuestion("none");
    chkBox.checked = false;
  }
});
btnOnEens.addEventListener("click", () => {
  if (counter <= 30) {
    updateQuestion("contra");
    chkBox.checked = false;
  }
});
btnSkip.addEventListener("click", () => {
  if (counter <= 30) {
    updateQuestion("skip");
    chkBox.checked = false;
  }
});
btnBack.addEventListener("click", () => {
  if (counter > 0) {
    console.log(answers)
    // checkAnswer(answers[counter].opinion);
    counter--;
    countervraag--;
    titleDOM.innerHTML = countervraag + ". " + subjects[counter].title;
    questionDOM.innerHTML = subjects[counter].statement;
    chkBox.checked = false;
    colorUpdate(answers[counter].opinion,answers[counter].checked);
  }
});

//Filter buttons for the parties to choose , all,sec or groot
allesBtn.addEventListener("click", () => {
  resultContent("all");
});
sclrBtn.addEventListener("click", () => {
  resultContent("sec");
});
grootBtn.addEventListener("click", () => {
  resultContent("groot");
});

//updates qeustion en checked als het ingevuld is en houd counter bij
function updateQuestion(answer) {
  if (chkBox.checked) answers.splice(counter, 1, { opinion: answer, checked: true });
  else answers.splice(counter, 1, {  opinion: answer, checked: false });
       console.log(answers)
       checkAnswer(answer);

  if (counter == subjects.length - 1) {
    displayResult();
    return;
  }

  counter++;
  countervraag++;
  titleDOM.innerHTML = countervraag + ". " + subjects[counter].title;
  questionDOM.innerHTML = subjects[counter].statement;
 
  if (answers[counter]){
    colorUpdate(answers[counter].opinion,answers[counter].checked);
  }
  else {
    colorUpdate();
  }
}
function colorUpdate(opinion,inportant){
  btnEens.style.background = "black";
  btnGeenVanBeide.style.background = "black";
  btnOnEens.style.background = "black";

  if (opinion == "pro"){
    btnEens.style.background = "#01b4dc";
  }
  else if (opinion == "none"){
    btnGeenVanBeide.style.background = "#01b4dc";
  }
  else if (opinion == "contra"){
    btnOnEens.style.background = "#01b4dc";
  }
  
  if (inportant == true){
    chkBox.checked = true;
  }
 
}
//Bij result answer haalt hij hier dingen weg of laat ze just zien
function displayResult() {
  titleDOM.innerHTML = "Resultaten";
  questionDOM.style.display = "none";
  btnBack.style.display = "none";
  btnContainer.style.display = "none";
  chkBox.style.display = "none";
  chkText.style.display = "none";
  partyKeuzen.style.display = "block";
}
//Hier kan je kiezen tussen de parties , zoals > groot ,seculier of alle
function resultContent(keuzen) {
  partyKeuzen.innerHTML = "";
  calcAnswer();
  parties.sort((a, b) => a.score - b.score);

  for (let i = 0; i < parties.length; i++) {
    if (keuzen == "all") {
      var p1 = document.createElement("p");
      if (parties[i].score) {
        p1.innerHTML = parties[i].name + " " + parties[i].score;
        result_container.prepend(p1);
      } else {
        p1.innerHTML = parties[i].name + " 0";
        null_container.appendChild(p1);
      }
    } else if (keuzen == "sec") {
      if (parties[i].secular == true) {
        var p1 = document.createElement("p");
        if (parties[i].score) {
          p1.innerHTML = parties[i].name + " " + parties[i].score;
          result_container.prepend(p1);
        } else {
          p1.innerHTML = parties[i].name + " 0";
          null_container.appendChild(p1);
        }
      }
    } else if (keuzen == "groot") {
      if (parties[i].size >= 10) {
        var p1 = document.createElement("p");
        if (parties[i].score) {
          p1.innerHTML = parties[i].name + " " + parties[i].score;
          result_container.prepend(p1);
        } else {
          p1.innerHTML = parties[i].name + " 0";
          null_container.appendChild(p1);
        }
      }
    }
  }
}

function checkAnswer(answer){
  console.log(answer);

}

//calcutates the answer of all the answers and gives u the best, hier staan ook deze telt sterker mee punten worden hier ook berekent
function calcAnswer() {
  for (let i = 0; i < answers.length; i++) {
    for (let p = 0; p < parties.length - 1; p++) {
      if (subjects[i].parties[p].position == answers[i].opinion) {
        for (let part = 0; part < parties.length; part++) {
          if (subjects[i].parties[p].name == parties[part].name) {
            if (answers[i]["checked"] == true) {
              if (!parties[part].score) parties[part].score = 2;
              else parties[part].score = parties[part].score + 2;
            } else {
              if (!parties[part].score) parties[part].score = 1;
              else parties[part].score = parties[part].score + 1;
            }
          }
        }
      }
    }
  }
}
// parties[part].score += 2;
