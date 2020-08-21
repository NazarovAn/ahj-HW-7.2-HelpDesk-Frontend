export default class Confirm {
  constructor() {
    this.confirm = document.querySelector('#confirm-wrapper');
    this.confirmText = document.querySelector('#confirm-text');
    this.confirmCancelButton = document.querySelector('#confirm-cancel');
    this.confirmDeleteButton = document.querySelector('#confirm-delete');
    this.editedTicket = null;
  }

  showConfirm(editedTicket) {
    this.editedTicket = editedTicket;
    this.confirm.classList.remove('hidden');
  }

  hideConfirm() {
    this.confirm.classList.add('hidden');
  }

  clearEdited() {
    this.editedTicket = null;
  }

  cancelConfirm() {
    this.clearEdited();
    this.hideConfirm();
  }

  async confirmDelete() {
    if (!this.editedTicket) {
      return;
    }

    const url = `http://ahj-hw-7-1.herokuapp.com/?method=removeTicket&ticketId=${this.editedTicket.ticketId}`;
    // const localUrl = `http://localhost:7070/?method=removeTicket&ticketId=${this.editedTicket.ticketId}`;
    const response = await fetch(url, {
      method: 'GET',
    });

    const result = await response.json();
    if (result.removed) {
      this.clearEdited();
      this.hideConfirm();
    }
  }
}
