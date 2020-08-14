export default class Confirm {
  constructor() {
    this.confirm = document.querySelector('#confirm-wrapper');
    this.confirmText = document.querySelector('#confirm-text');
    this.confirmCancelButton = document.querySelector('#confirm-cancel');
    this.confirmDeleteButton = document.querySelector('#confirm-delete');
  }

  showConfirm() {
    this.confirm.classList.remove('hidden');
  }

  hideConfirm() {
    this.confirm.classList.add('hidden');
  }
}
