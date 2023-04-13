<script>
import { ref } from 'vue';
import { useRoute } from 'vue-router';

export default {
    setup() {
        const route = useRoute();
        const location = route.params.location;

        const KEY = import.meta.env.VITE_WEATHERAPI_KEY;

        const realtimeData = ref(null);

        const response = fetch(`http://api.weatherapi.com/v1/forecast.json?key=${KEY}&q=${location}&aqi=yes`);
        response.then(res => {
            return res.json();
        }).then(data => {
            realtimeData.value = data;
        });

        return { realtimeData };
    },
    methods: {
        landingPage() {
            this.$router.push(`/`);
        }
    }
}
</script>

<template>
    <div class="weatherContainer">
        <div class="currentWeather">
            <div class="leftSide">
                <img class="weatherIcon" :src="realtimeData.current.condition.icon" />
                <p class="condition">{{ realtimeData.current.condition.text }}</p>
                <p class="location">{{ realtimeData.location.name }}, {{ realtimeData.location.country }}</p>
                <div class="temperature">{{ realtimeData.current.temp_c }}°C</div>
                <button @click="landingPage" class="locationButton">
                    <v-icon name="co-location-pin" />
                    <div class="text">Change location</div>
                </button>
            </div>
            <div class="rightSide">
                <div class="humidity">
                    <v-icon name="wi-raindrop" scale="2.5" />
                    <div class="text">Humidity {{ realtimeData.current.humidity }}%</div>
                </div>
                <div class="pressure">
                    <v-icon name="wi-cloud-down" scale="2.5" />
                    <div class="text">Air Pressure {{ (realtimeData.current.pressure_mb * 0.0155).toFixed(2) }} PSI</div>
                </div>
                <div class="windSpeed">
                    <v-icon name="wi-strong-wind" scale="2.5" />
                    <div class="text">Wind speed {{ realtimeData.current.wind_kph }} km/h</div>
                </div>
                <div class="rainChance">
                    <v-icon name="wi-rain" scale="2.5" />
                    <div class="text">Chance of Rain {{ realtimeData.forecast.forecastday[0].day.daily_chance_of_rain }}%
                    </div>
                </div>
                <div class="uvIndex">
                    <v-icon name="wi-day-sunny" scale="2.5" />
                    <div class="text">UV Index {{ realtimeData.current.uv }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.weatherContainer {
    height: 100vh;
    display: grid;
    font-family: 'Roboto Mono', monospace;
    background-color: whitesmoke;
}

.currentWeather {
    display: grid;
    grid-template-columns: 50% 50%;
    justify-content: space-between;
}

.leftSide {
    justify-self: flex-start;
    display: flex;
    flex-direction: column;
    margin: 10vh auto auto 5vw;
}

.leftSide .weatherIcon {
    height: 128px;
    width: 128px;
}

.leftSide .locationButton {
    display: flex;
    font-family: 'Roboto Mono', monospace;
    font-size: 14px;
    align-items: center;
    background-color: transparent;
    border: none;
    outline: none;
    cursor: pointer;
}

.locationButton .text {
    margin-left: 1vw;
}

.leftSide .temperature {
    font-size: 4em;
    font-weight: bold;
    margin: 2vh 0;
}

.leftSide .condition {
    font-size: 20px;
}

.leftSide .location {
    font-size: 16px;
}

.rightSide {
    width: 45%;
    justify-self: flex-end;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 10vh 3vw auto auto;
}

.rightSide .humidity,
.pressure,
.windSpeed,
.uvIndex,
.rainChance {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
}

.windSpeed .text,
.pressure .text,
.humidity .text,
.uvIndex .text,
.rainChance .text {
    margin-left: 1vw;
}
</style>