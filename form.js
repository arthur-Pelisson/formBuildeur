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

    clear() {
        
    }

    get getForm() {
        return this.form;
    }
    
    createForm() {
        this.error = new CreateNode({type: 'div', id: 'error'}).createNode();
        this.form = new CreateNode({type: 'div', id: 'form'}).createNode();
        for (let i = 0 ; i < this.dataForm.length ; i++) {
            this.createInpute(this.dataForm[i]);
            this.label.push(this.createLabel(this.dataForm[i].name, this.dataForm[i].label));
        }
        console.log(this.input);
        console.log(this.label);
        this.submit = this.createButton("submit", "Envoyer");
    }
    
    createInpute(data) {
        this.input.push(new CreateInpute({
            type: data.type,
            name: data.name,
            placeholder: data.placeholder,
            required: data.required,
            value: data.value, 
            error: data.error
        }).createInpute());
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
            btn.setAttribute("onclick", `${fnc}()`);
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
    
    submit() {
        console.log("okokokokkk");
    }
    
    validate() {
    
    }

}

class CreateInpute {
    constructor(props) {
        this.init(props);
    }

    init(props) {
        this.type = props.type;
        this.name = props.name;
        this.placeholder = props.placeholder;
        this.required = props.required;
        this.value = props.value;
        this.error = props.error;
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
        this.type = props.type;
        this.id = props.id;
        this.class = props.class;
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


