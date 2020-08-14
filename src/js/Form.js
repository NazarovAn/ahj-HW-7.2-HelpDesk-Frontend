export default class Form {
  constructor() {
    this.formDiv = document.querySelector('#ticket-form-box');
    this.formCancel = document.querySelector('#form-cancel');
    this.formConfirm = document.querySelector('#form-confirm');
    this.formShortDes = document.querySelector('#short-description-input');
    this.formCompleteDes = document.querySelector('#complete-description-input');
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
}
