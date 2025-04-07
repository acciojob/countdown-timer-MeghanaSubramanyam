// Your script here.
const input = document.getElementById("userInput");
const startButton = document.querySelector("button");
const countDownDisplay = document.getElementById("countDown");
const endTimeDisplay = document.getElementById("endTime");

let timerInterval; // to store setInterval reference

function startTimer(minutes) {
    // Clear any existing timer
    clearInterval(timerInterval);

    const now = Date.now();
    const endTime = now + minutes * 60 * 1000;

    // Display end time
    const endDate = new Date(endTime);
    const endHour = endDate.getHours().toString().padStart(2, "0");
    const endMin = endDate.getMinutes().toString().padStart(2, "0");
    endTimeDisplay.textContent = `Be Back At: ${endHour}:${endMin}`;

    function updateCountdown() {
        const secondsLeft = Math.round((endTime - Date.now()) / 1000);

        if (secondsLeft < 0) {
            clearInterval(timerInterval);
            countDownDisplay.textContent = "Time's up!";
            return;
        }

        const mins = Math.floor(secondsLeft / 60);
        const secs = secondsLeft % 60;
        countDownDisplay.textContent = `Time Left: ${mins}:${secs.toString().padStart(2, '0')}`;
    }

    // Initial display and then every second
    updateCountdown();
    timerInterval = setInterval(updateCountdown, 1000);
}

// Handle button click
startButton.addEventListener("click", () => {
    const minutes = parseInt(input.value);
    if (!isNaN(minutes) && minutes > 0) {
        startTimer(minutes);
    }
});

// Handle Enter key press in the input
input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        const minutes = parseInt(input.value);
        if (!isNaN(minutes) && minutes > 0) {
            startTimer(minutes);
        }
    }
});
