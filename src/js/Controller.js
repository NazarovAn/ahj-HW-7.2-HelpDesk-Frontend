import TicketList from './TicketList';
import Ticket from './Ticket';
import Form from './Form';
import Confirm from './Confirm';

export default class Controller {
  constructor() {
    this.form = new Form();
    this.ticketList = new TicketList();
    this.confirm = new Confirm();
  }

  async init() {
    this.addListners();
    await this.ticketList.loadList();
    this.renderList();
  }

  renderList() {
    this.ticketList.list.forEach((listItem) => {
      const newTicket = new Ticket();
      newTicket.getTicket(listItem);
      this.ticketList.insertNewTicket(newTicket.ticketDiv);
      this.addTicketListners(newTicket);
    });
  }

  addListners() {
    document.addEventListener('keypress', (evt) => {
      if (evt.key === 'Enter' && !this.form.formDiv.classList.contains('hidden')) {
        evt.preventDefault();
        this.form.formConfirm.click();
      }
    });

    this.ticketList.addButton.addEventListener('click', (evt) => {
      evt.preventDefault();
      this.form.showForm();
    });

    this.form.formCancel.addEventListener('click', (evt) => {
      evt.preventDefault();
      this.form.hideForm();
      this.form.clearForm();
    });

    this.form.formConfirm.addEventListener('click', async (evt) => {
      evt.preventDefault();
      if (this.form.formShortDes.value === '') {
        this.form.formShortDes.style.border = '1px red solid';
        // eslint-disable-next-line no-return-assign
        setTimeout(() => this.form.formShortDes.style.border = '', 1500);
        return;
      }

      if (this.form.editedTicket !== null) {
        const editRequest = await this.form.editTicket();
        if (editRequest.edited) {
          this.form.editedTicket.shortDescriptionDiv.textContent = editRequest.name;
          const fullDescriptionElem = this.form.editedTicket.checkFullDescription();
          if (fullDescriptionElem) {
            fullDescriptionElem.textContent = editRequest.description;
          }
          this.form.clearEditedTicket();
        }
      } else {
        this.createNewTicket();
      }

      this.form.clearForm();
      this.form.hideForm();
    });

    this.confirm.confirmCancelButton.addEventListener('click', (evt) => {
      evt.preventDefault();
      this.confirm.cancelConfirm();
    });

    this.confirm.confirmDeleteButton.addEventListener('click', async (evt) => {
      evt.preventDefault();
      evt.stopPropagation();
      this.confirm.confirmDelete();
      this.ticketList.removeTicket();
    });
  }

  async createNewTicket() {
    const newTicket = new Ticket();
    await newTicket.init();
    this.ticketList.insertNewTicket(newTicket.ticketDiv);
    this.addTicketListners(newTicket);
  }

  addTicketListners(ticket) {
    ticket.ticketDiv.addEventListener('click', async (evt) => {
      evt.preventDefault();
      if (!ticket.checkFullDescription()) {
        const fullTicket = await ticket.requestTicketByID(ticket.ticketId);
        ticket.addFullDescription(fullTicket.description);
      } else {
        ticket.removeFullDescription();
      }
    });

    ticket.deleteButton.addEventListener('click', (evt) => {
      evt.preventDefault();
      evt.stopPropagation();

      this.confirm.showConfirm(ticket);
      this.ticketList.writeRemovedTicket(ticket.ticketDiv);
    });

    ticket.editButton.addEventListener('click', async (evt) => {
      evt.preventDefault();
      evt.stopPropagation();
      ticket.ticketDiv.classList.add('edited');
      this.form.showForm();
      const ticketObj = await ticket.requestTicketByID();
      this.form.fillFormInputs(ticketObj);
      this.form.writeEditedTicket(ticket); // test
    });

    ticket.checkButton.addEventListener('click', async (evt) => {
      evt.preventDefault();
      evt.stopPropagation();
      await ticket.checkTicket();
      ticket.checkButton.classList.toggle('checked');
    });
  }
}
