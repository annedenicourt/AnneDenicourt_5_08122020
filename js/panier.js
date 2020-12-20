//Declaration variables
let panier = localStorage.getItem("panier");
let products;
let infosProduit;

function ligneTableau() {
  for (let i = 0; i < products.length; i++) {
    infosProduit = products[i]; //Récupère les infos pour chaque élément du panier
  }
}

function infosHTML() {
  //On ajoute du html pour chaque produit importé dans le panier
  document.getElementById("ajout_panier").innerHTML += `
    <tbody id="products-tablebody">
    <tr id="ligne_tableau">
    <td class="text-center">${infosProduit.name} <br/> Objectif : ${
    infosProduit.lenses
  }</td>
    <td class="text-center">
    <button type="button" onclick="quantiteMoins()" id="bouton_moins" class="btn btn-secondary btn-sm">-</button>
    <span id="quantite_nombre" class="quantite_produit">${
      infosProduit.quantite
    }</span>
    <button type="button" onclick="quantitePlus()" id="bouton_plus" class="btn btn-secondary btn-sm">+</button>
    </td>
    <td id="prix_unite" class="text-center">${infosProduit.price + " €"}</td>
    <td id="prix_total"class="text-center">${
      infosProduit.totalPrice + " €"
    }</td>
    </tr>
    </tbody>`;
}

function tableauVide() {
  //on efface le bouton, le panier, le formulaire lorsque le panier est vide
  document.getElementById(
    "panier_vide"
).innerHTML += `<p>Votre panier est vide</p><i class="fas fa-shopping-cart fa-1x"></i
  >`;
  document.getElementById("tableau_panier").style.display = "none";
  document.getElementById("vider_panier").style.display = "none";
  document.getElementById("formulaire").style.display = "none";
}

function quantitePlus() {
  let quantiteNombre = document.getElementById("quantite_nombre");
  let ajoutQuantite = ++infosProduit.quantite;
  quantiteNombre.textContent = ajoutQuantite;
  let prixTotal = document.getElementById("prix_total");
  let ajoutTotal = infosProduit.price * infosProduit.quantite;
  prixTotal.textContent = `${ajoutTotal} €`;
}

function quantiteMoins() {
  let quantiteNombre = document.getElementById("quantite_nombre");
  let retraitQuantite = --infosProduit.quantite;
  quantiteNombre.textContent = retraitQuantite;
  let prixTotal = document.getElementById("prix_total");
  let ajoutTotal = infosProduit.price * infosProduit.quantite;
  prixTotal.textContent = `${ajoutTotal} €`;
}

//Condition pour afficher et utiliser notre panier
if (!panier) {
  //On vérifie si le panier existe
  //Si non
  panier = {
    products: [], //Créé un tableau vide
  };
  if (panier.products.length <= 0 || localStorage.order) {
    tableauVide();
  }
} else {
  //si oui
  //On extrait notre json
  panier = JSON.parse(panier);
  products = panier.products; //Un tableau avec un index = une ligne/items
  //Condition pour afficher notre panier
  if (
    products.length >= 1 &&
    (localStorage.order == undefined || localStorage.order)
  ) {
    ligneTableau();
    products.forEach((result) => {
      //Boucle pour incrémenter le tableau
      infosProduit = result;
      infosHTML();
    });
  } else if (products.length >= 1 && localStorage.order) {
    //Si on a déjà une commande affiche tableEmpty
    tableauVide();
  }
}

function viderPanier() {
  localStorage.clear();
  location.reload();
}

// FORMULAIRE JQUERY
$(document).ready(function () {
  // Validation mail
  $("#mail").blur(function () {
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    var emailaddressVal = $(this).val();

    if (!emailReg.test(emailaddressVal)) {
      $("#erreur_mail").text("Adresse email non valide");
    } else {
      $("#erreur_mail").text("");
    }
  });

  // Validation code postal
  $("#postalcode").keyup(function () {
    let value = jQuery(this).val();
    value = value.replace(/[^0-9]+/g, "");
    jQuery(this).val(value);

    if ($("#postalcode").val().length < 5) {
      $("#postalcode").css({
        borderColor: "red",
        color: "red",
      });
      $("#erreur_code").text("Code postal non valide");
    } else {
      $("#postalcode").css({
        borderColor: "green",
        color: "green",
      });
      $("#erreur_code").text("");
    }
  });

  // Contrôle champs formulaire
  function verifier(champ) {
    if (champ.val() == 0) {
      $("#erreur").css({
        display: "block",
        color: "red",
      });
      $(".erreur_mess").css({
        display: "block",
        color: "red",
      });
    }
  }

  $("#envoi").click(function (e) {
    e.preventDefault();
    verifier($("#name"));
    verifier($("#firstname"));
    verifier($("#adress"));
    verifier($("#mail"));
    verifier($("#postalcode"));
    verifier($("#city"));
  });

  $("#rafraichir").click(function () {
    $(".champ").css({
      borderColor: "#ccc",
      color: "#555",
    });
    $("#erreur").css("display", "none");
    $(".erreur_mess").css("display", "none");
    $("#erreur_mail").text("");
    $("#erreur_code").text("");
  });
});
