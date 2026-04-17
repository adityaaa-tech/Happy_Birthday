let code = "";

const boxes = document.querySelectorAll(".code-display span");
const buttons = document.querySelectorAll(".keypad button");
const nextBtn = document.getElementById("nextBtn");

const screen1 = document.getElementById("screen1");
const screen2 = document.getElementById("screen2");
const screen3 = document.getElementById("screen3");
const screen4 = document.getElementById("screen4");
const screen5 = document.getElementById("screen5");
const screen6 = document.getElementById("screen6");

const noBtn = document.getElementById("noBtn");
const tryBtn = document.getElementById("tryBtn");
const yesBtn = document.getElementById("yesBtn");
const finalNext = document.getElementById("finalNext");

const giftGrid = document.getElementById("giftGrid");

const popup = document.getElementById("popup");
const popupImg = document.getElementById("popupImg");
const closePopup = document.getElementById("closePopup");

/* 🎶 MUSIC */
const bgMusic = document.getElementById("bgMusic");
let musicStarted = false;

/* ❤️ HEART */
function createHeart(x, y) {
    const heart = document.createElement("div");
    heart.classList.add("float-heart");
    heart.innerText = "❤";
    heart.style.left = x + "px";
    heart.style.top = y + "px";
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 1000);
}

/* PASSCODE */
buttons.forEach(btn => {
    btn.onclick = () => {

        // 🎶 start music
        if (!musicStarted) {
            bgMusic.play();
            bgMusic.volume = 0;

            let fade = setInterval(() => {
                if (bgMusic.volume < 0.5) {
                    bgMusic.volume += 0.05;
                } else {
                    clearInterval(fade);
                }
            }, 200);

            musicStarted = true;
        }

        const rect = btn.getBoundingClientRect();
        createHeart(rect.left + rect.width/2, rect.top);

        if (code.length < 4) {
            code += btn.innerText;
            boxes[code.length - 1].innerText = btn.innerText;
        }

        if (code.length === 4) nextBtn.style.display = "block";
    };
});

/* NAVIGATION */
nextBtn.onclick = () => {
    screen1.classList.remove("active");
    screen2.classList.add("active");
};

noBtn.onclick = () => {
    screen2.classList.remove("active");
    screen3.classList.add("active");
};

tryBtn.onclick = () => {
    screen3.classList.remove("active");
    screen2.classList.add("active");
};

yesBtn.onclick = () => {
    screen2.classList.remove("active");
    screen4.classList.add("active");
    generateGifts();
};

/* FINAL LOVE */
finalNext.onclick = () => {
    screen4.classList.remove("active");
    screen6.classList.add("active");
    startHearts();
};

/* GIFTS */
function generateGifts() {
    giftGrid.innerHTML = "";

    for (let i = 0; i < 9; i++) {
        let div = document.createElement("div");
        div.classList.add("gift-box");

        let img = document.createElement("img");
        img.src = "gift.png";

        div.appendChild(img);

        div.onclick = () => {

            div.classList.add("clicked");
            setTimeout(() => div.classList.remove("clicked"), 250);

            setTimeout(() => {

                if (i === 0) openPopup("photo1.jpeg", "photo1A.png");
                else if (i === 1) openPopup("photo2.jpg", "photo2A.png");

                else if (i === 4) openPopup("photo5.jpeg", "photo5A.png");
                else if (i === 5) openPopup("photo6.jpeg", "photo6A.png");
                else if (i === 7) openPopup("photo8.jpeg", "photo8A.png");
                else if (i === 8) openPopup("photo9.jpeg", "photo9A.png");

                else {
                    screen4.classList.remove("active");
                    screen5.classList.add("active");
                }

            }, 120);
        };

        giftGrid.appendChild(div);
    }
}

/* POPUP */
function openPopup(first, second) {
    popup.style.display = "flex";
    popupImg.src = first;

    setTimeout(() => {
        popupImg.classList.add("fade-out");

        setTimeout(() => {
            popupImg.src = second;
            popupImg.classList.remove("fade-out");
            popupImg.classList.add("fade-in");

            setTimeout(() => {
                popupImg.classList.remove("fade-in");
            }, 700);

        }, 700);

    }, 2500);
}

/* CLOSE */
closePopup.onclick = () => popup.style.display = "none";

popup.onclick = (e) => {
    if (e.target === popup) popup.style.display = "none";
};

/* ❤️ FINAL HEARTS */
function startHearts() {
    setInterval(() => {
        const heart = document.createElement("div");
        heart.classList.add("heart-bg");
        heart.innerText = "❤";

        heart.style.left = Math.random() * 100 + "vw";

        screen6.appendChild(heart);

        setTimeout(() => heart.remove(), 5000);
    }, 300);
}
/* FIX: go back to gift screen on tap */
screen5.onclick = () => {
    screen5.classList.remove("active");
    screen4.classList.add("active");
};