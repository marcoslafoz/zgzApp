const config = {
    // etc...
    kit: {
      // etc...
      floc: process.env.NODE_ENV === "development",
    },
  };

//Funcion manejador
function manejadorLoadBody() {
    console.log("Se ha cargado el body");
    peticionAsincrona(pintarOficinasCorreos);
}

function peticionAsincrona(metodo) {
    const url = "https://www.zaragoza.es/sede/servicio/equipamiento/basic/oficinas-de-correos.json?srsname=utm30n_etrs89";
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

function pintarOficinasCorreos(objOficinasCorreos) {
    let contenedor = document.getElementById("listaOficinasCorreos");
    let arrayOficinasCorreos = objOficinasCorreos.result;
    let contenido = '';


    arrayOficinasCorreos.forEach(f => {
        //const ubicacion
        var searchLocation = f.title +'+'+ f.postalCode + '+zaragoza' ;                                       
        const mapsUrl = 'https://www.google.es/maps/search/' + searchLocation +'/@41.656279102693006,-0.8787730422828074z/data=!3m1!4b1';
        //Abrimos div
        contenido += '<div class="OficinasCorreosBoxArray">';
        //Titulo 
        contenido += '<div class="filaTextoCorreos1">' + f.title + '</div>';
        //Calle y CP
        contenido += '<div class="filaTextoCorreos2">' + f.streetAddress + ', ' + f.postalCode + '</div>';
        //Telefono y Horario
        contenido += '<div class="filaTextoCorreos2">' + f.telephone + '</div>';
        //Ubicacion
        contenido += '<div class="filaTextoCorreos2"><a href="' + mapsUrl + '" target="_blank" class="ubicacionURL"><img src="../files/images/locationIcon.png" class="locationIcon"></a></div>';
        //Cerramos div
        contenido += '</div>';
    });


    contenedor.innerHTML += contenido;
}