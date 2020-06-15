let queryString = location.search;
let datos = new URLSearchParams (queryString);
let idTrack= datos.get('id');

let proxy = 'https://cors-anywhere.herokuapp.com/';
let url = proxy + "https://api.deezer.com/tracks/" + idTrack

let recuperoStorage = localStorage.getItem('playlist');

if (recuperoStorage == null || recuperoStorage =='[]'){
    playlist = [];
    var mensaje = 'no hay canciones en tu playlist';
    alert(mensaje)
}
else{
    playlist = JSON.parse(recuperoStorage);  
}


let playlistClass = document.querySelector('.playlistClass');

playlist.forEach(function(idTrack){
    mostrarTrack(idTrack);
});

function mostrarTrack(idTrack){
    let proxy = 'https://cors-anywhere.herokuapp.com/';
    let url = proxy + "https://api.deezer.com/track/" + idTrack;

    fetch(url)
      .then(function(response){
            return response.json();
        })
     .then(function(datos) { 
            console.log(datos.title);
            // let resultados = datos.data;
            
            playlistClass.innerHTML += `<li>` + datos.title + `</li>`
                                       `<li>` + datos.duration + `</li>`
                                       `<li>` + datos.artist.name + `</li>`
                                       `<li>` + datos.album + `</li>`;
            let player = document.querySelector('iframe')
            player.src = 'https://www.deezer.com/plugins/player?format=square&autoplay=false&playlist=false&width=300&height=300&color=007FEB&layout=&size=medium&type=tracks&id=' + idTrack + '&app_id=1'
                               
            for (let i = 0; i < 4; i++) {
            let imagenTrack = document.querySelector('.fotosInicio');
            imagenTrack.src = datos[i].artist.picture_medium
            }   
                 
        })
    .catch(function(error){
        console.log(error);
    })
    return playlistClass;
}
let datosSearch = new URLSearchParams (queryString);
let search= datosSearch.get('search');

// let proxy = 'https://cors-anywhere.herokuapp.com/';
let url2 = proxy + "https://api.deezer.com/search/tracks?q=" + search;
fetch(url2)
   .then(function(response){
       return response.json()
   })
   .then(function(datosSearch){
       console.log(datosSearch)
       let buscador = document.querySelector('.buscador')
       let result = datosSearch.data;
       result.forEach(function(resultado){
           buscador.innerHTML += '<li>' + resultado.name + '</li>'
       });
   })
   .catch(function(error){
       console.log(error)
   })