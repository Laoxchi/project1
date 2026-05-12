const xhr = new XMLHttpRequest();

xhr.open('GET', 'http://supersimplebackend.dev');

xhr.onload = function () {
  console.log('Response:', xhr.response);
};

xhr.onerror = function () {
  console.log('Request failed');
};

xhr.send();