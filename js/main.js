window.addEventListener("DOMContentLoaded", () => {
    const logo = document.getElementById("logo-angelos");
    const overlay = document.getElementById("intro-bg-overlay");

    // ========== حركة Intro ==========
    if (logo && overlay) {
        const finalRect = logo.getBoundingClientRect();
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const diffX = centerX - (finalRect.left + finalRect.width / 2);
        const diffY = centerY - (finalRect.top + finalRect.height / 2);

        logo.style.visibility = "visible";
        logo.classList.add("logo-animating");
        logo.style.transform = `translate(${diffX}px, ${diffY}px) scale(4.5)`;
        logo.style.opacity = "0";

        document.body.classList.add("intro-active");
        overlay.style.opacity = "1";

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                logo.style.opacity = "1";
                setTimeout(() => {
                    logo.style.transform = `translate(0, 0) scale(1)`;
                    overlay.style.opacity = "0";
                    document.body.classList.remove("intro-active");
                    setTimeout(() => {
                        logo.classList.remove("logo-animating");
                        logo.removeAttribute("style");
                        overlay.remove();
                    }, 1200);
                }, 600);
            });
        });
    }

    // ========== قائمة البرجر ==========
    const toggler = document.getElementById("navbarToggler");
    const mobileMenu = document.getElementById("mobileMenu");
    if (toggler && mobileMenu) {
        toggler.addEventListener("click", () => {
            mobileMenu.classList.toggle("show");
            const icon = toggler.querySelector("i");
            icon.classList.toggle("bi-list");
            icon.classList.toggle("bi-x-lg");
        });
        mobileMenu.querySelectorAll(".nav-link").forEach(link => {
            link.addEventListener("click", () => {
                mobileMenu.classList.remove("show");
                const icon = toggler.querySelector("i");
                icon.classList.add("bi-list");
                icon.classList.remove("bi-x-lg");
            });
        });
    }

    // ========== نموذج الاتصال ==========
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const submitBtn = document.getElementById("submitBtn");
            const formStatus = document.getElementById("formStatus");
            const originalText = submitBtn.innerHTML;

            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Sending...';
            formStatus.innerHTML = '';

            try {
                const response = await fetch(contactForm.action, {
                    method: "POST",
                    body: new FormData(contactForm),
                    headers: { Accept: "application/json" },
                });

                if (response.ok) {
                    formStatus.innerHTML = '<div class="alert alert-success mt-3">✅ Message sent! I will reply soon.</div>';
                    contactForm.reset();
                } else {
                    throw new Error("Formspree error");
                }
            } catch (error) {
                formStatus.innerHTML = '<div class="alert alert-danger mt-3">❌ Failed to send. Please email me directly.</div>';
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }
        });
    }
});