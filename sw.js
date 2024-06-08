let [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
let timeRef = document.querySelector(".timer-display");
let recordedTimesList = document.getElementById("recorded-times");
let recordedContainer = document.getElementById("recorded-container");
let int = null;
let recordCount = 1; // Variabel untuk menghitung jumlah catatan waktu

document.getElementById("start-pause-timer").addEventListener("click", () => {
    if (int === null) {
        startTimer();
    } else {
        pauseTimer();
    }
});

document.getElementById("reset-timer").addEventListener("click", () => {
    if (int === null) {
        clearInterval(int);
        [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
        timeRef.innerHTML = "00 : 00 : 00 : 000 ";
        recordedTimesList.innerHTML = ""; // Mengosongkan daftar waktu yang dicatat
        document.getElementById("start-pause-timer").textContent = "Start"; // Mengembalikan teks tombol menjadi Start
        document.getElementById("reset-timer").disabled = true; // Menonaktifkan tombol reset saat stopwatch berjalan
        document.getElementById("reset-timer").classList.remove("active-reset");
        document.getElementById("reset-timer").classList.add("inactive-reset");
        recordedContainer.style.display = "none"; // Menyembunyikan kotak catatan waktu
        recordCount = 1; // Mengatur ulang jumlah catatan waktu
    }
});

document.getElementById("record-time").addEventListener("click", () => {
    recordTime();
});

function startTimer() {
    int = setInterval(displayTimer, 10);
    document.getElementById("start-pause-timer").textContent = "Pause"; // Mengubah teks tombol menjadi Pause
    document.getElementById("reset-timer").disabled = true; // Menonaktifkan tombol reset saat stopwatch berjalan
    document.getElementById("reset-timer").classList.remove("active-reset");
    document.getElementById("reset-timer").classList.add("inactive-reset");
}

function pauseTimer() {
    clearInterval(int);
    int = null;
    document.getElementById("start-pause-timer").textContent = "Start"; // Mengubah teks tombol menjadi Start
    document.getElementById("reset-timer").disabled = false; // Mengaktifkan tombol reset saat stopwatch berhenti
    document.getElementById("reset-timer").classList.remove("inactive-reset");
    document.getElementById("reset-timer").classList.add("active-reset");
}

function displayTimer() {
    milliseconds += 10;
    if (milliseconds == 1000) {
        milliseconds = 0;
        seconds++;
        if (seconds == 60) {
            seconds = 0;
            minutes++;
            if (minutes == 60) {
                minutes = 0;
                hours++;
            }
        }
    }

    let h = hours < 10 ? "0" + hours : hours;
    let m = minutes < 10 ? "0" + minutes : minutes;
    let s = seconds < 10 ? "0" + seconds : seconds;
    let ms = milliseconds < 10 ? "00" + milliseconds : milliseconds < 100 ? "0" + milliseconds : milliseconds;

    timeRef.innerHTML = `${h} : ${m} : ${s} : ${ms}`;
}

function recordTime() {
    let recordedTime = `${recordCount}. ${hours < 10 ? "0" + hours : hours} : ${minutes < 10 ? "0" + minutes : minutes} : ${seconds < 10 ? "0" + seconds : seconds} : ${milliseconds < 10 ? "00" + milliseconds : milliseconds < 100 ? "0" + milliseconds : milliseconds}`;
    let li = document.createElement("li");
    li.innerText = recordedTime;
    recordedTimesList.appendChild(li);
    recordedContainer.style.display = "block"; // Menampilkan kotak catatan waktu setelah ada catatan yang dicatat
    recordCount++; // Menambah jumlah catatan waktu
}