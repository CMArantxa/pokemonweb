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
       mostrarRapido(data.results)
       
        for (const pk of data.results) {
            if(pokemon[pk.name]==undefined){
                pokemon[pk.name]={url:pk.url}
            }
        }
        CargarDatosPokemon()
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
            extractInfoPokemon(datos);
        })

        .catch(error=>{
            console.error('There was a problem with the fetch operation:',error);
        });
    }
    
}

function extractInfoPokemon(info) {
    pokemon[info.name]={
        img:info.sprites.front_default,
        types:info.types.map(t=>t.type.name),
        id:info.id,
        experience:info.base_experience
        
    }
   let selector="#"+info.name+" img";
document.querySelector(selector).src=info.sprites.front_default; 
selector="#"+info.name+" span";
 let textos= document.querySelectorAll(selector)
 textos[0].innerHTML=pokemon[info.name].types;
 textos[1].innerHTML=pokemon[info.name].id;
 textos[2].innerHTML=pokemon[info.name].experience;
}
function mostrarRapido (listaPk){
    var contenidoPk="";
    for (const pk in listaPk) {
        if (Object.hasOwnProperty.call(listaPk, pk)) {
            const element = listaPk[pk];
            contenidoPk+= `<article id="${element.name}">
            <h3>${element.name}</h3>
            <img src="img/loading.gif" alt="" style="width:50%;">
            <div>
               <p><label>Types:</label><span></span></p>
               <p><label>Id:</label><span></span></p>
               <p><label>Experience</label><span></span></p> 
            </div>
    
        </article> `   
        }
    }
    document.getElementById("containerpk").innerHTML=contenidoPk;
}
