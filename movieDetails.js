'use strict'
if (!localStorage.accessToken){
const myButtons = document.getElementById('buttons');
myButtons.classList.add('hidden')}

const api = new Movies();
const urlParams = new URLSearchParams(location.search);
const movieId = urlParams.get('id');
async function getDetails() {
    const movie = await api.getMovieById(movieId);
    const fragment = document.createDocumentFragment();
    const contaier = document.querySelector(".container");
    const movieContainer = document.createElement("div");
    const imageContainer = document.createElement("img");
    const titleContainer = document.createElement("p");
    const genreContainer = document.createElement("p");
    const plotContainer = document.createElement("p");
    const rating = document.createElement("p");
    const source = document.createElement("p");
    const sourceContainer = document.createElement("p");
    const buttonHolder = document.createElement("div")
    const deleteButton = document.createElement("button");
    const editButton = document.createElement("button");

    deleteButton.innerText = "Delete Movie";
    editButton.innerText = "Edit Movie";

    movieContainer.classList.add('moviecontainer');
    titleContainer.classList.add('title');
    genreContainer.classList.add('genre');
    plotContainer.classList.add('plot');
    rating.classList.add('rating');
    sourceContainer.classList.add('source');
    buttonHolder.classList.add('buttonHolder');
   
    const movieTitle = movie.Title;
    const moviePoster = movie.Poster;
    const moviePlot = movie.Plot;
    const ratings = [];
    const sources = [];
    for (let i = 0; i < movie.Ratings.length; i++) {
        sources.push(movie.Ratings[i].Source);
        ratings.push(movie.Ratings[i].Value);
    }
    sourceContainer.append("Sources:");
    source.append(sourceContainer, sources);
    rating.append(ratings, buttonHolder);
    plotContainer.append(moviePlot);
    imageContainer.src = moviePoster;
    titleContainer.append(movieTitle);
    genreContainer.append(movie.Year + " - ", movie.Genre + " (", movie.Runtime + ")");
    movieContainer.append(titleContainer, genreContainer, imageContainer, plotContainer, source, rating);
    fragment.append(movieContainer);
    contaier.append(fragment);
}
getDetails();
const Buttons = document.getElementById('deletebutton');
Buttons.addEventListener('click', async function () {
    await api.deleteMovie(movieId);
    location.assign('movieList.html');
});
