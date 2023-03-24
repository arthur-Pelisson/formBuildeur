var formulaire = new Formulaire({divId: 'container', dataForm: form, test:false});
formulaire.run();

function sendValues(values) {
    //ici envoyez les valeurs au mobile
    console.log(values);
}