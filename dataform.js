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
    {
        type: 'select',
        options: [
            {
                value: "",
                label: 'Choisissez votre sexe',
                select: true
            },
            {
            value: '1',
            label: 'Option 1'
        },
        {
            value: '2',
            label: 'Option 2'
        },
        {
            value: '3',
            label: 'Option 3'
        }
        ],
        name: 'options',
        label: 'Options',
        error: [
            {
                test: function(value) {
                    return value === "";
                },
                msg: 'Vous devez selectionner une option'
            },
        ]
    },
    {
        type: 'textarea',
        name: 'textare',
        label: 'Texarea',
        placeholder: 'Entrez votre Texte',
        value: '',
        error: [
            {
                test: function(value) {
                    return value.length > 10;
                },
                msg: 'Vous devez remplir le champ avec plus de 10 caractères'
            },
        ]
    },
    {
        type: 'checkbox',
        name: 'checkbox',
        label: 'Checkbox',
        value: "1",
        error: [
            {
                test: function(value) {
                    return value === "";
                },
                msg: 'Vous devez cocher la case'
            },
        ]
    },
    {
        type: 'radio',
        name: 'radio',
        label: 'Radio',
        value: "",
        multichoix: true,
        options: [
            {
                value: '1',
                label: 'Option 1',
                checked: true
            }, 
            {
                value: '2',
                label: 'Option 2',
            }, 
            {
                value: "3",
                label: "Option 3",
            }
        ],
        error: [
            {
                test: function(value) {
                    if (Array.isArray(value)) {
                        if (value.length === 0) return true;
                    }
                    return value === "";
                },
                msg: 'Le mail est obligatoire'
            },
        ]
    },
    {
        type: 'radio',
        name: 'radio2',
        label: 'Radio-1',
        value: "",
        multichoix: false,
        options: [
            {
                value: '1',
                label: 'Option 1',
                checked: true
            }, 
            {
                value: '2',
                label: 'Option 2',
            }, 
            {
                value: "3",
                label: "Option 3",
            }
        ],
        error: [
            {
                test: function(value) {
                    if (Array.isArray(value)) {
                        if (value.length === 0) return true;
                    }
                    return value === "";
                },
                msg: 'Le mail est obligatoire'
            },
        ]
    },
]

