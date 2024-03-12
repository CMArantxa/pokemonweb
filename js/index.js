var pokemon={};

window.onload=()=>{
    let menu=document.getElementById("ticmenu");
    menu.onclick=()=>{
        if(document.getElementById("menumovil").classList.contains("menu-movil")){
            document.getElementById("menumovil").classList.remove("menu-movil");
        }else{
            document.getElementById("menumovil").classList.add("menu-movil");
        }
    }

    let url="https:pokeapi.co/api/v2/pokemon";
    document.getElementById("loading").style.display="block"
    fetch(url)
    .then(response =>{
        if (!response.ok){
            throw new Error('Network response was not ok');
        }return response.json();
    })
    .then(data=>{
        document.getElementById("loading").style.display="none";
        //console.log(data);para ver en consola
        for (const pk of data.results) {
            if(pokemon[pk.name]==undefined){
                pokemon[pk.name]={url:pk.url}
            }
        }
        CargarDatosPokemon
    })
    .catch(error=>{
        console.error('There was a problem with the fetch operation:',error);
    });
}

function CargarDatosPokemon() {
    for (const pk in pokemon) {
        fetch(pokemon[pk].url)
        .then(resp=>{
            if(!resp.ok){
                throw new Error('Network response was not ok');

            }return resp.json();
        })

        .then(datos=>{
            console.log(datos);
        })

        .catch(error=>{
            console.error('There was a problem with the fetch operation:',error);
        })
    }
    
}
