const sendData = (url, formData, onSuccess, onError, event) => {
  fetch(url,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(Object.fromEntries(formData)),
      })
      .then((response) => {
        if (response.ok) {
          console.log('response ok');
          return response.json();
        }
        return Promise.reject(`Error: ${response.status}`);
      })
      .then((response) => {
        console.log('response', response);
        onSuccess(event, response.errors_fields || response.error_form ? response : '');
      })
      .catch((err) =>{
        console.error('ошибка catch', err);
        onError(event);
      });
};

export {sendData};
