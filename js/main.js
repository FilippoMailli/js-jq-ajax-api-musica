/*
 SCOPO DEL GIOCO: Attraverso una chiamata ajax all’Api di boolean avremo a disposizione una decina di dischi musicali.
 Servendoci di handlebars stampiamo tutto a schermo. In questo momento non è importante la parte grafica.
 Bonus: Creare una select con i seguenti generi: pop, rock, metal e jazz. In base a cosa scegliamo nella select vedremo i corrispondenti cd.

*/

$(document).ready(function() {
    var source = $("#card-template").html();
    var cardTemplate = Handlebars.compile(source);


    $.ajax({
        url: "https://flynn.boolean.careers/exercises/api/array/music",
        method: "GET",
        success: function (data) {
            // console.log(data);
            // console.log(data.response);     //DO IL NOME ALL'ARRAY DATA.RESPONSE COSì DA POTERLO CICLARE
            var arrayCanzoni = data.response;
            for (var i = 0; i < arrayCanzoni.length; i++) {
                // console.log(arrayCanzoni[i].poster);    //INSERISCO IL DATO IN UNA VARIABILE
                var sorgenteAlbum = arrayCanzoni[i].poster;
                // console.log(sorgenteAlbum);              //FACCIO LA STESSA COSA CON IL TITOLO, AUTORE E ANNO
                var titolo =  arrayCanzoni[i].title;
                var autore = arrayCanzoni[i].author;
                var year = arrayCanzoni[i].year;
                //ORA INSERISCO TUTTI I DATI NEL TEMPLATE DI HANDLEBARS
                var template = {
                    sourceAlbum: sorgenteAlbum,
                    album: titolo,
                    artista: autore,
                    anno: year
                }

                var cardAlbum = cardTemplate(template);
                $('.container-carte').append(cardAlbum);

            }
        },
        error: function () {
            alert('ERRORE GENERICO');
        }
    })
});
