export class FormSendMessage {
  constructor(target, response) {
    this._formSend = target.querySelector('[data-form-send="parent"]');
    this._formSendContainer = target.querySelector('[data-form-send="container"]');

    this._form = target.closest('.form');
    this._formWrapper = target.querySelector('.form__wrapper');

    this._response = response;
  }

  _awaitTimer(timer) {
    return new Promise(resolve => setTimeout(resolve, timer))
  };

  async _showMessage(errorResponse) {
    try {
      const messageBody = this._formSendContainer.innerHTML;
      this._form.classList.add('is-hidden')

      await this._awaitTimer(300)
      if (errorResponse) {
        this._formSendContainer.innerHTML = '';
        if (errorResponse.errors_fields) {
          errorResponse.errors_fields.forEach(errorEntry => {
            const errorMessage = document.createElement('p');
            errorMessage.textContent = errorEntry.error;
            this._formSendContainer.append(errorMessage);
          });
        } else if (errorResponse.error_form) {
          this._formSendContainer.innerHTML = `<p>${errorResponse.error_form}</p>`;
        }
      }
      this._formSend.classList.add('is-shown');

      await this._awaitTimer(3500)
      this._formSend.classList.remove('is-shown');

      await this._awaitTimer(300)
      this._form.classList.remove('is-hidden');
      if (errorResponse) {
        this._formSendContainer.innerHTML = messageBody;
      }
    } catch (error) {

    }
  }

  response() {
    this._showMessage(this._response);
  }
};
