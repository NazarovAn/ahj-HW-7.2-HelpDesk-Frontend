export default class TicketList {
  constructor() {
    this.listBox = document.querySelector('#tickets-list-box');
    this.addButton = document.querySelector('#add-button');
    this.list = null;
    this.removedElement = null;
  }

  insertNewTicket(element) {
    this.listBox.insertAdjacentElement('beforeend', element);
  }

  writeRemovedTicket(element) {
    this.removedElement = element;
  }

  clearRemovedTicket() {
    this.removedElement = null;
  }

  removeListChild(elem) {
    this.listBox.removeChild(elem);
  }

  removeTicket() {
    if (this.removedElement === null) {
      return;
    }
    this.removeListChild(this.removedElement);
    this.clearRemovedTicket();
  }

  async loadList() {
    const url = 'https://ahj-hw-7-1.herokuapp.com/?method=allTickets';
    // const localUrl = 'http://localhost:7070/?method=allTickets';
    const response = await fetch(url, {
      method: 'GET',
    });

    this.list = await response.json();
  }
}
