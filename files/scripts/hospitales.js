//Funcion manejador
function manejadorLoadBody() {
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
        var searchLocation = f.title + '+' + f.calle + '+zaragoza';
        const mapsUrl = 'https://www.google.es/maps/search/' + searchLocation + '/@41.656279102693006,-0.8787730422828074z/data=!3m1!4b1';
        //Abrimos div
        contenido += '<div class="HospitalesBoxArray">';
        //Titulo 
        contenido += '<div class="filaTextoHospital1">' + f.title + '</div>';
        //Calle
        if (f.calle) contenido += '<div class="filaTextoHospital2">' + f.calle + '</div>';
        else contenido += '<div class="filaTextoHospital2">Sin definir</div>';
        //Ubicacion
        contenido += '<div class="filaTextoHospital2"><a href="' + mapsUrl + '" target="_blank" class="ubicacionURL"><img src="../files/images/locationIcon.png" class="locationIcon"></a></div>';
        //Cerramos div
        contenido += '</div>';

    });

    contenedor.innerHTML += contenido;
}