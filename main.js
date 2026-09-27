/* =========================
   BIRTHDAY DATE
========================= */

const birthdayDate = "2026-09-28";


/* =========================
   ELEMENTS
========================= */

const loginScreen = document.getElementById("loginScreen");
const birthdayWebsite = document.getElementById("birthdayWebsite");

const dateInput = document.getElementById("dateInput");
const unlockBtn = document.getElementById("unlockBtn");
const errorMessage = document.getElementById("errorMessage");

const surprise = document.getElementById("surprise");


/* =========================
   UNLOCK WEBSITE
========================= */

unlockBtn.addEventListener("click", function () {

    const enteredDate = dateInput.value;

    if (enteredDate === birthdayDate) {

        errorMessage.textContent = "";

        loginScreen.style.opacity = "0";
        loginScreen.style.transition = "opacity 0.8s";

        setTimeout(() => {

            loginScreen.classList.add("hidden");
            birthdayWebsite.classList.remove("hidden");

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

            startBirthdayEffects();

        }, 800);

    } else {

        errorMessage.textContent =
            "Hmm... that's not the special date 💗";

        dateInput.animate(
            [
                { transform: "translateX(-8px)" },
                { transform: "translateX(8px)" },
                { transform: "translateX(-5px)" },
                { transform: "translateX(0)" }
            ],
            {
                duration: 350
            }
        );
    }

});


/* =========================
   ENTER KEY
========================= */

dateInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        unlockBtn.click();
    }

});


/* =========================
   SMOOTH SCROLL
========================= */

function scrollToSection(id) {

    const section = document.getElementById(id);

    if (section) {
        section.scrollIntoView({
            behavior: "smooth"
        });
    }

}


/* =========================
   SURPRISE BUTTON
========================= */

function celebrate() {

    surprise.classList.remove("hidden");

    createConfetti();

    surprise.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

}


/* =========================
   CONFETTI
========================= */

function createConfetti() {

    const symbols = ["💗", "✨", "🎉", "🌸", "🎀", "💫", "🦋"];

    for (let i = 0; i < 45; i++) {

        const item = document.createElement("div");

        item.textContent =
            symbols[Math.floor(Math.random() * symbols.length)];

        item.style.position = "fixed";
        item.style.left = Math.random() * 100 + "vw";
        item.style.top = "-30px";
        item.style.fontSize =
            (15 + Math.random() * 20) + "px";

        item.style.zIndex = "9999";
        item.style.pointerEvents = "none";

        document.body.appendChild(item);

        const animation = item.animate(
            [
                {
                    transform: "translateY(0) rotate(0deg)",
                    opacity: 1
                },
                {
                    transform:
                        `translateY(110vh) rotate(${360 + Math.random() * 500}deg)`,
                    opacity: 0
                }
            ],
            {
                duration: 3000 + Math.random() * 2500,
                easing: "cubic-bezier(.2,.8,.3,1)"
            }
        );

        animation.onfinish = () => {
            item.remove();
        };

    }

}


/* =========================
   BIRTHDAY EFFECT
========================= */

function startBirthdayEffects() {

    setTimeout(() => {
        createConfetti();
    }, 700);

}


/* =========================
   COUNTDOWN / BIRTHDAY TIMER
========================= */

function updateCounter() {

    const target =
        new Date("September 28, 2026 00:00:00").getTime();

    const now = new Date().getTime();

    let difference = target - now;

    /*
       Since the birthday date has arrived,
       show a special birthday state.
    */

    if (difference <= 0) {

        document.getElementById("days").textContent = "🎂";
        document.getElementById("hours").textContent = "🎉";
        document.getElementById("minutes").textContent = "💗";
        document.getElementById("seconds").textContent = "✨";

        return;
    }

    const days =
        Math.floor(difference / (1000 * 60 * 60 * 24));

    const hours =
        Math.floor(
            (difference / (1000 * 60 * 60)) % 24
        );

    const minutes =
        Math.floor(
            (difference / (1000 * 60)) % 60
        );

    const seconds =
        Math.floor(
            (difference / 1000) % 60
        );

    document.getElementById("days").textContent =
        String(days).padStart(2, "0");

    document.getElementById("hours").textContent =
        String(hours).padStart(2, "0");

    document.getElementById("minutes").textContent =
        String(minutes).padStart(2, "0");

    document.getElementById("seconds").textContent =
        String(seconds).padStart(2, "0");
}


setInterval(updateCounter, 1000);

updateCounter();
