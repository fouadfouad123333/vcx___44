// ---- Notification mnin y-dkhl wa7d ----
// Sjjel f formspree.io, 3mel form jdid, o 7ett l-lien dyalek hna:
const NOTIFY_URL = ""; // mital: "https://formspree.io/f/xxxxxxxx"

if (NOTIFY_URL && !sessionStorage.getItem("notified")) {
  fetch(NOTIFY_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", "Accept": "application/json" },
    body: JSON.stringify({ message: "Wa7d dkhel l-sit dyalek: " + location.pathname })
  }).catch(() => {});
  sessionStorage.setItem("notified", "1");
}

// ---- Jeu: xmn raqm ----
const guessBtn = document.getElementById("guessBtn");
if (guessBtn) {
  let secret = Math.floor(Math.random() * 100) + 1;
  guessBtn.addEventListener("click", () => {
    const value = Number(document.getElementById("guess").value);
    const result = document.getElementById("result");
    if (value === secret) {
      result.textContent = "Mabrouk! L-raqm howa " + secret;
      secret = Math.floor(Math.random() * 100) + 1;
    } else {
      result.textContent = value < secret ? "Kber chwiya" : "Sgher chwiya";
    }
  });
}
