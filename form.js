class Formulaire {

    constructor(props) {
        this.container = null;
        this.init(props);
    }
    
    init(props) {
        this.dataForm = props.dataForm;
        this.form = null;
        this.error = "";
        this.input = [];
        this.label = [];
        this.submit = null;
        this.container = document.getElementById(props.divId);
    }

    run() {
        this.createForm();
        this.display();
    }

    createForm() {
        this.error = new CreateNode({type: 'div', id: 'error'}).createNode();
        this.form = new CreateNode({type: 'div', id: 'form'}).createNode();
        for (let i = 0 ; i < this.dataForm.length ; i++) {
            this.input.push(new CreateInpute(this.dataForm[i]).createInpute());
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
        let div = new CreateNode({type: 'div', id: 'div-submit', class: "div-input"}).createNode();
        let btn = document.createElement("button");
        btn.innerHTML = txt;
        btn.setAttribute("class", "button");
        console.log(this.form.id);
        console.log(this.error.id);
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
            let div = new CreateNode({type: 'div', id: 'div-' + this.input[i].name, class: "div-input"}).createNode();
            div.appendChild(this.label[i]);
            div.appendChild(this.input[i]);
            this.form.appendChild(div);
        }
        this.form.appendChild(this.submit);
        this.container.appendChild(this.form);
    }

    submite() {
        const values = this.getValues(this.form.id);
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
            values[input.name] = input.value;
        });
        return values;
    }
}

class CreateInpute {
    constructor(props) {
        this.init(props);
    }

    init(props) {
        Object.assign(this, props);
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
}

class CreateNode {
    constructor(props) {
        this.init(props);
    }

    init(props) {
        Object.assign(this, props);
    }

    createNode() {
        let node = document.createElement(this.type);
        node.id = this.id;
        if (this.class != undefined) {
            node.className = this.class;
        }
        return node;
    }
}


