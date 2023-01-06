import NoteListLogic from './noteListLogic';

export default class NoteQuery {
  constructor(latitude, longitude, modalWrapper, inputText) {
    this.latitude = latitude;
    this.longitude = longitude;
    this.modalWrapper = modalWrapper;
    this.inputText = inputText;
    this.date = new Date();
    this.checkCoords();
    this.refuctoringNoteObj();
  }

  checkCoords() {
    this.parseDate();

    if (!this.latitude && !this.longitude) {
      this.modalWrapper.classList.toggle('hidden');
    }
  }

  parseDate() {
    const year = this.date.getFullYear();
    let month = this.date.getMonth() + 1;
    let date = this.date.getDate();
    let hours = this.date.getHours();
    let minutes = this.date.getMinutes();

    if (month.toString().length === 1) {
      month = `0${month}`;
    }

    if (date.toString().length === 1) {
      date = `0${date}`;
    }

    if (hours.toString().length === 1) {
      hours = `0${hours}`;
    }

    if (minutes.toString().length === 1) {
      minutes = `0${minutes}`;
    }

    this.date = `${hours}:${minutes} ${date}.${month}.${year}`;
  }

  refuctoringNoteObj() {
    this.coords = `[${this.latitude}, ${this.longitude}]`;
    this.id = NoteListLogic.generateNoteId();
    delete this.latitude;
    delete this.longitude;
    delete this.modalWrapper;
  }
}
