export default class Ticket {
  constructor() {
    this.form = document.querySelector('#ticket-form');
    this.ticketObject = null;
    this.ticketDiv = null;
    this.shortDescription = null;
    this.createTime = null;
    this.ticketId = null;
    this.deleteButton = null;
    this.editButton = null;
    this.checkButton = null;
    this.shortDescriptionDiv = null;
  }

  async init() {
    await this.createRequestTicket(this.form);
    this.getTicket(this.ticketObject);
  }

  getTicket(object) {
    this.getTicketID(object);
    this.getShortDescription(object);
    this.getCreatedTime(object);
    this.createTicketDiv(object);
    this.queryDivChildren();
  }

  async createRequestTicket(formElement) {
    const response = await fetch('https://ahj-hw-7-1.herokuapp.com/?method=createTicket', {
      method: 'POST',
      body: JSON.stringify({
        name: formElement.shortDescription.value,
        description: formElement.completeDescription.value,
      }),
    });

    this.ticketObject = await response.json();
  }

  async requestTicketByID() {
    const response = await fetch(`https://ahj-hw-7-1.herokuapp.com/?method=ticketById&ticketId=${this.ticketId}`);
    return response.json();
  }

  getCreatedTime(object) {
    this.createTime = new Date(object.created)
      .toLocaleString()
      .replace(',', '')
      .slice(0, 16);
  }

  getTicketID(object) {
    this.ticketId = object.id;
  }

  getShortDescription(object) {
    this.shortDescription = object.name;
  }

  createTicketDiv() {
    const newElement = document.createElement('div');
    newElement.classList.add('ticket');
    newElement.dataset.id = this.ticketId;
    newElement.innerHTML = `
    <div class="ticket-check ticket-button"></div>
    <div class="ticket-description">
      <div class="ticket-short">${this.shortDescription}</div>
    </div>
    <div class="ticket-time">${this.createTime}</div>
    <div class="ticket-edit ticket-button"></div>
    <div class="ticket-delete ticket-button"></div>
    `;

    this.ticketDiv = newElement;
  }

  queryDivChildren() {
    this.deleteButton = this.ticketDiv.querySelector('.ticket-delete');
    this.editButton = this.ticketDiv.querySelector('.ticket-edit');
    this.checkButton = this.ticketDiv.querySelector('.ticket-check');
    this.shortDescriptionDiv = this.ticketDiv.querySelector('.ticket-short');
  }

  addFullDescription(text) {
    const descriptionBox = this.ticketDiv.querySelector('.ticket-description');
    if (descriptionBox.querySelector('.ticket-complete')) {
      return;
    }
    const description = document.createElement('div');
    description.classList.add('ticket-complete');
    description.innerText = text;
    descriptionBox.insertAdjacentElement('beforeend', description);
  }
}
