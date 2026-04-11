var timeout;

const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true
});

/* ---------- First Page Animation ---------- */
function firstPageAnimation() {
    var tl = gsap.timeline();

    tl.from("#nav", {
        y: '-10',
        opacity: 0,
        duration: 1.5,
        ease: Expo.easeInOut
    })
    .to(".boundingelem", {
        y: 0,
        ease: Expo.easeInOut,
        duration: 2,
        delay: -1,
        stagger: .2
    })
    .from("#herofotter", {
        y: -10,
        opacity: 0,
        duration: 1.5,
        delay: -1,
        ease: Expo.easeInOut,
    });
}
firstPageAnimation();

/* ---------- Custom Cursor ---------- */
var timeout;

function circleChaptaKaro() {
    var xscale = 1;
    var yscale = 1;
    var xprev = 0;
    var yprev = 0;

    window.addEventListener("mousemove", function(dets) {
        clearTimeout(timeout);
        xscale = gsap.utils.clamp(.6, 1.2, dets.clientX - xprev);
        yscale = gsap.utils.clamp(.6, 1.2, dets.clientY - yprev);

        xprev = dets.clientX;
        yprev = dets.clientY;

        circleMouseFollower(xscale, yscale);

        timeout = setTimeout(function() {
            document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1,1)`;
        }, 100);
    });
}

function circleMouseFollower(xscale, yscale) {
    window.addEventListener("mousemove", function(dets) {
        document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`;
    });
}

circleMouseFollower();
circleChaptaKaro();

/* ---------- Elem Image Reveal ---------- */
document.querySelectorAll(".elem").forEach(function(elem) {
    var rotate = 0;
    var diffrot = 0;

    elem.addEventListener("mouseleave", function(dets) {
        gsap.to(elem.querySelector("img"), {
            opacity: 0,
            ease: Power3,
            duration: 0.5,
        });
    });

    elem.addEventListener("mousemove", function(dets) {
        var diff = dets.clientY - elem.getBoundingClientRect().top;
        diffrot = dets.clientX - rotate;
        rotate = dets.clientX;
        gsap.to(elem.querySelector("img"), {
            opacity: 1,
            ease: Power3,
            top: diff,
            left: dets.clientX,
            rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5),
        });
    });
});

/* ---------- ✨ Click Confetti Burst ---------- */
document.addEventListener("click", function(dets) {
    var colors = ["#ff4d4d", "#ffd700", "#1e90ff", "#ff69b4", "#32cd32", "#a18cd1", "#fd79a8", "#55efc4"];

    for (var i = 0; i < 8; i++) {
        var dot = document.createElement("div");
        var size = Math.random() * 7 + 4;
        dot.style.position = "fixed";
        dot.style.width = size + "px";
        dot.style.height = size + "px";
        dot.style.borderRadius = Math.random() > 0.5 ? "50%" : "2px";
        dot.style.background = colors[Math.floor(Math.random() * colors.length)];
        dot.style.left = dets.clientX + "px";
        dot.style.top = dets.clientY + "px";
        dot.style.pointerEvents = "none";
        dot.style.zIndex = "9999";
        document.body.appendChild(dot);

        gsap.to(dot, {
            x: (Math.random() - 0.5) * 180,
            y: (Math.random() - 0.5) * 180 - 60,
            rotation: Math.random() * 720 - 360,
            opacity: 0,
            scale: 0,
            duration: 0.7 + Math.random() * 0.4,
            ease: "power2.out",
            onComplete: function() {
                dot.remove();
            }
        });
    }
});

/* ---------- ✨ Button Magnetic Tilt ---------- */
document.querySelectorAll(".btn-primary, .btn-outline").forEach(function(btn) {
    btn.addEventListener("mousemove", function(e) {
        var rect = btn.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        var centerX = rect.width / 2;
        var centerY = rect.height / 2;
        var tiltX = (y - centerY) / centerY * -6;
        var tiltY = (x - centerX) / centerX * 6;

        gsap.to(btn, {
            rotateX: tiltX,
            rotateY: tiltY,
            duration: 0.3,
            ease: "power2.out",
            transformPerspective: 500
        });
    });

    btn.addEventListener("mouseleave", function() {
        gsap.to(btn, {
            rotateX: 0,
            rotateY: 0,
            duration: 0.5,
            ease: "elastic.out(1, 0.5)"
        });
    });
});

/* ---------- ✨ Sparkle Button Glow Follow ---------- */
document.querySelectorAll(".btn-sparkle").forEach(function(btn) {
    btn.addEventListener("mousemove", function(e) {
        var rect = btn.getBoundingClientRect();
        var x = ((e.clientX - rect.left) / rect.width) * 100;
        var y = ((e.clientY - rect.top) / rect.height) * 100;
        btn.style.setProperty("--glow-x", x + "%");
        btn.style.setProperty("--glow-y", y + "%");
    });
});

/* ---------- ✨ Sparkle Button Burst ---------- */
function burstSparkles(e) {
    var colors = ["#ff4d4d", "#ffd700", "#1e90ff", "#ff69b4", "#a18cd1", "#fff"];
    for (var i = 0; i < 20; i++) {
        var p = document.createElement("div");
        p.className = "sparkle-particle";
        var size = Math.random() * 6 + 3;
        var angle = (Math.PI * 2 / 20) * i + (Math.random() - 0.5) * 0.5;
        var dist = Math.random() * 80 + 40;
        var tx = Math.cos(angle) * dist;
        var ty = Math.sin(angle) * dist;
        p.style.width = size + "px";
        p.style.height = size + "px";
        p.style.background = colors[Math.floor(Math.random() * colors.length)];
        p.style.left = e.clientX + "px";
        p.style.top = e.clientY + "px";
        p.style.setProperty("--tx", tx + "px");
        p.style.setProperty("--ty", ty + "px");
        p.style.boxShadow = "0 0 6px " + colors[Math.floor(Math.random() * colors.length)];
        document.body.appendChild(p);
        setTimeout(function() { p.remove(); }, 800);
    }
}

/* ---------- ✨ Elem Word Stagger on Hover ---------- */
document.querySelectorAll(".elem").forEach(function(elem) {
    elem.addEventListener("mouseenter", function() {
        gsap.fromTo(elem.querySelectorAll(".word"), 
            { y: 10, opacity: 0.5 },
            { y: 0, opacity: 1, duration: 0.4, stagger: 0.05, ease: "power2.out" }
        );
    });
});

/* ---------- ✨ Scroll Reveal Animations ---------- */
function addScrollReveal() {
    // About section
    gsap.fromTo("#about #imgtag",
        { opacity: 0, scale: 0.85, y: 30 },
        {
            opacity: 1, scale: 1, y: 0, duration: 1.2, ease: "power3.out",
            scrollTrigger: { trigger: "#about", start: "top 75%" }
        }
    );

    gsap.fromTo("#textabout",
        { opacity: 0, x: 50 },
        {
            opacity: 1, x: 0, duration: 1, ease: "power3.out", delay: 0.2,
            scrollTrigger: { trigger: "#about", start: "top 75%" }
        }
    );

    // Subscribe
    gsap.fromTo("#subscribe",
        { opacity: 0, y: 40 },
        {
            opacity: 1, y: 0, duration: 1, ease: "power3.out",
            scrollTrigger: { trigger: "#subscribe", start: "top 80%" }
        }
    );

    // Footer
    gsap.fromTo("#footer",
        { opacity: 0, y: 30 },
        {
            opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
            scrollTrigger: { trigger: "#footer", start: "top 90%" }
        }
    );

    // Each elem card
    document.querySelectorAll(".elem").forEach(function(el, i) {
        gsap.fromTo(el,
            { opacity: 0, x: -60 },
            {
                opacity: 1, x: 0, duration: 1, ease: "power3.out", delay: i * 0.08,
                scrollTrigger: { trigger: el, start: "top 85%" }
            }
        );
    });
}

// Wait a beat then init scroll reveals
setTimeout(addScrollReveal, 100);

/* ---------- ✨ Cursor changes on buttons ---------- */
document.querySelectorAll(".btn-primary, .btn-outline, .btn-sparkle, .btn-footer, .circle").forEach(function(el) {
    el.addEventListener("mouseenter", function() {
        var mc = document.querySelector("#minicircle");
        mc.style.width = "40px";
        mc.style.height = "40px";
        mc.style.backgroundColor = "rgba(255,255,255,0.1)";
        mc.style.border = "1px solid rgba(255,255,255,0.3)";
        mc.style.mixBlendMode = "normal";
    });
    el.addEventListener("mouseleave", function() {
        var mc = document.querySelector("#minicircle");
        mc.style.width = "15px";
        mc.style.height = "15px";
        mc.style.backgroundColor = "#fff";
        mc.style.border = "none";
        mc.style.mixBlendMode = "normal";
    });
});