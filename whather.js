const apiKey = '5446773f3fe6662a6398f421dbfc0991';

async function getWeather(city) {
  try {

    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);  
    const data = await response.json();
    const weatherElement1 = document.getElementById('weather_5days');

    weatherElement1.innerHTML=""

    const weatherElement = document.getElementById('weather');
    weatherElement.innerHTML = `<div class = "days5"> Температура в ${city}: ${data.main.temp}°C.<br>Ощущается как ${data.main.feels_like}°C.<br>Давление: ${data.main.pressure} гПа.<br>Скорость ветра: ${data.wind.speed} м/с.</div>`;
  } catch (error) {
    console.error('Ошибка при получении данных о погоде:', error);
    const weatherElement = document.getElementById('weather');
    weatherElement.innerHTML = `<div class="error">404 <h1>${city} не найден</h1></div>`;
  }
}

async function WeatherDef() {
  try {

    const city = ['Astana', 'London', 'New York', 'Tokyo'];
    const weatherDefoult1 = document.getElementById('popular_weather1');
    const weatherDefoult2 = document.getElementById('popular_weather2');

    const weatherDefoult3 = document.getElementById('popular_weather3');
    const weatherDefoult4 = document.getElementById('popular_weather4');

    
    const [data1, data2, data3, data4] = await Promise.all(city.map(city => // язнаю мы это не проходили я в гугле взял 
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`).then(res => res.json())
    ));
    weatherDefoult1.innerText = `Температура в ${city[0]}: ${data1.main.temp}°C`;
    weatherDefoult2.innerText = `Температура в ${city[1]}: ${data2.main.temp}°C`;

    weatherDefoult3.innerText = `Температура в ${city[2]}: ${data3.main.temp}°C`;

    weatherDefoult4.innerText = `Температура в ${city[3]}: ${data4.main.temp}°C`;

  } catch (error) {

    console.error('Ошибка :', error);

  }
}


async function getWeather_5days(city) {
  try {

    const response = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`); 
    const data = await response.json();

    const weatherElement1 = document.getElementById('weather');
    weatherElement1.innerHTML=""

    const weatherElement = document.getElementById('weather_5days');
    
    let forecast = `<h1>Прогноз на 5 дней для ${city}:</h1>`;
    data.list.forEach((item, index) => {
      if (index % 8 === 0) {  
        forecast += `<div class = "days5">День ${Math.floor(index / 8) + 1}:<br>Температура: ${item.main.temp}°C <br>Ощущается как: ${item.main.feels_like}°C <br>Давление: ${item.main.pressure} гПа <br>Скорость ветра: ${item.wind.speed} м/с <br>Время: ${new Date(item.dt * 1000).toLocaleString()} <br><br></div>`;
      }
    });
    weatherElement.innerHTML = forecast;
    
  } catch (error) {
    console.error('Ошибка при получении данных о погоде:', error);
    const weatherElement = document.getElementById('weather_5days');

    weatherElement.innerHTML = `<div class="error"><h1>Ошибка: ${error.message}</h1></div>`;
  }
}


WeatherDef(); 

const btn = document.querySelector('.btn');
const btn_today = document.getElementById('button_today')

const btn_5days = document.getElementById('button_5_days')

btn_5days.addEventListener('click', () => {
  const city_name = document.getElementsByClassName('city')[0].value;
  getWeather_5days(city_name);
  console.log(city_name);
});

btn_today.addEventListener('click', () => {
  const city_name = document.getElementsByClassName('city')[0].value;
  getWeather(city_name);
  console.log(city_name);
});

btn.addEventListener('click', () => {
  const city_name = document.getElementsByClassName('city')[0].value;
  getWeather(city_name);
  console.log(city_name);
});





