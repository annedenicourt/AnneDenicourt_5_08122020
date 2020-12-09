// JQUERY
$(document).ready(function(){


// Validation mail       
      $("#mail").blur(function(){

        var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        var emailaddressVal = $(this).val();
         
        if(!emailReg.test(emailaddressVal)) {
            $('#erreur_mail').text('Adresse email non valide');
        } else {
            $('#erreur_mail').text('');
        }
        });  

// Validation code postal
      $("#postalcode").keyup(function(){

          let value = jQuery(this).val();
                value = value.replace(/[^0-9]+/g, '');
                jQuery(this).val(value);

          if ($("#postalcode").val().length <5) {
            $("#postalcode").css({
              borderColor: "red",
              color:"red"
            });
            $('#erreur_code').text('Code postal non valide');      
          } else {
            $("#postalcode").css({
              borderColor: "green",
              color:"green"
          });
            $('#erreur_code').text('');
          }
        });

// Contrôle champs formulaire       

        function verifier(champ) {
          if (champ.val() == 0){
            $("#erreur").css({
                display: "block",
                color: "red"
            });
            $(".erreur_mess").css({
                display: "block",
                color: "red"
            });
          } 
        }

        $("#envoi").click (function(e){
          e.preventDefault();
          verifier ($("#name"));
          verifier ($("#firstname"));
          verifier ($("#adress"));
          verifier ($("#mail"));
          verifier ($("#postalcode"));
          verifier ($("#city"));
        });

        $("#rafraichir").click(function(){
          $(".champ").css({
              borderColor: "#ccc",
              color:"#555"
            }); 
            $("#erreur").css("display", "none");
            $(".erreur_mess").css("display", "none");
            $('#erreur_mail').text('');
            $('#erreur_code').text('');
            
        });

        });