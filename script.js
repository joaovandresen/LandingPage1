/* =========================================================
   SUPERMERCADO MACIEL
   INTERAÇÕES DA LANDING PAGE
========================================================= */

"use strict";


/* =========================================================
   HELPERS
========================================================= */

const $ = (selector, parent = document) =>
    parent.querySelector(selector);

const $$ = (selector, parent = document) =>
    [...parent.querySelectorAll(selector)];


/* =========================================================
   PAGE LOADER
========================================================= */

const pageLoader = $("#pageLoader");

document.body.classList.add("loading");

window.addEventListener("load", () => {

    setTimeout(() => {

        pageLoader.classList.add("hidden");

        document.body.classList.remove("loading");

    }, 650);

});


/* =========================================================
   HEADER SCROLL
========================================================= */

const header = $("#header");
const backTop = $("#backTop");

function handleScroll() {

    const scrollY = window.scrollY;

    if (scrollY > 40) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }


    if (scrollY > 700) {

        backTop.classList.add("show");

    } else {

        backTop.classList.remove("show");

    }

}

window.addEventListener(
    "scroll",
    handleScroll,
    { passive: true }
);

handleScroll();


/* =========================================================
   MOBILE MENU
========================================================= */

const mobileButton =
    $("#mobileMenuButton");

const mobileMenu =
    $("#mobileMenu");


mobileButton.addEventListener("click", () => {

    mobileButton.classList.toggle("open");

    mobileMenu.classList.toggle("open");

});


$$(".mobile-menu a").forEach(link => {

    link.addEventListener("click", () => {

        mobileButton.classList.remove("open");

        mobileMenu.classList.remove("open");

    });

});


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const navLinks =
    $$(".nav-link");

const sections =
    $$("main section[id]");


const updateActiveNavigation = () => {

    const current =
        window.scrollY + 150;

    let activeId = "inicio";

    sections.forEach(section => {

        if (
            current >= section.offsetTop
        ) {

            activeId = section.id;

        }

    });


    navLinks.forEach(link => {

        const href =
            link.getAttribute("href");

        link.classList.toggle(
            "active",
            href === `#${activeId}`
        );

    });

};


window.addEventListener(
    "scroll",
    updateActiveNavigation,
    { passive: true }
);


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
    $$(".reveal");


const revealObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add(
                    "visible"
                );

                revealObserver.unobserve(
                    entry.target
                );

            });

        },

        {
            threshold: .12,
            rootMargin: "0px 0px -50px 0px"
        }

    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =========================================================
   COUNTERS
========================================================= */

const counters =
    $$("[data-counter]");


const counterObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) {
                    return;
                }

                const element =
                    entry.target;

                const target =
                    Number(
                        element.dataset.counter
                    );

                let current = 0;

                const duration = 1200;

                const start =
                    performance.now();


                function animate(time) {

                    const progress =
                        Math.min(
                            (time - start) /
                            duration,
                            1
                        );

                    const eased =
                        1 -
                        Math.pow(
                            1 - progress,
                            3
                        );

                    current =
                        Math.floor(
                            eased * target
                        );

                    element.textContent =
                        current;

                    if (progress < 1) {

                        requestAnimationFrame(
                            animate
                        );

                    } else {

                        element.textContent =
                            target;

                    }

                }


                requestAnimationFrame(
                    animate
                );


                counterObserver.unobserve(
                    element
                );

            });

        },

        {
            threshold: .8
        }

    );


counters.forEach(counter => {

    counterObserver.observe(counter);

});


/* =========================================================
   BACK TO TOP
========================================================= */

backTop.addEventListener(
    "click",
    () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    }
);


/* =========================================================
   MAGNETIC BUTTONS
========================================================= */

const magneticElements =
    $$(".magnetic");


if (
    window.matchMedia(
        "(pointer: fine)"
    ).matches
) {

    magneticElements.forEach(element => {

        element.addEventListener(
            "mousemove",
            event => {

                const rect =
                    element.getBoundingClientRect();

                const x =
                    event.clientX -
                    rect.left -
                    rect.width / 2;

                const y =
                    event.clientY -
                    rect.top -
                    rect.height / 2;

                element.style.transform =
                    `translate(${x * .08}px, ${y * .08}px)`;

            }
        );


        element.addEventListener(
            "mouseleave",
            () => {

                element.style.transform =
                    "";

            }
        );

    });

}


/* =========================================================
   CUSTOM CURSOR
========================================================= */

const cursorDot =
    $(".cursor-dot");

const cursorOutline =
    $(".cursor-outline");


if (
    cursorDot &&
    cursorOutline &&
    window.matchMedia(
        "(pointer: fine)"
    ).matches
) {

    let mouseX = 0;
    let mouseY = 0;

    let outlineX = 0;
    let outlineY = 0;


    window.addEventListener(
        "mousemove",
        event => {

            mouseX = event.clientX;
            mouseY = event.clientY;

            cursorDot.style.left =
                `${mouseX}px`;

            cursorDot.style.top =
                `${mouseY}px`;

        }
    );


    function animateCursor() {

        outlineX +=
            (mouseX - outlineX) * .15;

        outlineY +=
            (mouseY - outlineY) * .15;

        cursorOutline.style.left =
            `${outlineX}px`;

        cursorOutline.style.top =
            `${outlineY}px`;

        requestAnimationFrame(
            animateCursor
        );

    }


    animateCursor();


    $$(
        "a, button, .value-card, .feature-card, .hero-card"
    ).forEach(element => {

        element.addEventListener(
            "mouseenter",
            () => {

                cursorOutline.classList.add(
                    "hover"
                );

            }
        );


        element.addEventListener(
            "mouseleave",
            () => {

                cursorOutline.classList.remove(
                    "hover"
                );

            }
        );

    });

}


/* =========================================================
   HERO CARD PARALLAX
========================================================= */

const heroCard =
    $(".hero-card");


if (
    heroCard &&
    window.matchMedia(
        "(pointer: fine)"
    ).matches
) {

    heroCard.addEventListener(
        "mousemove",
        event => {

            const rect =
                heroCard.getBoundingClientRect();

            const x =
                (event.clientX -
                    rect.left) /
                rect.width;

            const y =
                (event.clientY -
                    rect.top) /
                rect.height;

            const rotateY =
                (x - .5) * 8;

            const rotateX =
                (.5 - y) * 6;

            heroCard.style.transform =
                `
                perspective(1000px)
                rotateY(${rotateY}deg)
                rotateX(${rotateX}deg)
                translateY(-5px)
                `;

        }
    );


    heroCard.addEventListener(
        "mouseleave",
        () => {

            heroCard.style.transform =
                `
                perspective(1000px)
                rotateY(-5deg)
                rotateX(2deg)
                `;

        }
    );

}


/* =========================================================
   SMOOTH ANCHORS
========================================================= */

$$('a[href^="#"]').forEach(link => {

    link.addEventListener(
        "click",
        event => {

            const targetId =
                link.getAttribute("href");

            if (
                targetId === "#" ||
                !targetId
            ) {
                return;
            }

            const target =
                $(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({

                behavior: "smooth",

                block: "start"

            });

        }
    );

});


/* =========================================================
   FOOTER YEAR
========================================================= */

const year =
    $("#currentYear");

if (year) {

    year.textContent =
        new Date().getFullYear();

}


/* =========================================================
   DYNAMIC YEAR MESSAGE
========================================================= */

const foundationYear = 1991;

const currentYear =
    new Date().getFullYear();

const years =
    currentYear - foundationYear;


$$("[data-counter]").forEach(
    element => {

        const target =
            Number(
                element.dataset.counter
            );

        if (target === 30) {

            element.dataset.counter =
                years;

        }

    }
);


/* =========================================================
   IMAGE FALLBACK
========================================================= */

$$("img").forEach(image => {

    image.addEventListener(
        "error",
        () => {

            image.style.opacity = "0";

        }
    );

});


/* =========================================================
   KEYBOARD ACCESSIBILITY
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            mobileButton.classList.remove(
                "open"
            );

            mobileMenu.classList.remove(
                "open"
            );

        }

    }
);