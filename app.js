//buttons
let btnEens = document.querySelector(".btn1");
let btnGeenVanBeide = document.querySelector(".btn2");
let btnOnEens = document.querySelector(".btn3");
let btnSkip = document.querySelector(".btnSkip");
let btnBack = document.querySelector(".btnBack");
//pages
let titleDOM = document.querySelector(".title");
let questionDOM = document.querySelector(".question");

let result_container = document.getElementById("result_container");
let null_container = document.getElementById("null_container");
let btnContainer = document.querySelector(".w3-display-bottommiddle");
//buttons for party choosing
let allesBtn = document.getElementById("allesBtn");
let sclrBtn = document.getElementById("sclrBtn");
let grootBtn = document.getElementById("grootBtn");
let partyKeuzen = document.getElementById("partyKeuzen");
const CHKBOX = document.getElementById("chkBox");

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
  }
});
btnGeenVanBeide.addEventListener("click", () => {
  if (counter <= 30) {
    updateQuestion("none");
  }
});
btnOnEens.addEventListener("click", () => {
  if (counter <= 30) {
    updateQuestion("contra");
  }
});
btnSkip.addEventListener("click", () => {
  if (counter <= 30) {
    updateQuestion("skip");
  }
});
btnBack.addEventListener("click", () => {
  if (counter > 0) {
    answers.pop();
    counter--;
    countervraag--;
    titleDOM.innerHTML = countervraag + ". " + subjects[counter].title;
    questionDOM.innerHTML = subjects[counter].statement;
    console.log(answers);
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
  if (counter == subjects.length - 1) {
    displayResult();
    return;
  }
  if (CHKBOX.checked) answers.push({ opinion: answer, checked: true });
  else answers.push({ opinion: answer, checked: false });

  console.log(answers);

  counter++;
  countervraag++;
  titleDOM.innerHTML = countervraag + ". " + subjects[counter].title;
  questionDOM.innerHTML = subjects[counter].statement;
}
//Bij result answer haalt hij hier dingen weg of laat ze just zien
function displayResult() {
  titleDOM.innerHTML = "Resultaten";
  questionDOM.style.display = "none";
  btnBack.style.display = "none";
  btnContainer.style.display = "none";
  chkBox.style.display = "none";
  chkTEXT.style.display = "none";
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
