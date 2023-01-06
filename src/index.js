import './css/style.css';
import NoteQuery from './js/noteQuery';
import NoteListLogic from './js/noteListLogic';
import modalInputValidation from './js/modalInputValidation';

window.addEventListener('DOMContentLoaded', () => {
  NoteListLogic.renderNotesFromLocalStorage();

  const noteText = document.querySelector('.timeline__text');
  const timelineLine = document.querySelector('.timeline__line');
  const timelineForm = document.querySelector('.timeline__form');
  const modalWrapper = document.querySelector('.modal__wrapper');
  const modalForm = document.querySelector('.modal__form');
  const modalInput = document.querySelector('.modal__input');

  const nav = navigator.geolocation;

  let latitude = null;
  let longitude = null;
  let noteObj = null;

  timelineLine.scrollTop = timelineLine.scrollHeight;

  nav.getCurrentPosition((data) => {
    ({ latitude, longitude } = data.coords);
  }, (data) => {
    console.log(data.message);
  });

  timelineForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const inputText = noteText.value;

    if (!inputText) {
      alert('Поле текст, пустое!');
      return;
    }

    noteObj = new NoteQuery(latitude, longitude, modalWrapper, inputText);

    if (noteObj.coords !== '[null, null]') {
      NoteListLogic.writeNoteToLocalStorage(noteObj);
      noteText.value = '';
      timelineLine.scrollTop = timelineLine.scrollHeight;
    }
  });

  modalForm.addEventListener('submit', (e) => {
    e.preventDefault();

    modalInput.setCustomValidity('');

    if (!modalInput.validity.valueMissing && modalInput.checkValidity()) {
      noteObj.coords = `[${modalInput.value}]`;

      modalInput.value = '';
      modalWrapper.classList.toggle('hidden');

      NoteListLogic.writeNoteToLocalStorage(noteObj);
      timelineLine.scrollTop = timelineLine.scrollHeight;
      noteText.value = '';

      return;
    }

    modalInputValidation(modalInput);
  });

  modalForm.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal_denied-btn')) {
      modalInput.value = '';
      modalWrapper.classList.toggle('hidden');
    }
  });
});
