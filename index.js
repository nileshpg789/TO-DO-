let addBtn = document.getElementById("add-btn");
let addTitle = document.getElementById("note-title");
let addTxt = document.getElementById("note-text");
let date = document.getElementById("note-date");

let notes = JSON.parse(localStorage.getItem("notes"));

var edit_id = null;
var edit_index = null;

addBtn.addEventListener("click", (a) => {
  if (addTitle.value == "" || addTxt.value == "" || date.value == "") {
    return alert("please add note title and details");
  }
  notes = localStorage.getItem("notes");
  if (notes == null) {
    notes = [];
  } else {
    notes = JSON.parse(notes);
  }

  let _id = edit_id || Date.now();
  let myObj = {
    id: _id,
    title: addTitle.value,
    text: addTxt.value,
    date: date.value,
  };

  if (edit_id) {
    notes[edit_index] = myObj;
    edit_id = null;
    edit_index = null;
  }

  notes.push(myObj);
  localStorage.setItem("notes", JSON.stringify(notes));
  addTitle.value = "";
  addTxt.value = "";
  date.value = "";
  showNotes();
});

function showNotes() {
  notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let dis = "";
  notesObj.forEach(function (element, index) {
    // console.log(element);
    dis += `
            <div id="note">
            <p class="note-counter">Note ${index + 1}</p>
            <h3 class="note-title"> ${element.title}</h3>
            <p class="note-text">${element.text}</p>
            <p class="date">${element.date}</p>
            <button id="${element.id}"onclick ="deleteNote(this.id)"
             class="note-btn">Delete Note</button>
            <button id ="${element.id}"onclick="editNote(this.id)"
            class="note-btn edit-btn">Edit Note</button>
          </div>
          `;
  });
  let noteElm = document.getElementById("notes");
  if (notesObj.length != 0) {
    noteElm.innerHTML = dis;
  } else {
    noteElm.innerHTML = `No Notes Yet! Add a note using the form above.`;
  }
}

// showNotes();
function deleteNote(id) {
  console.log("id", id);

  notes = JSON.parse(localStorage.getItem("notes"));

  notes = notes.filter((note) => note.id != id);

  let confirmDel = confirm("Delete this note?");
  if (confirmDel == true) {
    let notes = localStorage.getItem("notes");
  }

  localStorage.setItem("notes", JSON.stringify(notes));
  showNotes();
}

function editNote(id) {
  console.log(id);
  notes = JSON.parse(localStorage.getItem("notes"));

  let index = notes.findIndex((note) => {
    return note.id == id;
  });
  console.log(index);

  addTitle.value = notes[index].title;
  addTxt.value = notes[index].text;
  date.value = notes[index].date;

  edit_id = id;
  edit_index = index;
}

showNotes();
