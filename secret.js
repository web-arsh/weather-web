class Secret{
    #key = "25549f8e37b7a998e1e4f46ee371bfb7";

    Link (city){
        return `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${this.#key}`;
    }
}

export {Secret};