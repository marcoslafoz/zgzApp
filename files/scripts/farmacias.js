//Funcion manejador
function manejadorLoadBody() {
    console.log("Se ha cargado el body");
    peticionAsincrona(pintarFarmacias);
}

function peticionAsincrona(metodo) {
    const url = "https://www.zaragoza.es/sede/servicio/farmacia?rf=html&srsname=wgs84&tipo=guardia&start=0&rows=50&distance=500";
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

function pintarFarmacias(objFarmacias) {
    let contenedor = document.getElementById("listaFarmacias");
    let arrayFarmacias = objFarmacias.result;
    let contenido = '';

    arrayFarmacias.forEach(f => {
        var searchLocation = f.title +'+'+ f.calle + '+zaragoza' ;                                       
        const mapsUrl = 'https://www.google.es/maps/search/' + searchLocation +'/@41.656279102693006,-0.8787730422828074z/data=!3m1!4b1';
        //Abrimos div
        contenido += '<div class="FarmaciasBoxArray">';
        //Titulo 
        contenido += '<div class="filaTextoFarmacia1">' + f.title + '</div>';
        //Calle
        if (f.calle) contenido += '<div class="filaTextoFarmacia2">' + f.calle + '</div>';
        else contenido += '<div class="filaTexto2">Sin definir</div>';
        //Ubicacion
        contenido += '<div class="filaTextoFarmacia2"><a href="' + mapsUrl + '" target="_blank" class="ubicacionURL"><img src="../files/images/locationIcon.png" class="locationIcon"></a></div>';
        //Cerramos div
        contenido += '</div>';
    });
    
    contenedor.innerHTML += contenido;
}