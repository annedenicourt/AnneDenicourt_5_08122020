//Declaration variables
const panier = JSON.parse(localStorage.getItem("panier"));
let article;

//Condition pour afficher le panier
if (panier) {
  ligneTableau();
} else {
  tableauVide();
}

function ligneTableau() {
  article = panier;
  article.forEach((result, index) => {
    (article = result), index;
    infosHTML(index);
  });
}

/*function ligneTableau() {
 for (let i = 0; i < panier.length; i++) {
          article = panier[i] //Récupère les infos pour chaque élément du panier
          infosHTML()
        }
      }*/

//Ajout html pour chaque produit importé dans le panier
function infosHTML(index) {
  document.getElementById("ajout_panier").innerHTML += `
    <tbody id="products-tablebody">
    <tr id="ligne_tableau${index}">
    <td class="text-center"><img src="${article.image}"  alt="appareil ${
    article.name
  }"> <br/> ${article.name} <br/> Objectif : ${article.lenses}</td>
    <td class="text-center">
    <button type="button" onclick="quantiteMoins(${index})" id="bouton_moins${index}" class="btn btn-secondary btn-sm">-</button>
    <span id="quantite_nombre${index}" class="quantite_produit">${
    article.quantite
  }</span>
    <button type="button" onclick="quantitePlus(${index})" id="bouton_plus${index}" class="btn btn-secondary btn-sm">+</button>
    </td>
    <td id="prix_unite${index}" class="text-center">${article.price + " €"}</td>
    <td id="sous_total${index}"class="text-center">${
    article.quantite * article.price + " €"
  } </td>
    <td class="text-center"><i id="supp_produit" onclick="annulerArticle()" type="button" class="fas fa-trash-alt" title="Supprimer le produit du panier"></i>
    </td>
    </tr>
    </tbody>`;
}

//pour faire disparaitre le bouton, le panier, le formulaire lorsque le panier est vide
function tableauVide() {
  document.getElementById(
    "panier_vide"
  ).innerHTML += `<p>Votre panier est vide <br/> <i class="fas fa-shopping-cart fa-1x"></i
></p>`;
  document.getElementById("tableau_panier").style.display = "none";
  document.getElementById("vider_panier").style.display = "none";
  document.getElementById("formulaire").style.display = "none";
}

//pour vider le panier et le localStorage
function viderPanier() {
  localStorage.clear();
  location.reload();
}

// Mise à jour du nouveau panier après suppression de l'article
function annulerArticle(i) {
  panier.splice(i, 1);
  localStorage.clear();
  // Mise à jour du nouveau panier avec suppression de l'article
  localStorage.setItem("panier", JSON.stringify(panier));
  //Mise à jour de la page pour affichage de la suppression au client
  window.location.reload();
}

function quantitePlus(index) {
  let quantite = document.getElementById(`quantite_nombre${index}`);
  let ajoutQuantite = ++article.quantite;
  quantite.textContent = ajoutQuantite;
  console.log(panier);
  currentQuantity = document.getElementById(`quantite_nombre${index}`)
    .textContent;
  console.log(currentQuantity);
  localStorage.setItem("panier", JSON.stringify(panier));
}

function quantiteMoins(index) {
  let quantite = document.getElementById(`quantite_nombre${index}`);
  let retraitQuantite = --article.quantite;
  quantite.textContent = retraitQuantite;
  console.log(panier);
  currentQuantity = document.getElementById(`quantite_nombre${index}`)
    .textContent;
  console.log(currentQuantity);
  localStorage.setItem("panier", JSON.stringify(panier));

  if (retraitQuantite <= 1) {
    document.getElementById(`bouton_moins${index}`).style.display = "none";
  }
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
