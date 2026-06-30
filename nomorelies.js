/* ========================================= */
/* SMOOTH SCROLLING */
/* ========================================= */

document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth'
        });
    });
});


/* ========================================= */
/* TYPEWRITER EFFECT (HERO SECTION) */
/* ========================================= */

const heroTitle = document.querySelector(".hero h1");
const originalText = heroTitle.textContent;
heroTitle.textContent = "";

let i = 0;

function typeWriter() {
    if (i < originalText.length) {
        heroTitle.textContent += originalText.charAt(i);
        i++;
        setTimeout(typeWriter, 70);
    }
}

window.addEventListener("load", typeWriter);


/* ========================================= */
/* SCROLL REVEAL ANIMATION */
/* ========================================= */

const revealElements = document.querySelectorAll("section, .step, .tool-item, .answer-box");

const revealOnScroll = () => {
    const triggerBottom = window.innerHeight * 0.85;

    revealElements.forEach(el => {
        const boxTop = el.getBoundingClientRect().top;

        if (boxTop < triggerBottom) {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
        }
    });
};

revealElements.forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(40px)";
    el.style.transition = "all 0.6s ease";
});

window.addEventListener("scroll", revealOnScroll);


/* ========================================= */
/* ACTIVE NAV LINK ON SCROLL */
/* ========================================= */

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        if (pageYOffset >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.style.color = "#c9d1d9";
        if (link.getAttribute("href") === "#" + current) {
            link.style.color = "#3fb950";
        }
    });
});


/* ========================================= */
/* COPY TO CLIPBOARD FOR COMMAND BLOCKS */
/* ========================================= */

document.querySelectorAll("pre").forEach(block => {
    const button = document.createElement("button");
    button.textContent = "Copy";
    button.style.position = "absolute";
    button.style.right = "10px";
    button.style.top = "10px";
    button.style.padding = "5px 10px";
    button.style.fontSize = "12px";
    button.style.cursor = "pointer";
    button.style.border = "none";
    button.style.borderRadius = "5px";
    button.style.backgroundColor = "#3fb950";
    button.style.color = "#0f1117";

    const wrapper = document.createElement("div");
    wrapper.style.position = "relative";

    block.parentNode.insertBefore(wrapper, block);
    wrapper.appendChild(block);
    wrapper.appendChild(button);

    button.addEventListener("click", () => {
        navigator.clipboard.writeText(block.textContent);
        button.textContent = "Copied!";
        setTimeout(() => button.textContent = "Copy", 1500);
    });
});

/* ========================================= */
/* GENERATE LIVE PDF */
/* ========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const downloadBtn = document.getElementById("downloadPDF");

    if (downloadBtn) {
        downloadBtn.addEventListener("click", function () {

            const element = document.getElementById("pdf-content");

            // Enable clean PDF mode
            document.body.classList.add("pdf-mode");

            const opt = {
                margin: 0.5,
                filename: 'No_More_Lies_Writeup.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { 
                    scale: 2,
                    useCORS: true,
                    scrollY: 0
                },
                jsPDF: { 
                    unit: 'in', 
                    format: 'a4', 
                    orientation: 'portrait' 
                },
                pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
            };

            html2pdf()
                .set(opt)
                .from(element)
                .save()
                .then(() => {
                    // Remove PDF mode after generation
                    document.body.classList.remove("pdf-mode");
                });
        });
    }

});
