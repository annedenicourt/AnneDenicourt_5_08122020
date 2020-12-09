const apiCameras = "https://oc-p5-api.herokuapp.com/api/cameras"
const inputJS = document.getElementById("focus_produit")
const cameraLenses = document.getElementById("camera-lenses")
const commandeBouton = document.getElementById("commande_bouton")




async function addContent() {
    let response = await fetch(apiCameras)
    let data = await response.json()
    .then((data) => {
        //pour chaque item, on déclare un objet contenant les informations de l'appareil
        data.forEach((item)  => {
            const { name, price, lenses, _id, description, imageUrl } = item;

            let id = `${_id}`;  
            //en fonction de son identifiant, si un produit se trouve dans le tableau on affiche ses informations
            if (window.location.href.indexOf(id) > -1) {
            inputJS.innerHTML += 
                `

               <div class="product-list">
                  <img class=” product-illu” src="${imageUrl}"  alt="appareil ${name}">
                  
                  <h3 class="ml-4 mt-4">${name}</h3>
                  <p><span class="ml-4">${price/100}€</span></p>
                      
                      <p class="product-description ml-4">${description}</p>
                          <div class="product-quantity ml-4">
                            <label for="quantity-wanted">Quantité :</label>
                            <input step="number" placeholder="quantité" id="quantity-wanted" class="nbr" type="number" min="1" max="99" value="1"></input>
                          </div>
                      
                  </div>

                `;
                const cart = document.getElementById("bouton")
                //mise en place d'une boucle pour afficher les objectifs des appareils
                for (let i = 0; i < lenses.length; i++) {
                    cameraLenses.innerHTML +=
                        `<option value="${lenses[i]}">${lenses[i]}</option>`
                      }
              }
            })
        })
        return data;
    }
    

window.onload = () => { // Force le lancement de la fonction addContent() au chargement de la page
    addContent();
}




            


