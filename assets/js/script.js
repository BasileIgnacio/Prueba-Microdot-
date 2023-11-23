const units = {
	Celcius: "°C",
	Fahrenheit: "°F"
};

const config = {
	minTemp: -20,
	maxTemp: 50,
	unit: "Celcius"
};

document.addEventListener("DOMContentLoaded", () => {
    // Change min and max temperature values

    const tempValueInputs = document.querySelectorAll("input[type='text']");

    tempValueInputs.forEach((input) => {
        input.addEventListener("change", (event) => {
            const newValue = event.target.value;
            
            if(isNaN(newValue)) {
                return input.value = config[input.id];
            } else {
                config[input.id] = input.value;
                range[input.id.slice(0, 3)] = config[input.id]; // Update range
                return setTemperature(); // Update temperature
            }
        });
    });

    // Change temperature
    const temperature = document.getElementById("temperature");

    function setTemperature() {

        // Pido los datos a la ruta /data/update
        fetch("/data/update")
        .then(response => response.json())
        .then(data => {
            // Guardo el valor de temperatura en la variable temp
            const temp = data.cpu_temp;
            // Asigno el valor de temperatura al termometro
            temperature.style.height = (temp - config.minTemp) / (config.maxTemp - config.minTemp) * 100 + "%";
            temperature.dataset.value = temp + units[config.unit];
        });
        
    }
    // Se actualiza la temperatura cada 200 ms
    setInterval(setTemperature, 200);
});
