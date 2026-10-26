// ==UserScript==
// @name         rainbow emoji pet
// @namespace    http://tampermonkey.net
// @version      1.1
// @description  A smooth-tracking, rainbow aurora emoji companion that follows you everywhere!
// @author       chr0tem / chrotem
// @match        *://*/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    document.querySelectorAll('.neko, #oneko, .glitch-trail').forEach(c => c.remove());
    const CHAOS_FORMS = [
        "😭", "😂", "🥲", "😏", "😋", "😛", "😩", "😍", "😒", "☺️", "😊", "😘", "😔", "😁", "😳", "😉", "😌",
        "🫩", "🫩", "🫩", "🫩", "🫩"
    ];

    let speed = 16;   
    let scale = 1.4;  

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let mx = x, my = y, tick = 0, moved = false;

  
    let style = document.createElement("style");
    style.innerHTML = `
        @keyframes auroraWave {
            0% { filter: hue-rotate(0deg) drop-shadow(0 0 4px #ff0055); }
            50% { filter: hue-rotate(180deg) drop-shadow(0 0 8px #00ffff); }
            100% { filter: hue-rotate(360deg) drop-shadow(0 0 4px #ff0055); }
        }
        .aurora-pet-active {
            animation: auroraWave 4s ease-in-out infinite alternate !important;
            display: inline-block;
        }
    `;
    document.head.appendChild(style);


    let el = document.createElement("div");
    el.id = "oneko";
    el.className = "aurora-pet-active";
    el.style.cssText = `
        position: fixed; width: 50px; height: 50px;
        z-index: 2147483647; pointer-events: none;
        font-size: 38px; line-height: 50px; text-align: center;
        transform: scale(${scale}); transform-origin: center;
        left: ${x}px; top: ${y}px;
        transition: transform 0.15s ease-out;
    `;
    el.innerText = "🫩";
    document.body.appendChild(el);

    document.addEventListener("mousemove", e => { mx = e.clientX; my = e.clientY; moved = true; });

  
    function step() {
        if (moved) {
            tick++;

            let dx = mx - x - 25;
            let dy = my - y - 25;
            let dist = Math.sqrt(dx * dx + dy * dy);

            if (dist > 10) {
               
                x += (dx / dist) * speed;
                y += (dy / dist) * speed;

               
                let mainIndex = Math.floor(tick / 15) % CHAOS_FORMS.length;
                el.innerText = CHAOS_FORMS[mainIndex];

                
                if (dx < -2) {
                    el.style.transform = `scale(${scale}) scaleX(-1)`;
                } else if (dx > 2) {
                    el.style.transform = `scale(${scale}) scaleX(1)`;
                }

                
                let trail = document.createElement("div");
                trail.className = "glitch-trail aurora-pet-active";

                
                let trailIndex = tick % CHAOS_FORMS.length;
                trail.innerText = CHAOS_FORMS[trailIndex];

                trail.style.cssText = `
                    position: fixed; left: ${Math.round(x)}px; top: ${Math.round(y)}px;
                    font-size: 32px; z-index: 2147483646; pointer-events: none;
                    transform: scale(${scale}); opacity: 0.8;
                    transition: transform 0.15s linear, opacity 0.15s linear;
                `;
                document.body.appendChild(trail);

                
                setTimeout(() => {
                    trail.style.transform = `scale(0.2) translateY(45px)`; 
                    trail.style.opacity = "0";
                    setTimeout(() => trail.remove(), 150);
                }, 15);

            } else {
                
                el.innerText = "🫩";
                el.style.transform = `scale(${scale + Math.sin(tick * 0.05) * 0.03}) scaleX(${mx - x - 25 < 0 ? -1 : 1})`;
            }

            el.style.left = Math.round(x) + "px";
            el.style.top = Math.round(y) + "px";
        }
        window.requestAnimationFrame(step);
    }

    
    window.requestAnimationFrame(step);
})();
