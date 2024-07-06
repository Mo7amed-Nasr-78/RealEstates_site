const header = document.querySelector("header");
const logo = document.querySelector("header .container .logo");
const container = document.querySelector(".container");
const upButton = document.querySelector(".upBtn");
const headerLinks = document.querySelectorAll(".header .nav_item");
const sections = document.querySelectorAll("section");
const bubbleItems = document.querySelectorAll(".bubble_item");
const burgerIcon = document.querySelector(".burger_icon");
const navLinks = document.querySelectorAll(".nav_link");
const galleryWrapper = document.querySelector(".slider .wrapper");
const galleryCards = document.querySelectorAll(".card");
const GalleryLeftBtn = document.querySelector(".galleryHead .arrows .left");
const GalleryRightBtn = document.querySelector(".galleryHead .arrows .right");
const teamCards = document.querySelectorAll(".team_card");

// Up button code
upButton.onclick = () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
};

window.addEventListener("scroll", () => {
    sections.forEach(( section ) => {
        const sectionID = section.id;
        const correspondingBubble = document.querySelector(`[data-section=${sectionID}]`);

        if (section.getBoundingClientRect().top <= 200 && section.getBoundingClientRect().bottom >= 200 ) {
            bubbleItems.forEach((item) => item.classList.remove("active"));
            if (correspondingBubble.dataset.section === sectionID) {
                correspondingBubble.classList.add("active");
            }
        }
    });
});

// Menu of burger icon script
burgerIcon.addEventListener("click", () => {
    container.classList.toggle("menu");
})

navLinks.forEach(( link ) => {
    link.addEventListener('click', () => {
        container.classList.remove("menu");
    })
})


window.onscroll = () => {

    // script of up button
    if (window.scrollY >= window.innerHeight) {
        upButton.classList.add("up");
    } else {
        upButton.classList.remove("up");
    }

    // script header on scrolling
    if (window.scrollY > 0) {
        header.classList.add("scrolling");
    } else {
        header.classList.remove("scrolling");
    }

};

// Gallery section code.
let scrolledSpace = 0;
let leftMaximumMove = 0;
let rightMaximumMove =
    galleryWrapper.scrollWidth - galleryWrapper.parentElement.clientWidth + 10;

GalleryLeftBtn.onclick = left;

GalleryRightBtn.onclick = right;

window.onresize = () => {

    scrolledSpace = 0;
    if (container.clientWidth < 720) {
        galleryWrapper.style.cssText = `transform: translate(-${scrolledSpace}px)`;
    } else {
        sliderMove();
    }
};

function left() {
    if (scrolledSpace > leftMaximumMove) {
        scrolledSpace -= galleryWrapper.parentElement.clientWidth + 10;
        sliderMove();
    }
}

function right() {
    if (scrolledSpace < rightMaximumMove) {
        scrolledSpace += galleryWrapper.parentElement.clientWidth + 10;
        sliderMove();
    }
}

function sliderMove() {
    galleryWrapper.style.cssText = `transform: translate(-${scrolledSpace}px, -50%);`;
}

// Highlight card code
console.log(galleryCards)
const cards = Array.from(galleryCards);
const cardOfCards = [];
for (let i = 0; i < Math.ceil(galleryCards.length / 3); i++) {
    const temp = [];
    for (let k = 0; k < 3; k++) {
        temp.push(cards.shift());
    }
    cardOfCards.push(temp);
}
for (let i = 0; i < cardOfCards.length; i++) {
    for (let k = 0; k < cardOfCards[i].length; k++) {
        if (k == 1) {
            cardOfCards[i][k].classList.add("active");
        }
    }
}

// Team section code
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        } else {
            entry.target.classList.remove("visible");
        }
    })
})

teamCards.forEach(( card ) => observer.observe(card));