console.log("Client side javascript file is loaded!");

fetch("http://localhost:3000/weather?address=!!!!!").then((response) => {
  response.json().then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      console.log(data.place);
      console.log(data.forecast);
    }
  });
});

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#messageOne");
const messageTwo = document.querySelector("#messageTwo");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = search.value;

  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";

  const url =
    "http://localhost:3000/weather?address=" + encodeURIComponent(location);

  fetch(url).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        console.log(data.error);
        messageOne.textContent =
          "Unable to find the given location, try with another search";
      } else {
        messageOne.textContent = data.place;
        messageTwo.textContent = data.forecast;
        console.log(data.place);
        console.log(data.forecast);
      }
    });
  });
});