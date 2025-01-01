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
            text: addTxt.value
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
    notesObj.forEach((element, index) => {
        html += `
        <div class=" noteCard my-2 mx-2 card" style="width: 18.85rem;">
        <div class="card-body">
            <h5 class="card-title">${element.title}</h5>
            <p class="card-text">${element.text}</p>
            <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
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