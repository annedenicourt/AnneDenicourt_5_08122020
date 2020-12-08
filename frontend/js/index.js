const apiCameras = "https://oc-p5-api.herokuapp.com/api/cameras"
const inputJS = document.getElementById("produits")

async function addContent() {
    let response = await fetch(apiCameras)
    let data = await response.json()
    .then((data) => {
        //pour chaque item, on déclare un objet contenant les informations de l'appareil
        data.forEach((item)  => {
            const { name, price, _id, description, imageUrl } = item;
            //puis on affiche ces informations sous forme HTML
            inputJS.innerHTML += 
                `
            <div class="container col-md-6 col-lg-4">
               <div class="product-list mt-4 card ">
                  <img class=”card-img-top product-illu” src="${imageUrl}"  alt="appareil ${name}">
                  <div class="card-body">
                     <h3 class="card-title">${name}</h3>
                     <span>${price/100}€</span></p>
                     <p class="card-text product-description">${description}</p>
                  </div>
                  <button id="bouton" type="button" class="btn" onclick="window.location.href = 'produit.html?id=${_id}';">Voir le produit</button>
               </div>
               </div>            
                ` 
            })
        })
        return data;
    }
    

window.onload = () => { // Force le lancement de la fonction addContent() au chargement de la page
    addContent();
}




