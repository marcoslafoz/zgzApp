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
        //Abrimos div
        contenido += '<div class="FarmaciasBoxArray">';
        //Titulo 
        contenido += '<div class="filaTextoFarmacia1">' + f.title + '</div>';
        //Calle
        if (f.calle) contenido += '<div class="filaTextoFarmacia2">' + f.calle + '</div>';
        else contenido += '<div class="filaTexto2">Sin definir</div>';
        //Cerramos div
        contenido += '</div>';
    });


    contenedor.innerHTML += contenido;
}