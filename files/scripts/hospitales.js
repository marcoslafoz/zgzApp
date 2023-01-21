//Funcion manejador
function manejadorLoadBody() {
    console.log("Se ha cargado el body");
    peticionAsincrona(pintarHospitales);
}

function peticionAsincrona(metodo) {
    //const url = "https://www.zaragoza.es/sede/servicio/farmacia?rf=html&srsname=wgs84&tipo=guardia&start=0&rows=50&distance=500";
    const url = "https://www.zaragoza.es/sede/servicio/equipamiento/list.json?srsname=utm30n&start=0&rows=2000&fl=title,calle,tel&q=category.id%3D%3D780";

    const http = new XMLHttpRequest();

    http.open("GET", url);

    http.setRequestHeader("accept", "application/json");
    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            let resultado = JSON.parse(this.responseText);
            console.log(resultado);
            metodo(resultado);
        }
    }
    http.send();
}

function pintarHospitales(objHospitales) {
    let contenedor = document.getElementById("listaHospitales");
    let arrayHospitales = objHospitales.result;
    let contenido = '<ul class="HospitalesList">';

    arrayHospitales.forEach(f => {
        contenido += '<li>' + f.title + '</li>';
    });

    contenido += '</ul>';
    contenedor.innerHTML += contenido;
}