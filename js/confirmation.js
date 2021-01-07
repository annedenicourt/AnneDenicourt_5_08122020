function showCommand() {
  let currentCommand = localStorage.getItem("idCommand");

  if (currentCommand) {
    document.getElementById("confirmation").innerHTML += `
        <div class="container col-10 text-center border shadow bg-white rounded p-4 ">
            <h2 class="mb-4">Votre commande a bien été enregistrée !</h2>
            <i class="fas fa-camera-retro fa-4x mb-4"></i>
                <div>
                    <div>Numéro de commande</div>
                    <div class="font-weight-bold mb-4">${localStorage.idCommand}</div>
                    <div>Montant total de votre commande</div>
                    <div class="font-weight-bold mb-4">${localStorage.totalPanier} €</div>
                <div>
                    <h3 class="mb-4">Un mail vous sera adressé dès expédition de votre commande </h3>
                </div>
                <div>Merci de votre confiance et à bientôt !</div>
        </div>
`;
  } else {
    document.getElementById("confirmation").style.display = "none";
    document.getElementById("no_command").innerHTML += `
    <div id="bg_confirm" class="container col-10 text-center border shadow bg-white rounded p-4 ">
    <h3 class="mb-4">Vous n'avez pas de commande en cours</h3>
    <h4><a href="index.html" class="text-success">Découvrez notre gamme d'appareils-photo</a></h4>
    </div>
    `;
  }
}

showCommand();
