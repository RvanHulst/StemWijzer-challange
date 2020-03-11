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
const CHKBOX = document.getElementById("chkBox");

let answers = [];
let countervraag = 1;
let counter = 0;
let opinionCounter = [];

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
  if (CHKBOX.checked) {
    console.log(counter);
    answers.push({ opinion: answer, checked: true });
    titleDOM.innerHTML = countervraag + ". " + subjects[counter].title;
    questionDOM.innerHTML = subjects[counter].statement;
    counter++;
    calcAnswer();
  } else {
    console.log(counter);
    answers.push({ opinion: answer, checked: false });
    titleDOM.innerHTML = countervraag + ". " + subjects[counter].title;
    questionDOM.innerHTML = subjects[counter].statement;
    counter++;
    calcAnswer();
  }

  if (counter == subjects.length) {
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
  chkBox.style.display = "none";
  chkTEXT.style.display = "none";

  resultContent();
}

function resultContent() {
  calcAnswer();
  opinionCounter.sort((a, b) => a.score - b.score);

  for (let i = 0; i < parties.length; i++) {
    var p1 = document.createElement("p");
    console.log(i);
    if (opinionCounter[parties[i]].score) {
      console.log("1");
      p1.innerHTML =
        opinionCounter[i].name +
        " " +
        Math.floor((100 / subjects.length) * opinionCounter[i].score) +
        "%";
      result_container.prepend(p1);
    } else {
      console.log("2");
      p1.innerHTML = opinionCounter[i].name + " 0%";
      null_container.appendChild(p1);
    }
  }
}

//calcutates the answer
function calcAnswer() {
  let opinionCounter = [];
  for (let index = 0; index < parties.length; index++) {
    opinionCounter.push({ name: parties[index]["name"], score: 0 });
  }

  for (
    let statementIndex = 0;
    statementIndex < answers.length;
    statementIndex++
  ) {
    for (let partyIndex = 0; partyIndex < parties.length - 1; partyIndex++) {
      console.log(statementIndex + " " + partyIndex);
      if (
        subjects[statementIndex].parties[partyIndex].position ===
        answers[statementIndex].opinion
      ) {
        let party = opinionCounter.find(
          element =>
            element.name ===
            subjects[statementIndex]["parties"][partyIndex]["name"]
        );
        if (answers[statementIndex]["checked"] === true) {
          party.score += 2;
        } else {
          party.score += 1;
        }
      }
    }
  }
}
