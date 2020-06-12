window.addEventListener("load", function(){
    let queryString = location.search;
    let datos = new URLSearchParams(queryString);
    let idTrack = datos.get('id'); 

    document.querySelector('.cancion').innerHTML = '<iframe scrolling="no" frameborder="0" allowTransparency="true" src="https://www.deezer.com/plugins/player?format=classic&autoplay=true&playlist=true&width=700&height=350&color=007FEB&layout=&size=medium&type=tracks&id=' + idTrack +'&app_id=1" width="100%" height="88"></iframe>';

    fetch("https://cors-anywhere.herokuapp.com/https://api.deezer.com/track/" + idTrack)
    .then(
        function(response){
            return response.json();
        }
    )
    .then (
        function (info) {
            console.log(info);
            
            let titulo = info.title
            document.querySelector('h1').innerHTML = titulo;

            let trackImage = info.album.cover_big
            document.querySelector('.trackImage').src = trackImage; 

            let album = info.album.title
            let idAlbum = info.album.id
            document.querySelector('.album').innerHTML = '<a href="detail-album.html?id=' + idAlbum + '"><p>'+ album + '</p></a>'; 

            let artista = info.artist.name
            let idArtista = info.artist.id
            document.querySelector('.artist').innerHTML = '<a href="detail-artista.html?id=' + idArtista + '"><p>'+ artista + '</p></a>';
            document.querySelector('.mas').innerHTML = 'Mas Canciones de '+ artista;
          
            //Recupero datos del storage
            let recuperoStorage = localStorage.getItem('playlist');

            //Si todavia no tengo tracks en mi playlist
            if(recuperoStorage == null){
                    playlist = [];

            }else {
                playlist = JSON.parse(recuperoStorage);
                //recupero el array del local storage
            }
           
            let agregar = document.querySelector('i');

            agregar.addEventListener('click', function(){
                
                //Si ya esta en la playlist cambio el simbolo
              if (playlist.includes(idTrack)){

                let indiceArray = playlist.indexOf(idTrack);
                playlist.splice(indiceArray, 1);
                document.querySelector('i').innerHTML= '+';
             
                console.log(playlist);
             
            }else{
                playlist.push(idTrack);
                document.querySelector('i').innerHTML= '-'
            }
        
            //guardando lista en local storage
            let playlistStorage = JSON.stringify(playlist);
            localStorage.setItem('playlist', playlistStorage);

            let playlistEnStorge = JSON.stringify(playlist);
            localStorage.setItem('.playlist',playlistEnStorge);
            console.log(playlistEnStorge);
            })

            //seccion canciones de artista

            let otras = info.artist.tracklist
            let url = "https://cors-anywhere.herokuapp.com/" + otras

            fetch(url)
            .then(
                function(response){
                    return response.json();
                }
            )
            .then(
                function(informacion){
                    console.log(informacion);
                    let trackArray = informacion.data
                    let nuevoArray = trackArray.filter(function (track) {
                        console.log(idTrack);
                        return track.id != idTrack
                    })
                    console.log(nuevoArray);
                    

                    for(let i=0; i<6; i++){

                        let titulo = trackArray[i].title;
                        let trackId = trackArray[i].id;

                        let single = '<li><a href="track.html?id=' + trackId +'" class="titulo">' + titulo + '</li>'

                        document.querySelector('.titulos-canciones').innerHTML += single;
                    }
                }
            
            )
            
        }
    )

  

})