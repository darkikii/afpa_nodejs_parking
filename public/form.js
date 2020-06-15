/*selection de vehicule*/
$('#Selectionner').click(function () {
    $.post('/choixPark', { parking: $('#select').val()}, function(data) {
        window.location.replace('accueil/'+data.select);
    }, 'json');/*fin de post*/
    return false; /*pour bloquer le formulaire*/              
})/*fin de clic inscription*/

/*modification de vehicule*/
$('#Modifier').click(function () {
    $.post('/modifPark', { parking: $('#select').val()}, function(data) {
        window.location.replace('modifPark/'+data.select);
    }, 'json');/*fin de post*/
    return false; /*pour bloquer le formulaire*/              
})/*fin de clic inscription*/