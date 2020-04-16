const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#messageOne");
const messageTwo = document.querySelector("#messageTwo");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = search.value;

  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";

  const url = "/weather?address=" + encodeURIComponent(location);

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
