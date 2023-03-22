var formulaire = new Formulaire({divId: 'container', dataForm: form});
formulaire.run();

function sendValues(values) {
    //ici envoyez les valeurs au mobile
    console.log(values);
}