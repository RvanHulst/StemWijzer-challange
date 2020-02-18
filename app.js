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
let lastAwnser = "";
let awnsers = {
  eens: 0,
  oneens: 0,
  geenVanBijde: 0
};

function updateQuestion() {
  if (counter <= 11) {
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

  console.log(awnsers);
}

(() => {
  updateQuestion();
})();

btnEens.addEventListener("click", () => {
  if (counter < 12) {
    awnsers.eens++;
    lastAwnser = "eens";
    counter++;
    countervraag++;
    updateQuestion();
  }
});
btnGeenVanBeide.addEventListener("click", () => {
  if (counter < 12) {
    awnsers.geenVanBijde++;
    lastAwnser = "geen";
    counter++;
    countervraag++;
    updateQuestion();
  }
});
btnOnEens.addEventListener("click", () => {
  if (counter < 12) {
    awnsers.oneens++;
    lastAwnser = "oneens";
    counter++;
    countervraag++;
    updateQuestion();
  }
});
btnSkip.addEventListener("click", () => {
  if (counter < 12) {
    counter++;
    countervraag++;
    lastAwnser = "";
    updateQuestion();
  }
});
btnBack.addEventListener("click", () => {
  console.log(countervraag);
  countervraag--;
  console.log(countervraag);
  if (lastAwnser == "eens") {
    awnsers.eens--;
    counter--;
    updateQuestion();
  } else if (lastAwnser == "geen") {
    awnsers.geenVanBijde--;
    counter--;
    updateQuestion();
  } else if (lastAwnser == "oneens") {
    awnsers.oneens--;
    counter--;
    updateQuestion();
  } else {
    counter--;
    updateQuestion();
  }
});
