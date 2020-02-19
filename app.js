let titleDOM = document.querySelector(".title");
let questionDOM = document.querySelector(".question");

let btnEens = document.querySelector(".btn1");
let btnGeenVanBeide = document.querySelector(".btn2");
let btnOnEens = document.querySelector(".btn3");
let btnResult = document.querySelector(".btnResult");
let btnSkip = document.querySelector(".btnSkip");
let btnBack = document.querySelector(".btnBack");
let countervraag = 1;
let counter = 0;
let answers = [];

function updateQuestion(answer) {
  if (counter < 12) {
    answers.push(answer);
    titleDOM.innerHTML = countervraag + ". " + subjects[counter].title;
    questionDOM.innerHTML = subjects[counter].statement;
  } else {
    displayResult();
    calcAnswer();
  }
  console.log(answers);
}

function start() {
  updateQuestion("start");
}

function displayResult() {
  titleDOM.innerHTML = "End";
  questionDOM.innerHTML = "Click result voor het resultaat";
  btnResult.style.display = "initial";
  btnEens.style.display = "none";
  btnGeenVanBeide.style.display = "none";
  btnOnEens.style.display = "none";
  btnSkip.style.display = "none";
  btnBack.style.display = "none";

  document.location.href = "Result.html";
}

function calcAnswer() {
  for (let i = 0; i < answers.length; i++) {
    for (let p = 0; p < parties.length; p++) {
      if (subjects[i].parties[p].position == answers[i]) {
        if (!parties[p].score) {
          parties[p].score = +1;
        } else {
          parties[p].score = parties[p].score + 1;
        }
      }
    }
  }
}

function resultContent() {
  calcAnswer();

  var container = document.getElementById("result_container");

  for (let i = 0; i < answers.length; i++) {
    var p = document.createElement("p");
    p.innerHTML = parties[i].score;
    container.appendChild(p);
  }
}

btnEens.addEventListener("click", () => {
  if (counter < 12) {
    counter++;
    countervraag++;
    updateQuestion("pro");
  }
});
btnGeenVanBeide.addEventListener("click", () => {
  if (counter < 12) {
    counter++;
    countervraag++;
    updateQuestion("none");
  }
});
btnOnEens.addEventListener("click", () => {
  if (counter < 12) {
    counter++;
    countervraag++;
    updateQuestion("contra");
  }
});
btnSkip.addEventListener("click", () => {
  if (counter < 12) {
    counter++;
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
