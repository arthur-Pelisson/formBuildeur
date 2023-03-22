// {
//     errorEmpty : {
//         'Le nom est obligatoire'
//     },
//     errorMinLength : {
//         'Le nom doit contenir au moins 3 caractères'
//     }
// }
const form = [
    {
        type: 'text',
        name: 'nom',
        label: 'Nom',
        placeholder: 'Entrez votre nom',
        value: '',
        error: [
            {
                test: function(value) {
                    return value === "";
                },
                msg: 'Le nom est obligatoire'
            },

        ]
    },
    {
        type: 'text',
        name: 'prenom',
        label: 'Prénom',
        placeholder: "Entrez votre prénom",
        value: '',
        error: [
            {
                test: function(value) {
                    return value === "";
                },
                msg: 'Le Prénom est obligatoire'
            },

        ]
    },
    {
        type: 'number',
        name: 'age',
        label: 'Âge',
        placeholder: 'Entrez votre Âge',
        value: '',
        error: [
            {
                test: function(value) {
                    return value === "";
                },
                msg: 'L\'âge est obligatoire'
            },

        ]
    },
    {
        type: 'text',
        name: 'localisation',
        label: 'Quartier/Ville',
        placeholder: 'Entrez votre quartier ou ville',
        value: '',
        error: [
            {
                test: function(value) {
                    return value === "";
                },
                msg: 'La localisation est obligatoire'
            },

        ]
    },
    {
        type: 'text',
        name: 'telephone',
        label: 'Telephone',
        placeholder: 'Entrez votre numero de telephone',
        value: '',
        error: [
            {
                test: function(value) {
                    return value === "";
                },
                msg: 'Le numero de telephone est obligatoire'
            },
            {
                test: function(value) {
                    if (value.match(/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/gmi)) return false;
                    return true;
                },
                msg: 'Le numero de telephone n\'est pas valide'
            }

        ]
    },
    {
        type: 'text',
        name: 'email',
        label: 'Email',
        placeholder: 'Entrez votre Email',
        value: '',
        error: [
            {
                test: function(value) {
                    return value === "";
                },
                msg: 'Le mail est obligatoire'
            },
            {
                test: function(value) {
                    console.log(value.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/));
                    if (value.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/)) return false;
                    return true;
                },
                msg: "L'email n'est pas valide"
            }

        ]
    },
]

