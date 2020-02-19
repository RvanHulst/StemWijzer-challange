let titleDOM = document.querySelector(".title");
let questionDOM = document.querySelector(".question");

let result_container = document.getElementById("result_container");
let btnContainer = document.querySelector(".w3-display-bottommiddle");

let btnEens = document.querySelector(".btn1");
let btnGeenVanBeide = document.querySelector(".btn2");
let btnOnEens = document.querySelector(".btn3");
let btnSkip = document.querySelector(".btnSkip");
let btnBack = document.querySelector(".btnBack");
let countervraag = 1;
let counter = 0;
let answers = [];

function updateQuestion(answer) {
  if (counter < 30) {
    answers.push(answer);
    titleDOM.innerHTML = countervraag + ". " + subjects[counter].title;
    questionDOM.innerHTML = subjects[counter].statement;
  } else {
    displayResult();
    calcAnswer();
  }
  console.log(answers);
}

function displayResult() {
  titleDOM.innerHTML = "Resultaten";
  result_container.style.display = "block";
  questionDOM.style.display = "none";
  btnBack.style.display = "none";
  btnContainer.style.display = "none";
  resultContent();
}

function calcAnswer() {
  for (let i = 0; i < answers.length; i++) {
    for (let p = 0; p < parties.length - 1; p++) {
      console.log(i + " " + p);
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
  for (let i = 0; i < parties.length; i++) {
    var p = document.createElement("p");
    if (parties[i].score) {
      p.innerHTML = parties[i].name + " " + parties[i].score;
    } else {
      p.innerHTML = parties[i].name + " 0";
    }
    result_container.appendChild(p);
  }
}

function initButtons() {
  btnEens.addEventListener("click", () => {
    if (counter < 30) {
      counter++;
      countervraag++;
      updateQuestion("pro");
    }
  });
  btnGeenVanBeide.addEventListener("click", () => {
    if (counter < 30) {
      counter++;
      countervraag++;
      updateQuestion("none");
    }
  });
  btnOnEens.addEventListener("click", () => {
    if (counter < 30) {
      counter++;
      countervraag++;
      updateQuestion("contra");
    }
  });
  btnSkip.addEventListener("click", () => {
    if (counter < 30) {
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
}
