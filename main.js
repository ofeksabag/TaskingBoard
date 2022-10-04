const loading = setInterval(function() {
    const homeDiv = document.getElementById('home');
    homeDiv.style.display = "block";
    clearInterval(loading);
}, 8000);

function showInternet() {
    const internetBlackBG = document.getElementById('internetBlackBG');
    const homeDiv = document.getElementById('home');

    homeDiv.style.display = "none";
    internetBlackBG.style.display = "block";
}

function hideInternet() {
    const internetBlackBG = document.getElementById('internetBlackBG');
    const homeDiv = document.getElementById('home');

    internetBlackBG.style.display = "none";
    homeDiv.style.display = "block";
}

const noteDate = document.getElementById('noteDate');

const d = new Date();
let year = d.getFullYear();
let month = d.getMonth()+1;
let dt = d.getDate();

if (dt < 10) {
  dt = '0' + dt;
}
if (month < 10) {
  month = '0' + month;
}

noteDate.min = `${year}-${month}-${dt}`;
noteDate.value = `${year}-${month}-${dt}`;

let notepadsArray = [];

let count = 0;

loadFromStorage();

function loadFromStorage() {
    const jsonString = localStorage.getItem('notepads');

    if(jsonString) {
        notepadsArray = JSON.parse(jsonString);
    }

    printNotes();
}

function addTask() {
    event.preventDefault();

    const noteName = document.getElementById('noteName');
    const noteText = document.getElementById('noteText');
    const noteDate = document.getElementById('noteDate');
    const noteTime = document.getElementById('noteTime');
    const status = document.getElementById('formStatus');

    const note = {
        name: noteName.value,
        text: noteText.value,
        date: noteDate.value,
        time: noteTime.value
    };
    notepadsArray.push(note);

    printNotes();

    noteName.value = "";
    noteText.value = "";
    noteDate.value = "";
    noteTime.value = "";

    noteName.focus();

    count++;
    status.innerText = `[#${count}] Your notepad has added successfully!`;

    const jsonString = JSON.stringify(notepadsArray);
    localStorage.setItem('notepads', jsonString);
}

function isToday(date) {
    const today = new Date();
    return today.getDate() === date.getDate() &&
            today.getMonth() === date.getMonth() &&
                today.getFullYear() === date.getFullYear();
}

function printNotes() {
    const printApps = document.getElementById('printApps');

    printApps.innerText = "";
    for(let i=0; i<notepadsArray.length; i++) {
        if(isToday(new Date(notepadsArray[i].date)) && 
            notepadsArray[i].time < d.toTimeString()) {
                deleteNotepad(i);
        }
        else {
            printApps.innerHTML += `
            <div id="app" ondblclick="showNotepad(${i})" onmouseover="showDelete(${i})" onmouseout="hideDelete(${i})">
                <button class="deleteBtn" id="deleteBtn${i}" onclick="deleteNotepad(${i})"><i class="bi bi-x-lg"></i></button>
                <div id="notepadIcon"></div>
                <span>${notepadsArray[i].name}.txt</span>
            </div>
        `;
        }
    }
}

function showNotepad(id) {
    const notepadBlackBG = document.getElementById('notepadBlackBG');
    const homeDiv = document.getElementById('home');
    const notepadText = document.getElementById('notepadText');

    homeDiv.style.display = "none";
    notepadBlackBG.style.display = "block";

    for(let i=0; i<notepadsArray.length; i++) {
        if(i === id) {
            notepadText.innerHTML = `
                <div id="notepadTitle">${notepadsArray[i].name}.txt - Notepad</div>
                ${notepadsArray[i].text}
                <br><br>
                ${notepadsArray[i].date}
                ${notepadsArray[i].time}
            `;
        }
    }
}

function hideNotepad() {
    const notepadBlackBG = document.getElementById('notepadBlackBG');
    const homeDiv = document.getElementById('home');
    
    notepadBlackBG.style.display = "none";
    homeDiv.style.display = "block";
}

function showDelete(id) {
    const deleteBtn = document.getElementById('deleteBtn' + id);
    deleteBtn.style.display = "block";
}

function hideDelete(id) {
    const deleteBtn = document.getElementById('deleteBtn' + id);
    deleteBtn.style.display = "none";
}

function deleteNotepad(id) {
    window.localStorage.clear();

    notepadsArray.splice(id, 1);

    const jsonString = JSON.stringify(notepadsArray);
    localStorage.setItem('notepads', jsonString);

    printNotes();
}