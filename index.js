document.addEventListener("DOMContentLoaded", () => {
  const letters = document.querySelectorAll(".letter");
  const lettersContainer = document.querySelector(".letters");
  const envelope = document.querySelector(".envelope");
  const openEnvelopeButton = document.querySelector("#openEnvelope");

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  const shuffledThings = Array.from(letters);
  shuffleArray(shuffledThings);

  shuffledThings.forEach((letter) => {
    lettersContainer.appendChild(letter);

    function isOverflown(element) {
      return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
    }

    if (!isOverflown(letter)) {
      letter.classList.add("center");
    }

    letter.addEventListener("click", (e) => {
      if (e.target.closest(".closeLetter")) return;
      openEnvelope();
      envelope.classList.add("ready");
      letter.classList.remove("closing");
      letter.classList.add("open");
      e.stopPropagation();
    });
  });

  const openEnvelope = () => {
    envelope.classList.add("active");
  };

  const closeEnvelope = () => {
    envelope.classList.remove("active");
    envelope.classList.remove("ready");
    letters.forEach((letter) => {
      if (!letter.classList.contains("open")) {
        letter.classList.remove("closing");
        return;
      }
      letter.classList.add("closing");
      const onAnimationEnd = (event) => {
        if (event.animationName !== "letter-in") return;
        letter.classList.remove("open", "closing");
        letter.removeEventListener("animationend", onAnimationEnd);
      };
      letter.addEventListener("animationend", onAnimationEnd);
    });
  };

  openEnvelopeButton.addEventListener("click", (e) => {
    openEnvelope();
    e.stopPropagation();
  });

  const closeButtons = document.querySelectorAll(".closeLetter");
  closeButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      closeEnvelope();
      e.stopPropagation();
    });
  });

  document.addEventListener("click", (e) => {
    if (!envelope.classList.contains("active")) return;
    if (e.target.closest(".letter")) return;
    if (e.target.closest("#openEnvelope")) return;
    closeEnvelope();
  });
});
