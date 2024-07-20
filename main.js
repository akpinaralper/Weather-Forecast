// HTML elementlerini seçer
const searchInput = document.querySelector("#searchInput"); // Şehir adı girilen input alanı
const cityName = document.querySelector(".cityName"); // Şehir adı gösterim alanı
const degree = document.querySelector(".degree"); // Sıcaklık gösterim alanı
const weathercontent = document.querySelector(".weathercontent"); // Hava durumu açıklaması gösterim alanı
const weatherIcon = document.querySelector("#weatherIcon"); // Hava durumu ikonu gösterim alanı

// Enter tuşuna basıldığında hava durumu verilerini bulma fonksiyonunu çağırır
searchInput.addEventListener("keypress", findWeatherData);

const weatherAPI = new WeatherAPI(); // WeatherAPI sınıfının bir örneğini oluşturur

// Hava durumu verilerini bulma fonksiyonu
function findWeatherData(e) {
    if (e.keyCode == '13') { // Enter tuşuna basıldığında çalışır
        const cityName = searchInput.value.trim(); // Arama kutusundaki şehir adını alır ve boşlukları temizler
        weatherAPI.getWeatherInfo(cityName) // WeatherAPI ile hava durumu bilgilerini alır
            .then(data => {
                if (data.message == "city not found") { // Şehir bulunamadığında uyarı verir
                    alert("Bu şehir bulunamadı.");
                }
                else {
                    display(data); // Veriler başarılı bir şekilde alındığında gösterir
                }
            })
            .catch(err => console.log(err)); // Hata olursa konsola yazdırır
    }
}

// Hava durumu verilerini ekrana gösterme fonksiyonu
function display(data) {
    cityName.textContent = data.name; // Şehir adını gösterir
    degree.textContent = Math.round(`${data.main.temp}`) + "°C"; // Sıcaklığı gösterir
    weathercontent.textContent = data.weather[0].description; // Hava durumu açıklamasını gösterir
    searchInput.value = ""; // Arama kutusunu temizler

    // Hava durumu ikonunu gösterme
    const icon = data.weather[0].icon;
    weatherIcon.src = `http://openweathermap.org/img/wn/${icon}.png`;

    // Arka plan resmini hava durumuna göre değiştirme
    const weatherDescription = data.weather[0].main.toLowerCase();
    if (weatherDescription.includes("clear")) {
        document.body.className = 'sunny';
    } else if (weatherDescription.includes("clouds")) {
        document.body.className = 'cloudy';
    } else if (weatherDescription.includes("rain")) {
        document.body.className = 'rainy';
    } else if (weatherDescription.includes("snow")) {
        document.body.className = 'snowy';
    } else {
        document.body.className = ''; // Varsayılan arka plan
    }
}