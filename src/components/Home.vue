<script>
export default {
  data() {
    return {
      suggestions: []
    }
  },
  methods: {
    weatherPage() {
      let location = document.querySelector('input').value;
      this.$router.push(`/weather/${location}`);
    },
    findLocation() {
      let location = document.querySelector('input').value;
      const KEY = import.meta.env.VITE_WEATHERAPI_KEY;

      const response = fetch(`http://api.weatherapi.com/v1/search.json?key=${KEY}&q=${location}`);
      response.then(res => {
        return res.json();
      }).then(data => {
        this.suggestions.push(data);

        const suggestions = document.getElementById('suggestions');

        if (this.suggestions[this.suggestions.length - 1].length > 0) {
          const mainContainer = document.createElement('div');
          suggestions.style.display = 'block';

          this.suggestions[this.suggestions.length - 1].forEach(item => {
            const elementCard = document.createElement('div');
            elementCard.style.height = '5vh';
            elementCard.style.backgroundColor = 'whitesmoke';
            elementCard.style.border = '1px solid #C6C6C6';
            elementCard.style.marginBottom = '0.5vh';
            elementCard.style.boxShadow = 'rgba(0, 0, 0, 0.24) 0px 3px 8px';
            elementCard.style.cursor = 'pointer';

            elementCard.addEventListener('click', selectLocation);

            const cardData = document.createElement('div');
            cardData.textContent = `${item.name}, ${item.country}`;
            cardData.style.textAlign = 'center';
            cardData.style.fontFamily = 'Poppins';
            cardData.style.fontSize = '14px';
            cardData.style.textTransform = 'uppercase';
            cardData.style.letterSpacing = '2px';
            cardData.style.lineHeight = '5vh';

            function selectLocation() {
              document.querySelector('input').value = cardData.textContent;
              document.getElementById('suggestions').style.display = 'none';
            };

            elementCard.append(cardData);
            mainContainer.append(elementCard);
          });

          suggestions.replaceChildren(mainContainer);
        } else {
          suggestions.style.display = 'none';
        };
      })
    }
  },
  mounted() {

  }
}
</script>

<template>
  <div class="homeContainer">
    <div class="title">Welcome to your preferred choice <br> of weather forecasts!</div>
    <div class="bottomContainers">
      <div class="searchContainer">
        <input 
          @input="findLocation"
          type="text"
          placeholder="Search for a specific location"
          minlength="3" />
        <button @click="weatherPage" class="btn">Search</button>
      </div>
      <div id="suggestions"></div>
    </div>
  </div>
</template>

<style scoped>
  .homeContainer {
    background-image: url('./images/landing.jpg');
    background-size: cover;
    display: grid;
    grid-template-rows: 50% 50%;
    grid-template-columns: auto;
    height: 100vh;
    align-items: center;
    justify-items: center;
  }

  .title {
    font-family: 'Rubik', sans-serif;
    text-align: center;
    font-size: 3.5em;
    font-weight: 600;
    color: white;
    letter-spacing: 3px;
    align-self: flex-end;
    margin-bottom: 5vh;
  }

  .bottomContainers {
    align-self: flex-start;
    display: flex;
    flex-direction: column;
    margin-top: 5vh;
  }

  .searchContainer {
    display: flex;
    align-items: center;
  }

  .searchContainer input {
    width: 30vw;
    height: 7vh;
    font-family: 'Poppins', sans-serif;
    text-transform: uppercase;
    font-size: 14px;
    padding-left: 1vw;
    background-color: whitesmoke;
    border: 1px solid #C6C6C6;
    outline: none;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }

  .searchContainer input::placeholder {
    font-family: 'Poppins', sans-serif;
    text-transform: uppercase;
    font-size: 14px;
    padding-left: 1vw;
  }

  .searchContainer input:focus {
    font-family: 'Poppins', sans-serif;
    text-transform: uppercase;
    color: #282828;
    font-size: 15px;
    letter-spacing: 1px;
    padding-left: 1vw;
  }

  .searchContainer .btn {
    margin-left: 0.5vw;
    height: 7vh;
    width: 10vw;
    border: none;
    background-color: #00E0F5;
    font-family: 'Poppins', sans-serif;
    font-size: 18px;
    font-weight: 500;
    text-transform: uppercase;
    color: whitesmoke;
    letter-spacing: 2px;
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }

  #suggestions {
    width: 40vw;
    margin-top: 2vh;
  }

  .mainContainer {
    background-color: whitesmoke;
  }

  @media screen and (max-width: 700px) {
    .title {
      font-size: 2.25em;
    }

    .searchContainer {
      display: flex;
      flex-direction: column;
    }

    .searchContainer input {
      width: 80vw;
    }

    .searchContainer input::placeholder {
      text-align: center;
    }

    .searchContainer input:focus {
      text-align: center;
    }

    .searchContainer .btn {
      height: 6vh;
      width: 40vw;
      margin-top: 2vh;
    }

    #suggestions {
      width: 80vw;
    }
  }
</style>