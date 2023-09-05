document.addEventListener("DOMContentLoaded", function () {
    fetch("https://restcountries.com/v3.1/all")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            const listaPaises = obtenerPaisesAleatorios(data, 20);

            const contenedorPaises = document.getElementById("listaPaises");

            for (let i = 0; i < listaPaises.length; i++) {
                const pais = listaPaises[i];
                const nombrePais = pais.name.common;
                const capital = pais.capital[0];
                const urlBandera = pais.flags.svg;

                const card = document.createElement("div");
                card.classList.add("card", "col-md-3", "mb-4"); 

                const contenidoCard = `
                    <img src="${urlBandera}" alt="Bandera de ${nombrePais}" class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title">${nombrePais}</h5>
                        <p class="card-text">Capital: ${capital}</p>
                    </div>
                `;

                card.innerHTML = contenidoCard;
                contenedorPaises.appendChild(card);
            }
        })
        .catch(function (error) {
            console.error("Error al obtener la lista de países:", error);
        });

    function obtenerPaisesAleatorios(data, numPaises) {
        const paisesAleatorios = [];
        const totalPaises = data.length;

        while (paisesAleatorios.length < numPaises) {
            const indiceAleatorio = Math.floor(Math.random() * totalPaises);
            paisesAleatorios.push(data[indiceAleatorio]);
        }

        return paisesAleatorios;
    }
});