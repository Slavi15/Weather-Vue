<script>
export default {
  data() {
    return {

    }
  },
  methods: {

  },
  mounted() {

  }
}
</script>

<template>
  <div class="homeContainer">
    <div class="title">Welcome to your preferred choice <br> of weather forecasts!</div>
    <div class="searchContainer">
      <input 
        type="text"
        placeholder="Search for a specific location" />
      <router-link to="/weather">
        <button class="btn">Search</button>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
  .homeContainer {
    background-image: url('./images/nature_1.jpg');
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

  .searchContainer {
    align-self: flex-start;
    display: flex;
    align-items: center;
    margin-top: 5vh;
  }

  .searchContainer input {
    width: 30vw;
    height: 7vh;
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

  @keyframes typing {
    from { width: 0 }
    to { width: 100% }
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
  }
</style>