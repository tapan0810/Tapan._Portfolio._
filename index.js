// ==========================================
// CLICK SOUND EFFECT
// ==========================================
const clickSound = new Audio('assets/sounds/click.mp3');
clickSound.volume = 0.4;

document.addEventListener('click', function (e) {
    const isClickable = e.target.closest(
        'button, a, .btn, .tab-links, .service-card, .work'
    );

    if (isClickable) {
        clickSound.currentTime = 0;
        clickSound.play().catch(() => {});
    }
});


// ==========================================
// MICROMODAL INIT (ADDED)
// ==========================================
MicroModal.init({
    openTrigger: 'data-micromodal-trigger',
    closeTrigger: 'data-micromodal-close',
    disableScroll: true,
    awaitOpenAnimation: true,
    awaitCloseAnimation: true
});

// ==========================================
// TAB FUNCTIONALITY
// ==========================================
var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");

function opentab(tabname) {
    clickSound.currentTime = 0;
    clickSound.play().catch(() => {});

    for (let tablink of tablinks) {
        tablink.classList.remove("active-link");
    }
    for (let tabcontent of tabcontents) {
        tabcontent.classList.remove("active-tab");
    }

    event.currentTarget.classList.add("active-link");
    document.getElementById(tabname).classList.add("active-tab");
}

// ==========================================
// MOBILE MENU
// ==========================================
const sidemenu = document.getElementById("sidemenu");

function openmenu() {
    clickSound.currentTime = 0;
    clickSound.play().catch(() => {});
    sidemenu.classList.add("open");
}

function closemenu() {
    clickSound.currentTime = 0;
    clickSound.play().catch(() => {});
    sidemenu.classList.remove("open");
}

// ==========================================
// STICKY NAVIGATION
// ==========================================
window.addEventListener('scroll', function () {
    var navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('nav-scrolled');
    } else {
        navbar.classList.remove('nav-scrolled');
    }
});

// ==========================================
// TYPING ANIMATION
// ==========================================
var typedTextSpan = document.querySelector(".typed-text");
var textArray = ["Dotnet Developer", "Designer", "Web Developer", "Software Tester", "Tutor"];
var typingDelay = 100;
var erasingDelay = 50;
var newTextDelay = 2000;
var textArrayIndex = 0;
var charIndex = 0;

function type() {
    if (charIndex < textArray[textArrayIndex].length) {
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    } else {
        setTimeout(erase, newTextDelay);
    }
}

function erase() {
    if (charIndex > 0) {
        typedTextSpan.textContent =
            textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    } else {
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, typingDelay + 1100);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    if (textArray.length) setTimeout(type, newTextDelay + 250);
});

// ==========================================
// SCROLL REVEAL ANIMATION
// ==========================================
var observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', function () {
    var revealElements = document.querySelectorAll(
        '.reveal-up, .reveal-left, .reveal-right'
    );
    revealElements.forEach(function (el) {
        observer.observe(el);
    });
});

// ==========================================
// EMAIL FUNCTIONALITY (WITHOUT SWEETALERT)
// ==========================================
function sendEmail(e) {
    e.preventDefault();

    var parms = {
        name: document.getElementById("contact-name").value,
        email: document.getElementById("contact-email").value,
        message: document.getElementById("contact-msg").value,
    };

    var contactMessage = document.getElementById("contact-message");

    if (!parms.name || !parms.email || !parms.message) {
        contactMessage.classList.remove('color-blue');
        contactMessage.classList.add('color-red');
        contactMessage.textContent = 'Please fill up all the fields...😊';

        setTimeout(() => {
            contactMessage.textContent = '';
        }, 3000);
        return;
    }

    contactMessage.textContent = 'Sending message...';

    emailjs.send("service_ua8c7q6", "template_tt4r6uh", parms)
        .then(function () {
            contactMessage.classList.remove('color-red');
            contactMessage.classList.add('color-blue');
            contactMessage.textContent = '✉️ sent...😊';

            document.getElementById("contact-form").reset();

            setTimeout(() => {
                contactMessage.textContent = '';
            }, 5000);
        })
        .catch(function () {
            contactMessage.classList.remove('color-blue');
            contactMessage.classList.add('color-red');
            contactMessage.textContent =
                'Error sending message. Please try again.';

            setTimeout(() => {
                contactMessage.textContent = '';
            }, 5000);
        });
}

var contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', sendEmail);
}

console.log('Portfolio loaded successfully!');


// ==========================================
const form = document.getElementById("contact-form");
const btn = document.getElementById("submit-btn");

form.addEventListener("submit", e => {
  e.preventDefault();
  btn.classList.add("loading");
  btn.disabled = true;

  emailjs.send("service_ua8c7q6","template_tt4r6uh",{
    name: document.getElementById("contact-name").value,
    email: document.getElementById("contact-email").value,
    message: document.getElementById("contact-msg").value
  }).then(() => {
    showToast("Message sent successfully ✅", true);
    form.reset();
  }).catch(() => {
    showToast("Something went wrong ❌", false);
  }).finally(() => {
    btn.classList.remove("loading");
    btn.disabled = false;
  });
});
// ==========================================

function showToast(message, success) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.className = success ? "show success" : "show error";

  setTimeout(() => {
    toast.className = "";
  }, 3000);
}
// ==========================================