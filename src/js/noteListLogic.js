export default class NoteListLogic {
  static getNotesFromLocalStorage() {
    if (!localStorage.notes) {
      localStorage.notes = '[]';
    }

    return JSON.parse(localStorage.notes);
  }

  static writeNoteToLocalStorage(noteObj) {
    const currentNotesList = NoteListLogic.getNotesFromLocalStorage();

    currentNotesList.push(noteObj);

    localStorage.notes = JSON.stringify(currentNotesList);

    NoteListLogic.renderNoteHTML(noteObj);
  }

  static renderNotesFromLocalStorage() {
    NoteListLogic.getNotesFromLocalStorage().forEach((noteObj) => {
      NoteListLogic.renderNoteHTML(noteObj);
    });
  }

  static removeFromLocalStorage(targetEl) {
    const noteIdToRemove = targetEl.dataset.noteId;
    const currentNoteArray = NoteListLogic.getNotesFromLocalStorage();
    const newNoteArray = currentNoteArray.filter((note) => note.id !== +noteIdToRemove);

    localStorage.notes = JSON.stringify(newNoteArray);
  }

  static generateNoteId() {
    const noteIdArray = [];

    NoteListLogic.getNotesFromLocalStorage().forEach((noteObj) => {
      if (noteObj) {
        noteIdArray.push(noteObj.id);
      }
    });

    let i = 1;
    while (noteIdArray.includes(i)) {
      i++;
    }

    return i;
  }

  static renderNoteHTML(noteObj) {
    const timeline = document.querySelector('.timeline__line');

    const noteContainer = document.createElement('div');
    const noteDate = document.createElement('span');
    const noteText = document.createElement('p');
    const noteCoords = document.createElement('span');
    const noteClose = document.createElement('a');

    noteContainer.className = 'note-container';
    noteContainer.dataset.noteId = noteObj.id;

    noteDate.className = 'note-date';
    noteDate.textContent = noteObj.date;

    noteText.className = 'note-text';
    noteText.textContent = noteObj.inputText;

    noteCoords.className = 'note-coords';
    noteCoords.textContent = noteObj.coords;

    noteClose.className = 'note-close';
    noteClose.innerHTML = '&#9587;';

    noteContainer.addEventListener('click', (e) => {
      if (e.target.className === 'note-close') {
        NoteListLogic.removeFromLocalStorage(e.currentTarget);
        e.currentTarget.remove();
      }
    });

    noteContainer.appendChild(noteClose);
    noteContainer.appendChild(noteDate);
    noteContainer.appendChild(noteText);
    noteContainer.appendChild(noteCoords);

    timeline.appendChild(noteContainer);
  }
}
