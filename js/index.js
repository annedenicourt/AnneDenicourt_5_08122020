const fetchPromise = fetch("https://oc-p5-api.herokuapp.com/api/cameras");
const inputJS = document.getElementById("produits");

fetchPromise.then(response => {
  return response.json();
})
.then((data => {
  data.forEach((item)  => {
    const { name, price, _id, description, imageUrl } = item;
            //puis on affiche ces informations sous forme HTML
            inputJS.innerHTML +=
                `
            <div class="container col-md-6 col-lg-4">
               <div class="affichage_produit mt-4 card ">
                  <img class=”card-img-top product-illu” src="${imageUrl}"  alt="appareil ${name}">
                  <div class="card-body">
                     <h3 class="card-title">${name}</h3>
                     <span>${price/100}€</span></p>
                     <p class="card-text product-description">${description}</p>
                  </div>
                  <button id="bouton" type="button" class="btn btn-secondary" onclick="window.location.href = 'produit.html?id=${_id}';">Voir le produit</button>
               </div>
               </div>
                `
            })
}))

