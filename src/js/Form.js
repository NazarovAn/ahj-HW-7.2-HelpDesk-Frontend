export default class Form {
  constructor() {
    this.formDiv = document.querySelector('#ticket-form-box');
    this.formCancel = document.querySelector('#form-cancel');
    this.formConfirm = document.querySelector('#form-confirm');
    this.formShortDes = document.querySelector('#short-description-input');
    this.formCompleteDes = document.querySelector('#complete-description-input');
    this.editedTicket = null;
  }

  getFormData() {
    return {
      shortDescription: this.formShortDes.value,
      completeDescription: this.formCompleteDes.value,
    };
  }

  hideForm() {
    this.formDiv.classList.add('hidden');
  }

  showForm() {
    this.formDiv.classList.remove('hidden');
  }

  clearForm() {
    this.formShortDes.value = '';
    this.formCompleteDes.value = '';
  }

  fillFormInputs(obj) {
    this.formShortDes.value = obj.name;
    this.formCompleteDes.value = obj.description;
  }

  writeEditedTicket(obj) {
    this.editedTicket = obj;
  }

  async editTicket() {
    const url = 'http://ahj-hw-7-1.herokuapp.com/?method=editTicket';
    // const localUrl = 'http://localhost:7070/?method=editTicket';
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        name: this.formShortDes.value,
        description: this.formCompleteDes.value,
        id: this.editedTicket.ticketId,
      }),
    });

    const result = await response.json();
    return result;
  }

  clearEditedTicket() {
    this.editedTicket = null;
  }
}
