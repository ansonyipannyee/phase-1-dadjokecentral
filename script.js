document.addEventListener("DOMContentLoaded", () => {
  const keywordInput = document.getElementById("keyword-input");
  const jokeSearchForm = document.getElementById("joke-search-form");
  const jokeResult = document.getElementById("joke-result");

  jokeSearchForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const keyword = keywordInput.value;
    if (keyword.trim() === "") {
      return;
    }

    fetch(`https://icanhazdadjoke.com/search?term=${keyword}`, {
      headers: {
        Accept: "application/json",
      },
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.results && data.results.length > 0) {
        const randomJoke =
          data.results[Math.floor(Math.random() * data.results.length)];
        jokeResult.textContent = randomJoke.joke;
      } else {
        jokeResult.textContent = "No jokes were found with that keyword.";
      }
    })
    .catch((error) => console.error("Error fetching joke:", error));
  });
  
keywordInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    fetchNewRandomJoke();
  }
});

  const featuredJokeContent = document.getElementById("featured-joke-content");

  function fetchFeaturedJoke() {
    fetch(`https://icanhazdadjoke.com/`, {
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        featuredJokeContent.textContent = data.joke;
      })
      .catch((error) =>
        console.error("Error fetching joke of the day:", error)
      );
  }

  fetchFeaturedJoke();

  function fetchNewRandomJoke() {
    fetch(`https://icanhazdadjoke.com/`, {
      headers: {
        Accept: "application/json",
      },
    })
    .then((response) => response.json())
    .then((data) => {
      featuredJokeContent.textContent = data,joke;
    })
    .catch((error) => 
      console.error("Error fetching joke of the day:", error)
    );
  }

  const jokeGeneratorBtn = document.getElementById("joke-generator-btn");
  const jokeGeneratorText = document.getElementById("joke-generator-text");

  jokeGeneratorBtn.addEventListener("click", () => {
    const originalEmoji = jokeGeneratorBtn.textContent;
    const jokeAudio = new Audio(
      "https://www.soundjay.com/human/sounds/fart-03.mp3"
    );
    jokeAudio.play();
    jokeGeneratorBtn.textContent = "😮‍💨";

    fetch(`https://icanhazdadjoke.com/`, {
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        jokeGeneratorText.textContent = data.joke;

        setTimeout(() => {
          jokeGeneratorBtn.textContent = originalEmoji;
        }, 1000);
      })
      .catch((error) => {
        console.error("Error fetching joke:", error);
        jokeGeneratorText.textContent =
          "Oops! Something went wrong. Please try again.";
      });
  });
});
