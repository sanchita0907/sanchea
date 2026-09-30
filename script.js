/* =========================================================
   SANCHÉA — MAIN JAVASCRIPT
========================================================= */


/* =========================================================
   PAGE LOADER
========================================================= */

window.addEventListener("load", () => {

    const loader =
        document.querySelector(".page-loader");

    setTimeout(() => {

        loader.classList.add("hide");

    }, 900);

});


/* =========================================================
   NAVBAR
========================================================= */

const navbar =
    document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

});


/* =========================================================
   MOBILE MENU
========================================================= */

const menuToggle =
    document.querySelector(".menu-toggle");

const mobileMenu =
    document.querySelector(".mobile-menu");

if (menuToggle && mobileMenu) {

    menuToggle.addEventListener("click", () => {

        mobileMenu.classList.toggle("active");

    });

}


document.querySelectorAll(".mobile-menu a")
.forEach(link => {

    link.addEventListener("click", () => {

        mobileMenu.classList.remove("active");

    });

});


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(
        ".intro-section, .ritual-section, .assistant-section, .assessment-section, footer"
    );

revealElements.forEach(element => {

    element.classList.add("reveal");

});


const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: .15
        }
    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =========================================================
   RITUAL CARD TILT
========================================================= */

document.querySelectorAll(".ritual-card")
.forEach(card => {

    card.addEventListener("mousemove", event => {

        if (window.innerWidth < 800) return;

        const rect =
            card.getBoundingClientRect();

        const x =
            event.clientX - rect.left;

        const y =
            event.clientY - rect.top;

        const centerX =
            rect.width / 2;

        const centerY =
            rect.height / 2;

        const rotateX =
            ((y - centerY) / centerY) * -2;

        const rotateY =
            ((x - centerX) / centerX) * 2;

        card.style.transform =
            `perspective(800px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-10px)
             scale(1.015)`;

    });


    card.addEventListener("mouseleave", () => {

        card.style.transform = "";

    });

});


/* =========================================================
   BEAUTY CARD PARALLAX
========================================================= */

const beautyCard =
    document.querySelector(".beauty-card");

document.addEventListener("mousemove", event => {

    if (
        window.innerWidth < 800 ||
        !beautyCard
    ) return;

    const x =
        (window.innerWidth / 2 - event.clientX) / 100;

    const y =
        (window.innerHeight / 2 - event.clientY) / 100;

    beautyCard.style.transform =
        `rotate(2deg)
         translate(${x}px,${y}px)`;

});


/* =========================================================
   HERO PARALLAX
========================================================= */

const heroContent =
    document.querySelector(".hero-content");

window.addEventListener("scroll", () => {

    if (
        window.innerWidth < 800 ||
        !heroContent
    ) return;

    if (window.scrollY < window.innerHeight) {

        heroContent.style.transform =
            `translateY(${window.scrollY * .08}px)`;

    }

});


/* =========================================================
   FLOATING CARDS
========================================================= */

const floatingCards =
    document.querySelectorAll(".floating-card");

document.addEventListener("mousemove", event => {

    if (window.innerWidth < 800) return;

    const mouseX =
        event.clientX / window.innerWidth - .5;

    const mouseY =
        event.clientY / window.innerHeight - .5;

    floatingCards.forEach((card,index) => {

        const strength =
            index === 0 ? 12 : -10;

        card.style.marginLeft =
            `${mouseX * strength}px`;

        card.style.marginTop =
            `${mouseY * strength}px`;

    });

});


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const sections =
    document.querySelectorAll("section[id]");

const navLinks =
    document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 160;

        const sectionHeight =
            section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY <
            sectionTop + sectionHeight
        ) {

            currentSection =
                section.id;

        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            `#${currentSection}`
        ) {

            link.classList.add("active");

        }

    });

});


/* =========================================================
   RIPPLE EFFECT
========================================================= */

document.querySelectorAll(
    ".primary-button, .secondary-button, .large-button, .assistant-button"
)
.forEach(button => {

    button.addEventListener("click", function(event) {

        const ripple =
            document.createElement("span");

        ripple.style.position = "absolute";

        ripple.style.borderRadius = "50%";

        ripple.style.background =
            "rgba(255,255,255,.25)";

        ripple.style.pointerEvents =
            "none";

        const rect =
            this.getBoundingClientRect();

        const size =
            Math.max(
                rect.width,
                rect.height
            );

        ripple.style.width =
            `${size}px`;

        ripple.style.height =
            `${size}px`;

        ripple.style.left =
            `${event.clientX - rect.left - size/2}px`;

        ripple.style.top =
            `${event.clientY - rect.top - size/2}px`;

        ripple.style.transform =
            "scale(0)";

        ripple.style.transition =
            "transform .6s ease, opacity .6s ease";

        this.style.position =
            "relative";

        this.style.overflow =
            "hidden";

        this.appendChild(ripple);

        requestAnimationFrame(() => {

            ripple.style.transform =
                "scale(2)";

            ripple.style.opacity =
                "0";

        });

        setTimeout(() => {

            ripple.remove();

        },600);

    });

});


/* =========================================================
   BEAUTY AI CHATBOT
========================================================= */

const chatMessages =
    document.getElementById("chatMessages");

const chatInput =
    document.getElementById("chatInput");

const sendButton =
    document.getElementById("sendButton");

const voiceButton =
    document.getElementById("voiceButton");

const openChatButton =
    document.getElementById("openChatButton");

const voiceOpenButton =
    document.getElementById("voiceOpenButton");


/* =========================================================
   BEAUTY KNOWLEDGE
========================================================= */

function getBeautyReply(message) {

    const text =
        message.toLowerCase();


    if (
        text.includes("skin") ||
        text.includes("skincare")
    ) {

        return `
        A simple skincare routine can be:

        <br><br>

        <strong>Morning</strong><br>
        • Gentle cleanser<br>
        • Lightweight moisturizer<br>
        • Broad-spectrum sunscreen

        <br><br>

        <strong>Night</strong><br>
        • Cleanser<br>
        • Moisturizer

        <br><br>

        If your skin is oily, choose lightweight
        non-comedogenic products. If it feels dry,
        focus more on gentle cleansing and hydration.
        `;

    }


    if (
        text.includes("hair") ||
        text.includes("wavy") ||
        text.includes("curly")
    ) {

        return `
        For healthier-looking hair, keep your routine
        simple:

        <br><br>

        • Use a shampoo suitable for your scalp<br>
        • Condition the lengths regularly<br>
        • Avoid excessive heat<br>
        • Detangle gently<br>
        • Use a leave-in product if your hair needs
          extra moisture

        <br><br>

        For wavy or curly hair, scrunching a lightweight
        styling product into damp hair can help define
        the natural pattern.
        `;

    }


    if (
        text.includes("makeup") ||
        text.includes("lipstick") ||
        text.includes("blush")
    ) {

        return `
        For a simple everyday makeup look:

        <br><br>

        1. Light base or skin tint<br>
        2. Concealer where needed<br>
        3. Soft blush<br>
        4. Mascara<br>
        5. Lip tint or lipstick<br>
        6. Optional highlighter

        <br><br>

        For college, keeping the base light and
        comfortable usually creates a fresh,
        effortless look.
        `;

    }


    if (
        text.includes("groom") ||
        text.includes("college") ||
        text.includes("office")
    ) {

        return `
        A polished everyday grooming routine can be:

        <br><br>

        • Clean, well-maintained hair<br>
        • Simple skincare<br>
        • Neat nails<br>
        • Fresh clothes<br>
        • Light fragrance<br>
        • Clean shoes<br>
        • Minimal accessories<br>
        • Good posture

        <br><br>

        The goal is not to look overly styled —
        it is to look neat, comfortable and confident.
        `;

    }


    if (
        text.includes("routine") ||
        text.includes("daily")
    ) {

        return `
        Let's make it simple ✨

        <br><br>

        <strong>Morning</strong><br>
        Cleanse → Moisturize → Sunscreen

        <br><br>

        <strong>Day</strong><br>
        Hydrate → Keep hair neat → Reapply
        sunscreen when appropriate

        <br><br>

        <strong>Night</strong><br>
        Cleanse → Moisturize → Rest

        <br><br>

        You can then add haircare, makeup or
        grooming steps depending on your needs.
        `;

    }


    if (
        text.includes("hello") ||
        text.includes("hi") ||
        text.includes("hey")
    ) {

        return `
        Hello ✨

        I'm SANCHÉA AI.

        <br><br>

        You can ask me about skincare, haircare,
        makeup, grooming or beauty routines.

        <br><br>

        Try asking:
        <br>
        "Give me a skincare routine"
        `;

    }


    return `
        I can help you explore your beauty routine ✨

        <br><br>

        Try asking me about:

        <br><br>

        • Skincare<br>
        • Haircare<br>
        • Wavy / curly hair<br>
        • Makeup<br>
        • Grooming<br>
        • College looks<br>
        • Office-ready grooming<br>
        • Daily beauty routines

        <br><br>

        Tell me what you want to improve and
        I'll help you build a simple routine.
    `;

}


/* =========================================================
   ADD MESSAGE
========================================================= */

function addMessage(content,type) {

    const message =
        document.createElement("div");

    message.className =
        `chat-message ${type}-message`;

    message.innerHTML =
        content;

    chatMessages.appendChild(message);

    chatMessages.scrollTop =
        chatMessages.scrollHeight;

}


/* =========================================================
   TYPING INDICATOR
========================================================= */

function showTyping() {

    const typing =
        document.createElement("div");

    typing.className =
        "chat-message assistant-message typing-message";

    typing.id =
        "typingIndicator";

    typing.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;

    chatMessages.appendChild(typing);

    chatMessages.scrollTop =
        chatMessages.scrollHeight;

}


function removeTyping() {

    const typing =
        document.getElementById(
            "typingIndicator"
        );

    if (typing) {

        typing.remove();

    }

}


/* =========================================================
   SEND MESSAGE
========================================================= */

function sendMessage() {

    const message =
        chatInput.value.trim();

    if (!message) return;


    addMessage(
        escapeHTML(message),
        "user"
    );


    chatInput.value = "";

    showTyping();


    setTimeout(() => {

        removeTyping();

        const reply =
            getBeautyReply(message);

        addMessage(
            reply,
            "assistant"
        );

        speakText(
            stripHTML(reply)
        );

    },850);

}


sendButton.addEventListener(
    "click",
    sendMessage
);


chatInput.addEventListener(
    "keydown",
    event => {

        if (event.key === "Enter") {

            sendMessage();

        }

    }
);


/* =========================================================
   QUICK QUESTIONS
========================================================= */

document.querySelectorAll(
    ".quick-options button"
)
.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            chatInput.value =
                button.dataset.question;

            sendMessage();

        }
    );

});


/* =========================================================
   OPEN CHAT
========================================================= */

openChatButton.addEventListener(
    "click",
    () => {

        document.getElementById(
            "assistant"
        ).scrollIntoView({
            behavior:"smooth"
        });

        setTimeout(() => {

            chatInput.focus();

        },700);

    }
);


/* =========================================================
   TEXT TO SPEECH
========================================================= */

function speakText(text) {

    if (
        !("speechSynthesis" in window)
    ) return;

    window.speechSynthesis.cancel();

    const speech =
        new SpeechSynthesisUtterance(text);

    speech.rate = .95;

    speech.pitch = 1;

    speech.volume = .9;

    window.speechSynthesis.speak(
        speech
    );

}


/* =========================================================
   VOICE RECOGNITION
========================================================= */

const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

let recognition = null;

if (SpeechRecognition) {

    recognition =
        new SpeechRecognition();

    recognition.continuous = false;

    recognition.interimResults = false;

    recognition.lang = "en-IN";


    recognition.onstart = () => {

        voiceButton.classList.add(
            "listening"
        );

        voiceButton.textContent =
            "●";

    };


    recognition.onend = () => {

        voiceButton.classList.remove(
            "listening"
        );

        voiceButton.textContent =
            "🎙";

    };


    recognition.onresult = event => {

        const transcript =
            event.results[0][0].transcript;

        chatInput.value =
            transcript;

        sendMessage();

    };


    recognition.onerror = () => {

        voiceButton.classList.remove(
            "listening"
        );

        voiceButton.textContent =
            "🎙";

    };


    voiceButton.addEventListener(
        "click",
        () => {

            recognition.start();

        }
    );


    voiceOpenButton.addEventListener(
        "click",
        () => {

            document.getElementById(
                "assistant"
            ).scrollIntoView({
                behavior:"smooth"
            });

            setTimeout(() => {

                recognition.start();

            },700);

        }
    );

} else {

    voiceButton.addEventListener(
        "click",
        () => {

            alert(
                "Voice recognition is not supported in this browser. Try Google Chrome."
            );

        }
    );

}


/* =========================================================
   HTML ESCAPE
========================================================= */

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent =
        text;

    return div.innerHTML;

}


/* =========================================================
   STRIP HTML FOR VOICE
========================================================= */

function stripHTML(html) {

    const div =
        document.createElement("div");

    div.innerHTML =
        html;

    return div.textContent ||
           div.innerText ||
           "";

}


/* =========================================================
   CONSOLE
========================================================= */

console.log(
    "%cSANCHÉA",
    "font-family:serif;font-size:28px;color:#3b2a26;"
);

console.log(
    "Your Personal Beauty Intelligence ✨"
);