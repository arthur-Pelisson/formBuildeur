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
        // required: true,
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
        // required: true,
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
        type: 'text',
        name: 'age',
        label: 'Âge',
        placeholder: 'Entrez votre Âge',
        // required: true,
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
        // required: true,
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
        // required: true,
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
                    console.log(value.match(/^\+?[0-9]{13}$/));
                    if (value.match(/^\+?[0-9]{12}$/)) return false;
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
        // required: true,
        value: '',
        error: [
            {
                test: function(value) {
                    return value === "";
                },
                msg: 'Le mail est obligatoire'
            },

        ]
    },
]

