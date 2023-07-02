<script>
export default {
    data() {
        return {
            realtimeData: null,
            loading: true
        }
    },
    created() {
        this.$watch(
            () => this.$route.params,
            () => {
                this.fetchWeatherData()
            },
            { immediate: true }
        )
    },
    methods: {
        landingPage() {
            this.$router.push(`/`);
        },
        fetchWeatherData() {
            const location = this.$route.params.location;
            const KEY = import.meta.env.VITE_WEATHERAPI_KEY;

            const response = fetch(`https://api.weatherapi.com/v1/forecast.json?key=${KEY}&q=${location}&days=7&aqi=yes`);
            response.then(res => {
                return res.json();
            }).then(data => {
                this.loading = false;
                this.realtimeData = data;

                const weatherContainer = document.querySelector('.weatherContainer');
                const weekContainer = document.getElementById('weekForecast');

                const mainContainer = document.createElement('div');
                mainContainer.style.height = '100%';
                mainContainer.style.display = 'grid';
                mainContainer.style.gridTemplateColumns = '14.285% 14.285% 14.285% 14.285% 14.285% 14.285% 14.285%';

                if (window.matchMedia('(max-width: 800px)').matches) {
                    mainContainer.style.display = 'grid';
                    mainContainer.style.gridTemplateColumns = '100%';
                }

                function unixToDate(dateepoch) {
                    let date = new Date(dateepoch * 1000);
                    let day = date.getDate().toString().padStart(2, '0');
                    let month = (date.getMonth() + 1).toString().padStart(2, '0');
                    let year = date.getFullYear();

                    return `${day}/${month}/${year}`;
                };

                const imageResponse = fetch(`https://imagesapi-w4ba.onrender.com/api/countries/${location.split(', ').length > 1 ? location.split(', ')[1] : location}`);
                imageResponse.then(res => {
                    return res.json();
                }).then(data => {
                    const random = Math.floor(Math.random() * 5);
                    weatherContainer.style.backgroundImage = `url(${data.images[random]})`;
                });

                if (this.loading === false) {
                    this.realtimeData.forecast.forecastday.forEach(item => {
                        const card = document.createElement('div');
                        card.style.height = '90%';
                        card.style.width = '90%';
                        card.style.alignSelf = 'center';
                        card.style.justifySelf = 'center';
                        card.style.display = 'flex';
                        card.style.flexDirection = 'column';
                        card.style.alignItems = 'center';
                        card.style.padding = '10px';

                        card.addEventListener('mouseover', () => {
                            card.style.boxShadow = 'rgba(100, 100, 111, 1) 0px 7px 29px 0px';
                        });

                        card.addEventListener('mouseleave', () => {
                            card.style.boxShadow = 'none';
                        });

                        if (window.matchMedia('(max-width: 800px)').matches) {
                            card.style.height = '100%';
                        }

                        const day = document.createElement('div');
                        day.textContent = unixToDate(item.date_epoch);

                        const icon = document.createElement('img');
                        icon.src = item.day.condition.icon;
                        icon.style.margin = '2vh auto';

                        const degrees = document.createElement('div');
                        degrees.textContent = `${item.day.avgtemp_c}°C`;

                        card.append(day);
                        card.append(icon);
                        card.append(degrees);
                        mainContainer.append(card);
                    });
                };

                weekContainer.append(mainContainer);
            });
        }
    }
}
</script>

<template>
    <div class="weatherContainer">
        <div class="currentWeather">
            <div class="leftSide">
                <img class="weatherIcon" v-if="loading === false" :src="realtimeData.current.condition.icon" />
                <p class="condition" v-if="loading === false">{{ realtimeData.current.condition.text }}</p>
                <p class="location" v-if="loading === false">{{ realtimeData.location.name }}, {{
                    realtimeData.location.country }}</p>
                <div class="temperature" v-if="loading === false">{{ realtimeData.current.temp_c }}°C</div>
                <button @click="landingPage" class="locationButton">
                    <v-icon name="co-location-pin" />
                    <div class="text">Change location</div>
                </button>
            </div>
            <div class="rightSide">
                <div class="humidity">
                    <v-icon name="wi-raindrop" scale="2.5" />
                    <div class="text" v-if="loading === false">Humidity {{ realtimeData.current.humidity }}%</div>
                </div>
                <div class="pressure">
                    <v-icon name="wi-cloud-down" scale="2.5" />
                    <div class="text" v-if="loading === false">Air Pressure {{ (realtimeData.current.pressure_mb *
                        0.0155).toFixed(2) }} PSI
                    </div>
                </div>
                <div class="windSpeed">
                    <v-icon name="wi-strong-wind" scale="2.5" />
                    <div class="text" v-if="loading === false">Wind speed {{ realtimeData.current.wind_kph }} km/h</div>
                </div>
                <div class="rainChance">
                    <v-icon name="wi-rain" scale="2.5" />
                    <div class="text" v-if="loading === false">Chance of Rain {{
                        realtimeData.forecast.forecastday[0].day.daily_chance_of_rain
                    }}%
                    </div>
                </div>
                <div class="uvIndex">
                    <v-icon name="wi-day-sunny" scale="2.5" />
                    <div class="text" v-if="loading === false">UV Index {{ realtimeData.current.uv }}</div>
                </div>
            </div>
        </div>
        <div id="weekForecast"></div>
    </div>
</template>

<style scoped>
.weatherContainer {
    display: grid;
    grid-template-rows: 70vh 30vh;
    background-attachment: fixed;
    background-size: cover;
    background-repeat: no-repeat;
    font-family: 'Roboto Mono', monospace;
    color: white;
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
    color: white;
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

@media screen and (max-width: 799px) {
    .leftSide {
        margin-left: 8vw;
    }

    .rightSide {
        display: none;
    }
}

@media screen and (min-width: 800px) and (max-width: 1000px) {
    .leftSide {
        margin-left: 10vw;
    }

    .rightSide {
        margin-right: 5vw;
    }
}
</style>