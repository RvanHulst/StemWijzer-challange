let btnEens = document.querySelector(".btn1");
let btnGeenVanBeide = document.querySelector(".btn2");
let btnOnEens = document.querySelector(".btn3");
let btnSkip = document.querySelector(".btnSkip");
let btnBack = document.querySelector(".btnBack");

let titleDOM = document.querySelector(".title");
let questionDOM = document.querySelector(".question");

let result_container = document.getElementById("result_container");
let null_container = document.getElementById("null_container");
let btnContainer = document.querySelector(".w3-display-bottommiddle");

let allesBtn = document.getElementById("allesBtn");
let sclrBtn = document.getElementById("sclrBtn");
let grootBtn = document.getElementById("grootBtn");
let partyKeuzen = document.getElementById("partyKeuzen");
const CHKBOX = document.getElementById("chkBox");

let answers = [];
let countervraag = 1;
let counter = 0;

(function() {
  titleDOM.innerHTML = countervraag + ". " + subjects[0].title;
  questionDOM.innerHTML = subjects[0].statement;
})();

//BUTTONS! all function, skipp , back ,and more
(function() {
  btnEens.addEventListener("click", () => {
    if (counter <= 30) {
      countervraag++;
      updateQuestion("pro");
    }
  });
  btnGeenVanBeide.addEventListener("click", () => {
    if (counter <= 30) {
      countervraag++;
      updateQuestion("none");
    }
  });
  btnOnEens.addEventListener("click", () => {
    if (counter <= 30) {
      countervraag++;
      updateQuestion("contra");
    }
  });
  btnSkip.addEventListener("click", () => {
    if (counter <= 30) {
      countervraag++;
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
})();
//Filter buttons
allesBtn.addEventListener("click", () => {
  resultContent("all");
});

sclrBtn.addEventListener("click", () => {
  resultContent("sec");
});
grootBtn.addEventListener("click", () => {
  resultContent("groot");
});

function updateQuestion(answer) {
  if (CHKBOX.checked) answers.push({ opinion: answer, checked: true });
  else answers.push({ opinion: answer, checked: false });

  console.log(answers);

  titleDOM.innerHTML = countervraag + ". " + subjects[counter].title;
  questionDOM.innerHTML = subjects[counter].statement;
  counter++;

  if (counter == subjects.length) {
    displayResult();
  }
}

function displayResult() {
  titleDOM.innerHTML = "Resultaten";
  questionDOM.style.display = "none";
  btnBack.style.display = "none";
  btnContainer.style.display = "none";
  chkBox.style.display = "none";
  chkTEXT.style.display = "none";
  partyKeuzen.style.display = "block";
}

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

//calcutates the answer\
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
