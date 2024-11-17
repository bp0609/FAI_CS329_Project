export function celebrateVictory(): void {
    // Display a message
    const victoryMessage: HTMLDivElement = document.createElement("div");
    victoryMessage.id = "victoryMessage";
    victoryMessage.style.position = "fixed";
    victoryMessage.style.top = "50%";
    victoryMessage.style.left = "50%";
    victoryMessage.style.transform = "translate(-50%, -50%)";
    victoryMessage.style.background = "rgba(0, 0, 0, 0.8)";
    victoryMessage.style.color = "#fff";
    victoryMessage.style.padding = "20px";
    victoryMessage.style.borderRadius = "10px";
    victoryMessage.style.textAlign = "center";
    victoryMessage.style.zIndex = "1000";
    victoryMessage.innerHTML = `
        <h1>🎉 Congratulations! 🎉</h1>
        <p>You solved the Jigsaw Sudoku board!</p>
        <button class="btn btn-success" id="restartButton">Close</button>
    `;
    document.body.appendChild(victoryMessage);

    // Add fireworks or confetti effect
    displayConfetti();

    // Add restart functionality
    const restartButton = document.getElementById("restartButton") as HTMLButtonElement;
    if (restartButton) {
        restartButton.addEventListener("click", () => {
            document.body.removeChild(victoryMessage);
        });
    }
}

function displayConfetti(): void {
    const confettiScript: HTMLScriptElement = document.createElement("script");
    confettiScript.src = "https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js";
    document.body.appendChild(confettiScript);

    confettiScript.onload = () => {
        const duration: number = 2 * 1000; // 2 seconds
        const end: number = Date.now() + duration;

        const frame = (): void => {
            // Type declaration for confetti function
            const confetti = (window as any).confetti;
            confetti({
                particleCount: 3,
                angle: 60,
                spread: 55,
                origin: { x: 0 }
            });
            confetti({
                particleCount: 3,
                angle: 120,
                spread: 55,
                origin: { x: 1 }
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        };

        frame();
    };
}
