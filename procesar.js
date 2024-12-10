document.addEventListener("DOMContentLoaded", function() {
    // URL de la API
    const apiUrl = "https://disease.sh/v3/covid-19/countries"; 

    // Función para obtener los datos de la API
    async function fetchCovidData() {
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            populateCovidData(data);
        } catch (error) {
            console.error("Error al obtener los datos de la API:", error);
        }
    }

    // Función para llenar la tabla con los datos
    function populateCovidData(data) {
        const tableBody = document.getElementById("data-body");
        data.forEach(country => {
            // Solo agregar los países más afectados
            if (country.cases > 100000) {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${country.country}</td>
                    <td>${country.cases.toLocaleString()}</td>
                    <td>${country.deaths.toLocaleString()}</td>
                    <td>${country.recovered.toLocaleString()}</td>
                `;
                tableBody.appendChild(row);
            }
        });
    }

    // Llamar a la función para obtener los datos
    fetchCovidData();
});