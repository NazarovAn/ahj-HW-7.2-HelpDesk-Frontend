export default class TicketList {
  constructor() {
    this.listBox = document.querySelector('#tickets-list-box');
    this.addButton = document.querySelector('#add-button');
    this.list = null;
  }

  insertNewTicket(element) {
    this.listBox.insertAdjacentElement('beforeend', element);
  }

  async loadList() {
    const response = await fetch('https://ahj-hw-7-1.herokuapp.com/?method=allTickets', {
      method: 'GET',
    });

    this.list = await response.json();
  }
}
