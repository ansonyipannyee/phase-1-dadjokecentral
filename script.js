document.addEventListener('DOMContentLoaded', () => {
    const keywordInput = document.getElementById('keyword-input');
    const jokeSearchBtn = document.getElementById('joke-search-btn');
    const jokeResult = document.getElementById('joke-result');

    jokeSearchBtn.addEventListener('click', () => {
        const keyword = keywordInput.value;
        if (keyword.trim() === '') {
            return;
        }

        fetch(`https://icanhazdadjoke.com/search?term=${keyword}`, {
            headers: {
                Accept: 'application/json',
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.results && data.results.length > 0) {
                const randomJoke = data.results[Math.floor(Math.random() * data.results.length)];
                jokeResult.textContent = randomJoke.joke;
            } else {
                jokeResult.textContent = 'No jokes found with that keyword.';
            }
        })
        .catch(error => console.error('Error fetching joke:', error));
    })

    const featuredJokeContent = document.getElementById('featured-joke-content');

    function fetchFeaturedJoke() {
        fetch(`https://icanhazdadjoke.com/`, {
            headers: {
                Accept: 'application/json',
            }
        })
        .then(response => response.json())
        .then(data => {
            featuredJokeContent.textContent = data.joke;
        })
        .catch(error => console.error('Error fetching joke of the day:', error));
    }

    fetchFeaturedJoke();

    const jokeGeneratorBtn = document.getElementById('joke-generator-btn');
    const jokeGeneratorText = document.getElementById('joke-generator-text');
    const jokeAudio = document.getElementById('joke-audio');

})