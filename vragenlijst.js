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

function updateQuestion(answer) {
  console.log(counter);
  answers.push(answer);
  titleDOM.innerHTML = countervraag + ". " + subjects[counter].title;
  questionDOM.innerHTML = subjects[counter].statement;
  counter++;

  if (counter == subjects.length) {
    alert();
    displayResult();
    calcAnswer();
    sortAnswer();
  }
}

function displayResult() {
  titleDOM.innerHTML = "Resultaten";
  result_container.style.display = "block";
  questionDOM.style.display = "none";
  btnBack.style.display = "none";
  btnContainer.style.display = "none";
  resultContent();
}

function resultContent() {
  calcAnswer();
  parties.sort((a, b) => a.score - b.score);

  for (let i = 0; i < parties.length; i++) {
    var p1 = document.createElement("p");
    if (parties[i].score) {
      p1.innerHTML =
        parties[i].name +
        " " +
        Math.floor((100 / subjects.length) * parties[i].score) +
        "%";
      result_container.prepend(p1);
    } else {
      p1.innerHTML = parties[i].name + " 0%";
      null_container.appendChild(p1);
    }
  }
}

//calcutates the answer
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
