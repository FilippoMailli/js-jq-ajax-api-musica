/*
 SCOPO DEL GIOCO: Attraverso una chiamata ajax all’Api di boolean avremo a disposizione una decina di dischi musicali.
 Servendoci di handlebars stampiamo tutto a schermo. In questo momento non è importante la parte grafica.
 Bonus: Creare una select con i seguenti generi: pop, rock, metal e jazz. In base a cosa scegliamo nella select vedremo i corrispondenti cd.

*/

$(document).ready(function() {
    var source = $("#card-template").html();
    var cardTemplate = Handlebars.compile(source);

    $('.selettore-genere').change(function() {
        var genereAttuale = $(this).val();      //DO COME VARIABILE QUELLO CHE ABBIAMO SELEZIONATO TRA I GENERI
        // console.log(genereAttuale);          //ORA FACCIO SHOW DI QUELLI SELEZIONATI ALTRIMENTI SHOW TUTTI SE SELEZIONO NIENTE
        if (genereAttuale == "") {
            $('.card').show();                   //SE SELEZIONO "SCEGLI GENERE" MOSTRO TUTTE LE CARTE
        } else {                                 //ALTRIMENTI
            $('.card').each(function(){         //PER OGNI CLASSE CARD
                if(genereAttuale.toLowerCase() == $(this).data('genere').toLowerCase()){    //SE QUELLO SELEZIONATO E' UGUALE A QUELLO CICLATO DA EACH (LOWERCASE)
                    $(this).show();             //MOSTRA QUELLO CICLATO
                } else {
                    $(this).hide();             //NASCONDI QUELLO CICLATO
                }
            });
        }
    });


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
                var genere = arrayCanzoni[i].genre;
                //ORA INSERISCO TUTTI I DATI NEL TEMPLATE DI HANDLEBARS
                var template = {
                    sourceAlbum: sorgenteAlbum,
                    album: titolo,
                    artista: autore,
                    anno: year,
                    genere: genere
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
