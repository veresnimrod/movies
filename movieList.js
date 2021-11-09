'use strict';
(function Authentication() {
  document.querySelector('[data-form]')?.addEventListener('submit', handleSubmit);
  function handleSubmit(e) {
    e.preventDefault();
    const inputs = e.target.elements;
    const username = inputs.username.value;
    const password = inputs.password.value;
    const repeat_password = inputs.repeat_password.value;

    if (isRegister() && password !== repeat_password) {
      alert('The passwords did not match!');
      return;
    }
    if (!username || !password) {
      alert('All fields are mandatory!');
      return;
    }
    sendAuthRequest(username, password);
  }
  function isRegister() {
    return !document
      .querySelector('[data-register]')
      .classList.contains('hidden');
  }
  async function sendAuthRequest(username, password) {
    const data = await fetch(
      `https://movies-app-siit.herokuapp.com/auth/${isRegister() ? 'register' : 'login'
      }`,
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      }
    ).then((res) => res.json());
    if (data.accessToken) {
      localStorage.setItem('accessToken', data.accessToken);
      location.assign('movieList.html');
    } else {
      console.warn(data.message);
    }
  }
})();
if (localStorage.accessToken) {
  const loginform = document.querySelector('[loginform]');
  loginform.setAttribute('class', 'hidden');

  const signoutButton = document.querySelector('[data-signout]');
  signoutButton.setAttribute('class', 'signoutbutton');
}
const signOutButton = document.querySelector('[data-signout]');

signOutButton.addEventListener('click', signOut);

function signOut() {
  window.localStorage.removeItem('accessToken');
  location.assign('movieList.html');

}
async function getMovies() {
  const api = new Movies();
  const movies = await api.getAllMovies();
  const html = document.createDocumentFragment();
  for (let i = 0; i < movies.results.length; i++) {

    const container = document.querySelector(".container");
    const MovieContainer = document.createElement("div");
    const ImageContainer = document.createElement("img");
    const TitleContainer = document.createElement("p");
    const Title = movies.results[i].Title;
    const moviePoster = movies.results[i].Poster;
    const movieLink = document.createElement('a')
    ImageContainer.src = moviePoster;
    movieLink.href = `movieDetails.html?id=${movies.results[i]._id}`;

    TitleContainer.append(Title);
    movieLink.append(TitleContainer, ImageContainer);
    MovieContainer.append(movieLink);
    html.append(MovieContainer);
    container.append(html);
  }
}
async function Toggle() {
  document
    .querySelector('[data-login=switch]')
    ?.addEventListener('click', toggleClasses);
  document
    .querySelector('[data-register=switch]')
    ?.addEventListener('click', toggleClasses);

  function toggleClasses(e) {
    e.preventDefault();
    const elements = document.querySelectorAll('[data-login], [data-register]');
    for (const elem of elements) {
      elem.classList.toggle('hidden');
    }
  }
}
getMovies();
Toggle();