// PRODUITS
let article = null;

//Appel URL + API + fonctions pour afficher le produit
function ajoutContent () {
  let id = new URL(window.location).searchParams.get('id')
fetch(`${"https://oc-p5-api.herokuapp.com/api/cameras"}/${id}`) //Rappel notre api + l'id de notre produit
    .then(response => response.json()).then (data => {
        
        article = data
        ajoutHTML(article)
        ajoutLenses(article)
        console.log(article);        
    })
}
//ajout lentilles pour chaque item renseignée dans l'API
function ajoutLenses(article) {
  for (let i = 0; i < article.lenses.length; i++) {
  document.getElementById("lense_select").innerHTML += `<option value="${article.lenses[i]}">${article.lenses[i]}</option>`
  }
}
// Présentation produit HTML
function ajoutHTML(article) {
  document.getElementById('focus_produit').innerHTML += 
  `
    <div class="affichage_produit">
      <img class=”image_produit” src="${article.imageUrl}"  alt="appareil ${article.name}">

      <h3 class="ml-4 mt-4">${article.name}</h3>
      <p class="description_produit ml-4">${article.description}</p>
      <p class="prix_produit mt-4 ml-4"><span>${article.price/100}€</span></p>
    </div>
  `
}
//Ajout produit au panier
function ajoutPanier() {
    let lentilles = document.querySelector('select').value; //Récupère la valeur de l'objectif choisi
    if (lentilles == "") {
      swal("Oups!", "Vous devez choisir un objectif", "warning");
    } else {
        const panier = JSON.parse(localStorage.getItem("panier")) || [] //On extrait notre json
        panier.push({
          image : article.imageUrl,
          name : article.name,
          id :article._id,
          lenses: lense_select.value,
          description : article.description,
          price : article.price/100,
          quantite : 1,
        })
        window.localStorage.setItem("panier", JSON.stringify(panier))
        console.log("Le produit a été ajouté au panier");
        //swal("Super !", "L'article a été ajouté au panier", "success");
  document.getElementById("pop_up").innerHTML +=
  `<div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title text-center" id="exampleModalLongTitle">Super !</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  Vous avez ajouté un produit au panier
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary"><a href="index.html">Continuer vos achats<a></button>
                  <button type="button" class="btn btn-primary"><a href="panier.html">Voir votre panier<a></button>
                </div>
              </div>
            </div>
          </div>`
      }
}

ajoutContent();
