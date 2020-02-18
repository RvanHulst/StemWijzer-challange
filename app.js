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
  if (counter <= 11) {
    answers.push(answer);
    titleDOM.innerHTML = countervraag + ". " + subjects[counter].title;
    questionDOM.innerHTML = subjects[counter].statement;
  } else {
    titleDOM.innerHTML = "End";
    questionDOM.innerHTML = "Click result voor het resultaat";
    btnResult.style.display = "initial";
    btnEens.style.display = "none";
    btnGeenVanBeide.style.display = "none";
    btnOnEens.style.display = "none";
    btnSkip.style.display = "none";
    btnBack.style.display = "none";
  }

  console.log(answers);
}

(() => {
  updateQuestion("start");
})();

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
