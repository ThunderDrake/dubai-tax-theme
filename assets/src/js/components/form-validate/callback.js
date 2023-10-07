
import {FormSendMessage} from './form-send-msg.js';
import {sendData} from './send-data.js';

const baseSuccessCallback = (event) => {
  event.preventDefault();
  // В данном колбеке бэкендер, либо разработчик при необходимости будет писать запрос на отправку формы на сервер и обрабатывать возможные ошибки или успешную отправку формы на сервер

  const formData = new FormData(event.target);
  const url = event.target.action;

  sendData(url, formData, backendSuccsessCallback, backendErrorCallback, event);
};

const baseErrorCallback = (event) => {
  event.preventDefault();
  // Данный коллбек используется при необходимости выполнить какое-либо действие помимо показа ошибок при попытке отправить неккорректные данные
};

const backendSuccsessCallback = (event, response) => {
  const formSend = new FormSendMessage(event.target, response);
  formSend.response();
};

const backendErrorCallback = () => {
  alert('Reload page!');
  // Данный коллбек используется при необходимости выполнить какое-либо действие , если код ответа сервера не "ОК"
};

export const callbacks = {
  base: {
    // Сбросс формы
    reset: true,
    // Таймаут сброса формы
    resetTimeout: 500,
    successCallback: baseSuccessCallback,
    errorCallback: baseErrorCallback,
  },
};
