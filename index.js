console.log(form);
var formulaire = new Formulaire({divId: 'container', dataForm: form});
formulaire.run();

function submit() {
    console.log(formulaire);
    const values = getValues(formulaire.form.id);
    
    for (let i = 0 ; i < formulaire.dataForm.length ; i++) {
        if (values.hasOwnProperty(formulaire.dataForm[i].name)) {
            for (let j = 0 ; j < formulaire.dataForm[i].error.length ; j++) {
                if (formulaire.dataForm[i].error[j].test(values[formulaire.dataForm[i].name]) === true) {
                    return document.getElementById(formulaire.error.id).innerHTML = formulaire.dataForm[i].error[j].msg;
                    console.log(formulaire.dataForm[i].error[j].msg);
                }
            }
        }
    }
    document.getElementById(formulaire.error.id).innerHTML = "";

    sendValues(values);
}

function getValues(id) {
    let form = document.querySelector("#"+id);
    let inputs = form.querySelectorAll("input, select, checkbox, textarea");
    let values = {};

    inputs.forEach(input => {
        values[input.name] = input.value;
    });

    return values;
}

function sendValues(values) {
    console.log(values);
}

// for (let i = 0 ; i < formulaire.dataForm.length ; i++) {
//     if (values.hasOwnProperty(formulaire.dataForm[i].name)) {
//         for (let j = 0 ; j < formulaire.dataForm[i].error.length ; j++) {
//             if (formulaire.dataForm[i].error[j].test(values[formulaire.dataForm[i].name]) === true) {
//                 return document.getElementById(formulaire.error.id).innerHTML = formulaire.dataForm[i].error[j].msg;
//                 console.log(formulaire.dataForm[i].error[j].msg);
//             }
//         }
//         console.log(formulaire.dataForm[i].name);
//     }
// }