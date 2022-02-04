class Alert {
  constructor(message) {
    this.message = message;
    this.doc = document.body;
  }

  renderAlert() {
    if (document.querySelector(".alert_message")) return;

    const markup = `<p class="alert_message font-eng">${this.message}</p>`;

    this.doc.insertAdjacentHTML("afterbegin", markup);

    setTimeout(() => {
      document.querySelector(".alert_message").classList.add("move_top");
    }, 2000);

    setTimeout(() => {
      document.querySelector(".alert_message").remove();
    }, 2100);
  }
}
module.exports = Alert;
