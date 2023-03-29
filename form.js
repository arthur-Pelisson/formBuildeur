class Formulaire {

    constructor(props) {
        this.container = null;
        this.test = false;
        this.init(props);
    }
    
    init(props) {
        this.dataForm = props.dataForm;
        this.form = null;
        this.error = "";
        this.input = [];
        this.label = [];
        this.submit = null;
        this.test = props.test;
        this.container = document.getElementById(props.divId);
    }

    run() {
        this.createForm();
        this.display();
    }

    createForm() {
        this.error = new Node({type: 'div', id: 'error'}).createNode();
        this.form = new Node({type: 'div', id: 'form'}).createNode();
        for (let i = 0 ; i < this.dataForm.length ; i++) {
            this.input.push(new Inpute(this.dataForm[i]).dispatch());
            this.label.push(this.createLabel(this.dataForm[i].name, this.dataForm[i].label));
        }
        this.submit = this.createButton("submit", "Envoyer");
    }
    
    createLabel(name, text) {
        let label = document.createElement('label');
        label.for = name;
        label.innerHTML = text;
        return label;
    }
    
    createButton(fnc, txt) {
        let div = new Node({type: 'div', id: 'div-submit', class: "div-input"}).createNode();
        let btn = document.createElement("button");
        btn.innerHTML = txt;
        btn.setAttribute("class", "button");
        let self = this;
        btn.addEventListener("click", function() {
            self.submite();
        });
        div.appendChild(btn);
        return div;
    }
    
    display() {
        this.form.appendChild(this.error);
        for (let i = 0 ; i < this.input.length ; i++) {
            let div = new Node({type: 'div', id: 'div-' + this.input[i].name, class: "div-input"}).createNode();
            div.appendChild(this.label[i]);
            div.appendChild(this.input[i]);
            this.form.appendChild(div);
        }
        this.form.appendChild(this.submit);
        this.container.appendChild(this.form);
    }

    submite() {
        const values = this.getValues(this.form.id);
        if (this.test == false) return sendValues(values);
        for (let i = 0 ; i < this.dataForm.length ; i++) {
            if (values.hasOwnProperty(this.dataForm[i].name)) {
                for (let j = 0 ; j < this.dataForm[i].error.length ; j++) {
                    if (this.dataForm[i].error[j].test(values[this.dataForm[i].name]) === true) {
                        return document.getElementById(this.error.id).innerHTML = this.dataForm[i].error[j].msg;
                    }
                }
            }
        }
        document.getElementById(this.error.id).innerHTML = "";
        sendValues(values);
    }

    getValues() {
        let form = document.querySelector("#"+this.form.id);
        let inputs = form.querySelectorAll("input, select, checkbox, textarea");
        let values = {};
        inputs.forEach(input => {
            if (input.type == "checkbox") {
                if (!input.checked) {
                    return values[input.name] = "";
                }
            }
            if (input.type == "radio") {
                this.getValuesRadios(input, values);
                return;
            }
            values[input.name] = input.value;
        });
        return values;
    }

    getValuesRadios(input, values) {
        if (input.checked === true) {
            if (input.dataset.multi) {
                if (values.hasOwnProperty(input.dataset.key)) {
                    values[input.dataset.key].push(input.value);
                    return;
                }
                return values[input.dataset.key] = [input.value];
            }
            return values[input.name] = input.value;
        }
        return;
    }

    static doc() {
        const doc = {
            "Formulaire": {
                "description": "Créer un formulaire",
                "params": [
                    {
                        name: "divId",
                        type: "string",
                        require: "true",
                    },
                    {
                        name: "dataForm",
                        type: "array",
                        require: "true",
                    },
                    {
                        name: "test",
                        type: "boolean",
                        require: "false",
                    }
                ],
            }
        };
        return doc;
    }

    static getDocumentation() {
        const doc = [];
        doc.push(Formulaire.doc());
        doc.push(Node.doc());
        doc.push(Inpute.doc());
        doc.push(Select.doc());
        doc.push(Textarea.doc());
        doc.push(Checkbox.doc());
        doc.push(Radio.doc());
        return doc;
    }
}

class Inpute {
    constructor(props) {
        this.placeholder = "";
        this.value = "";
        this.init(props);
    }

    init(props) {
        Object.assign(this, props);
    }

    dispatch() {
        switch (this.type) {
            case('select'):
                return new Select(this).createSelect();
            case('textarea'):
                return new Textarea(this).createTextarea();
            case('checkbox'):
                return new Checkbox(this).createCheckbox();
            case('radio'):
                return new Radio(this).createRadio();
            default:
                return this.createInpute();
        }
    }

    createInpute() {
        let input = document.createElement('input');
        input.type = this.type;
        input.name = this.name;
        input.placeholder = this.placeholder;
        input.required = this.required;
        input.value = this.value;
        input.error = this.error;
        return input;
    }

    static doc() {
        const doc = {
            "Inpute": {
                "description": "Créer un input",
                "params": [
                    {
                        name: "type",
                        type: "string",
                        require: "true",
                    },
                    {
                        name: "name",
                        type: "string",
                        require: "true",
                        unique: "true",
                    },
                    {
                        name: "placeholder",
                        type: "string",
                        require: "false",
                    },
                    {
                        name: "required",
                        type: "boolean",
                        require: "false",
                    },
                    {
                        name: "value",
                        type: "string",
                        require: "false",
                    },
                    {
                        name: "error",
                        type: "array",
                        require: "false",
                        test: {
                            "test": "function",
                            "msg": "string"
                        }
                    }
                ],
            }
        };
        return doc;
    }
}

class Select {
    constructor(props) {
        this.value = "";
        Object.assign(this, props);
    }

    createSelect() {
        let select = document.createElement('select');
        select.name = this.name;
        select.required = this.required;
        for (let i = 0 ; i < this.options.length ; i++) {
            let option = document.createElement('option');
            option.value = this.options[i]['value'];
            option.innerHTML = this.options[i]['label'];
            if (this.options[i]['selected'] === true) {
                option.selected = true;
            }
            select.appendChild(option);
        }
        return select;
    }

    static doc() {
        const doc = {
            "Select": {
                "description": "Créer un select",
                "params": [
                    {
                        name: "name",
                        type: "string",
                        require: "true",
                        unique: "true",
                    },
                    {
                        name: "required",
                        type: "boolean",
                        require: "false",
                    },
                    {
                        name: "options",
                        type: "array",
                        require: "true",
                    }, 
                    {
                        name: "value",
                        type: "string",
                        require: "false",
                    }, 
                    {
                        name: "error",
                        type: "array",
                        require: "false",
                        test: {
                            "test": "function",
                            "msg": "string"
                        }
                    }
                ],
            }
        };
        return doc;
    }
}

class Textarea {
    constructor(props) {
        this.value = "";
        Object.assign(this, props);
    }

    createTextarea() {
        let textarea = document.createElement('textarea');
        textarea.name = this.name;
        textarea.required = this.required;
        textarea.placeholder = this.placeholder;
        textarea.value = this.value;
        return textarea;
    }

    static doc() {
        const doc = {
            "Textarea": {
                "description": "Créer un textarea",
                "params": [
                    {
                        name: "name",
                        type: "string",
                        require: "true",
                        unique: "true",
                    },
                    {
                        name: "required",
                        type: "boolean",
                        require: "false",
                    },
                    {
                        name: "placeholder",
                        type: "string",
                        require: "false",
                    },
                    {
                        name: "value",
                        type: "string",
                        require: "false",
                    },
                    {
                        name: "error",
                        type: "array",
                        require: "false",
                        test: {
                            "test": "function",
                            "msg": "string"
                        }
                    }
                ],
            }
        };
        return doc;
    }

}

class Checkbox {
    constructor(props) {
        this.value = "";
        Object.assign(this, props);
    }

    createCheckbox() {
        let checkbox = document.createElement('input');
        checkbox.type = this.type;
        checkbox.name = this.name;
        checkbox.required = this.required;
        checkbox.value = this.value;
        return checkbox;
    }

    static doc() {
        const doc = {
            "Checkbox": {
                "description": "Créer un checkbox",
                "params": [
                    {
                        name: "type",
                        type: "string",
                        require: "true",
                    },
                    {
                        name: "name",
                        type: "string",
                        require: "true",
                        unique: "true",
                    },
                    {
                        name: "required",
                        type: "boolean",
                        require: "false",
                    },
                    {
                        name: "value",
                        type: "string",
                        require: "false",
                    },
                    {
                        name: "error",
                        type: "array",
                        require: "false",
                        test: {
                            "test": "function",
                            "msg": "string"
                        }
                    }
                ],
            }
        };
        return doc;
    }
}

class Radio {
    constructor(props) {
        this.value = "";
        Object.assign(this, props);
    }

    createRadio() {
        let div = new Node({name: this.name ,type: 'div', id: 'div-container-' + this.name, class: "div-input"}).createNode();
        for (let i = 0 ; i < this.options.length ; i++) {
            let radio = document.createElement('input');
            let label = document.createElement('label');
            label.for = name;
            label.innerHTML = this.options[i].label;
            radio.type = this.type;
            radio.name = this.name;
            radio.required = this.required;
            radio.value = this.options[i].value;
            if (this.options[i]['selected'] === true) {
                radio.checked = true;
            }
            if (this.multichoix === true) {
                this.multiChoix(radio, i, label);
            }
            if (this.options[i].checked === true) {
                radio.checked = true;
            }
            div.appendChild(label);
            div.appendChild(radio);
        }
        return div;
    }

    multiChoix(radio, i, label) {
        console.log("multi");
        this.manageCheck(radio);
        radio.setAttribute('data-key', this.name);
        radio.setAttribute('data-multi', true);
        radio.setAttribute('data-tag', false);
        radio.name = radio.name + "-" + i;
        label.name = radio.name + "-" + i; 
    }

    manageCheck(input) {
        input.onmousedown = function() {
            this.dataset.tag = this.checked;
        }
        input.onclick = function() {
            if (this.dataset.tag == "true") {
              this.checked = false;
              this.dataset.tag = "false";
            } else {
              this.dataset.tag = "true";
            }
        }
    }

    static doc() {
        const doc = {
            "Radio": {
                "description": "Créer un radio",
                "params": [
                    {
                        name: "type",
                        type: "string",
                        require: "true",
                    },
                    {
                        name: "name",
                        type: "string",
                        require: "true",
                        unique: "true",
                    },
                    {
                        name: "required",
                        type: "boolean",
                        require: "false",
                    },
                    {
                        name: "options",
                        type: "array",
                        require: "true",
                    }, 
                    {
                        name: "value",
                        type: "string",
                        require: "false",
                    }, 
                    {
                        name: "error",
                        type: "array",
                        require: "false",
                        test: {
                            "test": "function",
                            "msg": "string"
                        }
                    }
                ],
            }
        };
        return doc;
    }
}

class Node {
    constructor(props) {
        this.init(props);
    }

    init(props) {
        Object.assign(this, props);
    }

    createNode() {
        let node = document.createElement(this.type);
        node.name = this.name;
        node.id = this.id;
        if (this.class != undefined) {
            node.className = this.class;
        }
        return node;
    }

    static doc() {
        const doc = {
            "Node": {
                "description": "Créer un node",
                "params": [
                    {
                        name: "type",
                        type: "string",
                        require: "true",
                    },
                    {
                        name: "name",
                        type: "string",
                        require: "true",
                        unique: "true",
                    },
                    {
                        name: "id",
                        type: "string",
                        require: "false",
                    },
                    {
                        name: "class",
                        type: "string",
                        require: "false",
                    },
                ],
            }
        };
        return doc;
    }
}


