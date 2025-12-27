const questionContainer = document.querySelector(".question-container");
const resultContainer = document.querySelector(".result-container");
const gifResult = document.querySelector(".gif-result");
const heartLoader = document.querySelector(".cssload-main");
const yesBtn = document.querySelector(".js-yes-btn");
const noBtn = document.querySelector(".js-no-btn");
const questionText = document.querySelector(".question");

// New emotional messages
const messages = [
  "Are you sure? 🥺",
  "Think again... 😢",
  "Why no?? 😭",
  "Please say yes 😔",
  "Just once... 🥹",
  "You’re hurting me 💔",
  "Come on na 😫",
  "Last chance 😖",
  "Don’t break my heart 😞",
  "Say YES, I believe in you 😳",
  "I’ll cry for real 😭",
  "My heart is shaking rn 💔🥹",
  "Why are you running? 😩",
  "Choose love, not violence 😭",
  "You can't escape me 😤💘",
  "One YES won't hurt na 😭",
];

let msgIndex = 0;

// Add shake keyframe dynamically
const style = document.createElement("style");
style.innerHTML = `
@keyframes shake {
  0% { transform: translateX(0) rotate(0); }
  25% { transform: translateX(-6px) rotate(-3deg); }
  50% { transform: translateX(6px) rotate(3deg); }
  75% { transform: translateX(-6px) rotate(-3deg); }
  100% { transform: translateX(0) rotate(0); }
}`;
document.head.appendChild(style);

// Shake animation
function shakeButton(btn) {
  btn.style.animation = "shake 0.3s";
  setTimeout(() => {
    btn.style.animation = "";
  }, 300);
}

// ----------------------------------------------------
// NO BUTTON: Move + Change Text + Shrink/Grow + Shake
// ----------------------------------------------------
noBtn.addEventListener("mouseover", () => {
  const newX = Math.floor(Math.random() * questionContainer.offsetWidth);
  const newY = Math.floor(Math.random() * questionContainer.offsetHeight);

  noBtn.style.left = `${newX}px`;
  noBtn.style.top = `${newY}px`;
});

noBtn.addEventListener("click", () => {
  // Change text message
  questionText.textContent = messages[msgIndex];
  msgIndex = (msgIndex + 1) % messages.length;

  // Shake effect
  shakeButton(noBtn);

  // Shrink/grow randomly
  const newScale = Math.random() * (1.4 - 0.6) + 0.6;
  noBtn.style.transform = `scale(${newScale})`;
});

// ----------------------------------------------------
// YES BUTTON
// ----------------------------------------------------
yesBtn.addEventListener("click", () => {
  questionContainer.style.display = "none";
  heartLoader.style.display = "inherit";

  setTimeout(() => {
    heartLoader.style.display = "none";
    resultContainer.style.display = "inherit";
    gifResult.play();
  }, 3000);
});
