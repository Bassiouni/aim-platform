const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.querySelector('#name');
  const email = document.querySelector('#email');
  const password = document.querySelector('#password');

  fetch('/user', {
    body: {
      name,
      email,
      password,
    },
    method: 'POST',
  })
    .then((res) => res.json())
    .then((res) => {
      console.log({ res });
      if (res.id) {
        window.location.replace('/');
      } else if (res.statusCode == 400) {
        const section = document.querySelector('#error');
        section.replaceChildren('');
        res.message.forEach((elem) => {
          const div = document.createElement('div');
          div.append(elem);
          section.appendChild(div);
        });
      }
    })
    .catch(console.log);
});
