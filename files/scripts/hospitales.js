//Funcion manejador
function manejadorLoadBody() {
    console.log("Se ha cargado el body");
    peticionAsincrona(pintarHospitales);
}

function peticionAsincrona(metodo) {

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
    let contenido = '';

    arrayHospitales.forEach(f => {
        //Abrimos div
        contenido += '<div class="HospitalesBoxArray">';
        //Titulo 
        contenido += '<div class="filaTextoHospital1">' + f.title + '</div>';
        //Calle
        if (f.calle) contenido += '<div class="filaTextoHospital2">' + f.calle + '</div>';
        else contenido += '<div class="filaTextoHospital2">Sin definir</div>';
        //Cerramos div
        contenido += '</div>';

    });

    contenedor.innerHTML += contenido;
}