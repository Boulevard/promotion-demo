export class PaymentForm {
  constructor(formEl) {
    this.formEl = document.querySelector(formEl);
  }

  getCardholderName() {
    if (this.cardholderIsClient()) {
      return this.getName();
    }

    return this.querySelector('#card-name').value;
  }

  cardholderIsClient() {
    return this.querySelector('#name-copy').checked;
  }

  getName() {
    const firstName = this.querySelector('#first-name').value;
    const lastName = this.querySelector('#last-name').value;
    return `${firstName} ${lastName}`;
  }

  toggleCardholderIsClient() {
    if (this.cardholderIsClient()) {
      this.querySelector('#card-name').style.display = 'none';
      this.querySelector('#card-name').setAttribute('disabled', 'disabled');
      this.querySelector('#card-name').value = getName();
    } else {
      this.querySelector('#card-name').style.display = '';
      this.querySelector('#card-name').removeAttribute('disabled');
    }
  }

  querySelector(selector) {
    return this.formEl.querySelector(selector);
  }

  setError(error) {
    var errorText = 'An error has occurred. Please try again later.';

    if (typeof (error) === 'string') {
      errorText = error;
    } else if (error && error.message && typeof (error.message) === 'string') {
      errorText = error.message;
    }

    this.querySelector('#error-message').innerText = errorText;
  }

  setDisabled(disabled) {
    this.querySelector('#payment-form-fields').disabled = disabled;
  }

  getClient() {
    return {
      firstName: document.querySelector('#first-name').value,
      lastName: document.querySelector('#last-name').value,
      email: document.querySelector('#email').value
    };
  }

  getCard() {
    var expiration = document.querySelector('#expiration').value;

    return {
      name: this.getCardholderName(),
      number: this.querySelector('#card-number').value,
      exp_month: expiration.slice(0, 2),
      exp_year: `20${expiration.slice(2, 4)}`,
      cvv: this.querySelector('#security').value
    };
  }

  complete() {
    const client = this.getClient();
    this.formEl.innerHTML = `Purchase complete! A receipt has been sent to ${client.email}`;
  }
}