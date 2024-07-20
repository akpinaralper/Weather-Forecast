class WeatherAPI {
    constructor() {
        // OpenWeatherMap API'nin temel URL'si
        this.baseURL = "https://api.openweathermap.org/data/2.5/weather";
        // OpenWeatherMap API anahtarı
        this.apikey = "1bc25314fc1515082c77403375372e9a";
    }

    // Şehir adıyla hava durumu bilgilerini alır
    async getWeatherInfo(cityName) {
        // API'ye istek gönderir ve yanıtı alır
        const response = await fetch(`${this.baseURL}?q=${cityName}&appid=${this.apikey}&units=metric&lang=tr`);
        // Yanıtı JSON formatına dönüştürür
        const data = await response.json();
        // JSON verisini geri döndürür
        return data; 
    }
}