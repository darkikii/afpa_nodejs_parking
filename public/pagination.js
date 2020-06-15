function pagination(nom,page,mini,maxi,test,prev,next,hasPrev,hasNext,total){

  var ulElt = document.createElement("ul");
  ulElt.classList.add('pagination');

  if(hasPrev === "true"){
    if(prev <= 0){
    prev = 1;
    }
    var liElt = document.createElement("li");
    var lienElt = document.createElement("a");
    lienElt.href = "/listV/" + nom + "/" + prev;
    lienElt.textContent = "<<<";  
    liElt.appendChild(lienElt);
    ulElt.appendChild(liElt);
  }
  

  if(mini <= 0){
    mini = 1;
  }
  if(mini >= 1 && page != 1){
    var liElt = document.createElement("li");
    var lienElt = document.createElement("a"); 
    lienElt.href = "/listV/" + nom + "/" + mini;
    lienElt.textContent = mini;  
    liElt.appendChild(lienElt);
    ulElt.appendChild(liElt);
  }
  
  
  var liElt = document.createElement("li");
  var lienElt = document.createElement("a");  
  lienElt.setAttribute("class", "current");
  lienElt.href = "/listV/" + nom + "/" + page;
  lienElt.textContent = page;  
  liElt.appendChild(lienElt);
  ulElt.appendChild(liElt);

  if(maxi > test){
    maxi = total;
  }
  if(maxi <= test && page != test){
    var liElt = document.createElement("li");
    var lienElt = document.createElement("a");  
    lienElt.href = "/listV/" + nom + "/" + maxi;
    lienElt.textContent = maxi;  
    liElt.appendChild(lienElt);
    ulElt.appendChild(liElt);
  }
  

  if(hasNext === "true"){
    if(next > test){
      next = total;
    }
    var liElt = document.createElement("li");
    var lienElt = document.createElement("a"); 
    lienElt.href = "/listV/" + nom + "/" + next;
    lienElt.textContent = ">>>";  
    liElt.appendChild(lienElt);
    ulElt.appendChild(liElt);
  }

  document.getElementById("pagination").appendChild(ulElt);

}


function dateFr(date){
        var jour = date.split(' ')[2];
        var mois = date.split(' ')[1];
        switch(mois){
          case "Jan":
            mois = "01";
            break;
          case "Feb":
            mois = "02";
            break;
          case "Mar":
            mois = "03";
            break;
          case "Apr":
            mois = "04";
            break;
          case "May":
            mois = "05";
            break;
          case "Jun":
            mois = "06";
            break;
          case "Jul":
            mois = "07";
            break;
          case "Aug":
            mois = "08";
            break;
          case "Sep":
            mois = "09";
            break;
          case "Oct":
            mois = "10";
            break;
          case "Nov":
            mois = "11";
            break;
          case "Dec":
            mois = "12";
            break;
          default:
            mois = "erreur";
        }
        var annee = date.split(' ')[3]; 
        var heure = date.split(' ')[4];

        return jour + "/" + mois + "/" + annee + " à " + heure;
      }


/******************************************************************************************************************************
*******************************************************************************************************************************
******************************************************************************************************************************/

