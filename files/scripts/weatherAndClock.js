const gettingWeatherAndClock = () => {
    const inputValue = 'zaragoza' //we take input value

    const API_URL = 'https://api.openweathermap.org/data/2.5/weather?q=';
    const API_KEY = 'fd48bdf8a8b87b3c140f17625f4e2d57';

    const state = {
        temperatura: null,
        city: null,
        country: null,
        icon: null,
    }//create state Object

    // if input was written city name then run that code
    fetch(`${API_URL}${inputValue}&appid=${API_KEY}&units=metric`)//we accept city information 
        .then(response => response.json()) //{}{}{}{}{}
        .then(data => {
            console.log(data.weather[0].icon)
            state.temperatura = data.main.temp;
            state.temperatura = Math.trunc(state.temperatura);
            state.city = data.name;
            state.country = data.sys.country

            document.getElementById('temp').innerHTML = `${state.temperatura}º`;
        })

    //Clock
    function currentTime() {
        let date = new Date();
        let hh = date.getHours();
        let mm = date.getMinutes();

        hh = (hh < 10) ? "0" + hh : hh;
        mm = (mm < 10) ? "0" + mm : mm;

        let time = hh + ":" + mm;

        document.getElementById("clock").innerText = time;
        let t = setTimeout(function () { currentTime() }, 1000);
    }
    currentTime();
}

