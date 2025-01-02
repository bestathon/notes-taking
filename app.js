// console.log("Welcome to notes app. This is app.js");

// Adding users note to localstorage;
showNotes();
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener("click", (e) => {
    // console.log("This is addBtn.");
    // console.log(localStorage.getItem('notes'));
    let added = document.getElementById('success');
    let addTxt = document.getElementById('addTxt');
    let addTitle = document.getElementById('addTitle');
    let notes = localStorage.getItem('notes');
    let time = new Date();
    let month = time.getMonth();
    let year = time.getFullYear();
    let date = time.getDate();
    let randomNumber = Math.floor(Math.random() * 6);
    const monthNames = ["Jan", "Feb", "March", "April", "May", "June",
        "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
    let dates = `${monthNames[month]}, ${date} ${year}`;
    if (addTxt.value == "" && addTitle.value == "") {
        document.getElementById("warning").style.display = "block";
        setTimeout(() => {
            document.getElementById("warning").style.display = "none";
        }, 2000);
    }
    else {
        document.getElementById('danger').style.display = 'none';
        if (notes == null) {
            notesObj = [];
        }
        else {
            notesObj = JSON.parse(notes);
        }
        let myObj = {
            title: addTitle.value,
            text: addTxt.value,
            date: dates,
            num: randomNumber
        }
        notesObj.push(myObj);
        localStorage.setItem('notes', JSON.stringify(notesObj));
        added.style.display = `block`;
        setTimeout(() => {
            added.style.display = `none`;
        }, 2000);
        addTxt.value = "";
        addTitle.value = "";
        showNotes();
    }
});

// fuction to show notes
function showNotes() {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    let colorSelect = [["info", "0", "black"], ["dark", "1", "rgb(192, 192, 192);"], ["warning", "0", "gray"], ["secondary", "1", "white"], ["success", "1", "white"], ["primary", "1", "white"]]
    notesObj.forEach((element, index) => {
        html += `
        <div class="card noteCard text-bg-${colorSelect[element.num][0]} mb-3 fs-6" style="max-width: 15.5rem;">
        <div class="card-body" style="padding: 2rem 2rem 0rem 2rem; font-weight: bold;">
            <h5 class="card-title" style="padding-bottom: 3px;">${element.title}</h5>
            <p class="card-text text" style="font-size: 13px; font-weight: 300;">${element.text}</p>
        </div>
        <hr>
        <div class="text-center d-flex justify-content-between align-items-center px-2 pb-1" style="padding-top: 1px;">
            <div style="color: ${colorSelect[element.num][2]}">${element.date}</div>
            <button  id="${index}" onclick="deleteNote(this.id)" class="bg-${colorSelect[element.num][0]} border-0 p-2">
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="23" height="23" viewBox="0 0 50 50" style="filter: invert(${colorSelect[element.num][1]});">
                    <path
                        d="M 21 2 C 19.354545 2 18 3.3545455 18 5 L 18 7 L 10.154297 7 A 1.0001 1.0001 0 0 0 9.984375 6.9863281 A 1.0001 1.0001 0 0 0 9.8398438 7 L 8 7 A 1.0001 1.0001 0 1 0 8 9 L 9 9 L 9 45 C 9 46.645455 10.354545 48 12 48 L 38 48 C 39.645455 48 41 46.645455 41 45 L 41 9 L 42 9 A 1.0001 1.0001 0 1 0 42 7 L 40.167969 7 A 1.0001 1.0001 0 0 0 39.841797 7 L 32 7 L 32 5 C 32 3.3545455 30.645455 2 29 2 L 21 2 z M 21 4 L 29 4 C 29.554545 4 30 4.4454545 30 5 L 30 7 L 20 7 L 20 5 C 20 4.4454545 20.445455 4 21 4 z M 11 9 L 18.832031 9 A 1.0001 1.0001 0 0 0 19.158203 9 L 30.832031 9 A 1.0001 1.0001 0 0 0 31.158203 9 L 39 9 L 39 45 C 39 45.554545 38.554545 46 38 46 L 12 46 C 11.445455 46 11 45.554545 11 45 L 11 9 z M 18.984375 13.986328 A 1.0001 1.0001 0 0 0 18 15 L 18 40 A 1.0001 1.0001 0 1 0 20 40 L 20 15 A 1.0001 1.0001 0 0 0 18.984375 13.986328 z M 24.984375 13.986328 A 1.0001 1.0001 0 0 0 24 15 L 24 40 A 1.0001 1.0001 0 1 0 26 40 L 26 15 A 1.0001 1.0001 0 0 0 24.984375 13.986328 z M 30.984375 13.986328 A 1.0001 1.0001 0 0 0 30 15 L 30 40 A 1.0001 1.0001 0 1 0 32 40 L 32 15 A 1.0001 1.0001 0 0 0 30.984375 13.986328 z">
                    </path>
                </svg>
            </button>
        </div>
    </div>
        `;
    });

    let notesElm = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = `Nothing to show! Add a note to display here.`
    }
};

// function for deleting the notes
function deleteNote(index) {
    // console.log("Deleting this index", index);
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    showNotes();
    let danger = document.getElementById('danger');
    danger.style.display = `block`;
    document.getElementById('success').style.display = 'none';
    setTimeout(() => {
        danger.style.display = 'none';
    }, 2000);
}

// Making a search facility
let search = document.getElementById('searchTxt');
search.addEventListener('input', () => {
    let inputVal = search.value.toLowerCase();
    // console.log(inputVal);
    let noteCard = document.getElementsByClassName('noteCard');
    Array.from(noteCard).forEach((element) => {
        let cardTxt = element.getElementsByTagName('h5')[0].innerText;
        if (cardTxt.includes(inputVal)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    });
});

let searchSub = document.getElementById('searchSub');
searchSub.addEventListener('input', () => {
    let inputVal = searchSub.value.toLowerCase();
    // console.log(inputVal);
    let noteCard = document.getElementsByClassName('noteCard');
    Array.from(noteCard).forEach((element) => {
        let cardTxt = element.getElementsByTagName('h5')[0].innerText;
        if (cardTxt.includes(inputVal)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    });
});