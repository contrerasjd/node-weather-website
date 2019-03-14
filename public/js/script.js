const form      = document.querySelector('form'),
      formInput = document.querySelector('input'),
      message1  = document.querySelector('#message-1'),
      message2  = document.querySelector('#message-2'),
      dispMsg   = (msg1, msg2 = '') => {
        message1.innerHTML = msg1;
        message2.innerHTML = msg2;
      };

form.addEventListener('submit', (e) => {
  e.preventDefault();

  if (!formInput.value) {
    dispMsg('Please specify a location.');
  } else {
    dispMsg('Loading...');

    fetch('/weather?address=' + encodeURI(formInput.value))
    .then(response => response.json())
    .then(data => {
      if (data.error)
        dispMsg(data.error);
      else
        dispMsg(data.location, data.forecast);
    });
  }
});