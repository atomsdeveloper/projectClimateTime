const region = document.getElementById('region');
const share = document.getElementById('btnShare');

const content = document.querySelector('.content');
const place = document.getElementById('place');
const degress = document.getElementById('degress');
const wind = document.getElementById('wind');
const climate = document.getElementById('imgClimate');

share.addEventListener('click', () => {
    if (!region.value) {
        return
    };

    getDataApi();
});

async function getDataApi() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q= ${encodeURI(region.value)} &units=metric&appid=bc3cf0c6ed3f94a9edbe23f81724bd7d`;

    try {
        await fetch(url).then((res) => res.json()).then((data) => {
            
            if (data?.cod && data.cod === "404") {
                return alert(`Não Encontrado!!!`);
            };

            loadData(data);
        });

    } catch (error) {
        alert(error);
    };
};  

function loadData(data) {
    place.innerHTML = `${data.name}, ${data.sys.country}`;
    degress.innerHTML = `Temperatura: ${Math.floor(data.main.temp)} C`;
    climate.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`; 
    wind.innerHTML = `Vento: ${data.wind.speed} km/h`;
    content.style.display = 'flex';
};