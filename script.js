const questions = [
  {
    q: "Que signifie HTML ?",
    a: [
      "Hyper Text Markup Language",
      "High Tech Modern Language",
      "Home Tool Machine Language",
      "Hyper Transfer Main Link"
    ],
    c: 0,
    e: "HTML signifie Hyper Text Markup Language."
  },
  {
    q: "Combien font 7 × 8 ?",
    a: ["54", "56", "64", "48"],
    c: 1,
    e: "7 × 8 = 56."
  },
  {
    q: "Quel langage sert principalement à styliser une page web ?",
    a: ["HTML", "Python", "CSS", "SQL"],
    c: 2,
    e: "CSS permet de définir les couleurs, la disposition et le style."
  },
  {
    q: "Quel nombre complète la suite : 2, 4, 6, 8, ... ?",
    a: ["9", "12", "10", "11"],
    c: 2,
    e: "On ajoute 2 à chaque étape : la réponse est 10."
  },
  {
    q: "Quel langage permet de rendre une page web interactive ?",
    a: ["JavaScript", "HTML seul", "CSS seul", "Photoshop"],
    c: 0,
    e: "JavaScript permet de créer des interactions sur une page web."
  },
  {
    q: "Combien font 25 + 17 ?",
    a: ["40", "42", "43", "32"],
    c: 1,
    e: "25 + 17 = 42."
  },
  {
    q: "Combien de côtés possède un hexagone ?",
    a: ["5", "7", "8", "6"],
    c: 3,
    e: "Un hexagone possède 6 côtés."
  },
  {
    q: "Quel est le contraire de « rapide » ?",
    a: ["Lent", "Fort", "Grand", "Facile"],
    c: 0,
    e: "Le contraire de rapide est lent."
  }
];

const $ = id => document.getElementById(id);

let current = 0;
let score = 0;
let answered = false;
let record = Number(localStorage.getItem("brainQuestRecord")) || 0;

$("record").textContent = record;

function showQuestion() {
  answered = false;
  const q = questions[current];

  $("level").textContent = `${current + 1} / ${questions.length}`;
  $("score").textContent = score;
  $("question").textContent = q.q;
  $("feedback").textContent = "";
  $("next").disabled = true;
  $("next").textContent =
    current === questions.length - 1
      ? "Voir mon résultat →"
      : "Question suivante →";

  $("progressBar").style.width =
    `${(current / questions.length) * 100}%`;

  $("answers").replaceChildren();

  q.a.forEach((answer, index) => {
    const button = document.createElement("button");
    button.className = "answer";
    button.textContent = answer;
    button.addEventListener("click", () => chooseAnswer(index, button));
    $("answers").appendChild(button);
  });
}

function chooseAnswer(index, button) {
  if (answered) return;
  answered = true;

  const q = questions[current];
  const buttons = $("answers").querySelectorAll("button");

  buttons.forEach(b => b.disabled = true);

  if (index === q.c) {
    score += 10;
    button.classList.add("correct");
    $("feedback").textContent = "✅ Bonne réponse ! +10 points";
    $("feedback").style.color = "#36d997";
  } else {
    button.classList.add("wrong");
    buttons[q.c].classList.add("correct");
    $("feedback").textContent = "❌ Pas tout à fait. " + q.e;
    $("feedback").style.color = "#ff6685";
  }

  $("score").textContent = score;
  $("progressBar").style.width =
    `${((current + 1) / questions.length) * 100}%`;

  $("next").disabled = false;
}

function showResult() {
  $("gameContent").hidden = true;
  $("result").hidden = false;
  $("finalScore").textContent =
    `Ton score : ${score} / ${questions.length * 10}`;

  if (score > record) {
    record = score;
    localStorage.setItem("brainQuestRecord", record);
    $("record").textContent = record;
    $("message").textContent = "🎉 Nouveau record ! Félicitations !";
  } else if (score === questions.length * 10) {
    $("message").textContent = "Incroyable ! Tu as tout réussi ! 🧠";
  } else if (score >= 50) {
    $("message").textContent = "Excellent travail ! Continue comme ça !";
  } else {
    $("message").textContent =
      "Bien essayé ! Rejoue pour améliorer ton score.";
  }
}

$("next").addEventListener("click", () => {
  if (!answered) return;

  if (current < questions.length - 1) {
    current++;
    showQuestion();
  } else {
    showResult();
  }
});

$("restart").addEventListener("click", () => {
  current = 0;
  score = 0;
  $("result").hidden = true;
  $("gameContent").hidden = false;
  showQuestion();
});

$("themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("light");
  $("themeToggle").textContent =
    document.body.classList.contains("light") ? "🌙" : "☀️";
});

showQuestion();
