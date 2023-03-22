class Formulaire {

    constructor(props) {
        this.container = null;
        this.init(props);
    }
    
    init(props) {
        this.dataForm = props.dataForm;
        this.form = null;
        this.input = [];
        this.label = [];
        this.container = document.getElementById(props.divId);
    }

    run() {
        this.createForm();
        this.display();
    }

    clear() {
        
    }
    
    createForm() {
        this.form = new CreateNode({type: 'form', id: 'form'}).createNode();
        for (let i = 0 ; i < this.dataForm.length ; i++) {
            this.input.push(new CreateNode(this.dataForm[i]).createNode());
        }
        console.log(this.input);
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

    addEventListener() {
        for (let i = 0 ; i < this.input.length ; i++) {
            // console.log(this.input[i]);
            new EventInput({
                input: this.input[i],
                error: this.dataForm[i].error
            }).eventInput();
        }
    }
    
    
    createLabel() {
        
    }
    
    createButton() {
    
    }
    
    display() {
    
    }
    
    submit() {
    
    }
    
    validate() {
    
    }

}

class CreateNode {
    constructor(props) {
        this.init(props);
    }

    init(props) {
        this.props = props;
    }

    createNode() {
        console.log(this.props);
        switch (this.props.TYPE) {
            case 'form':
                return this.createForm();
                break;
            case 'input': 
                return this.createInpute();
                break;
            case 'label':   
                return this.createLabel();
                break;  
            case 'button':
                return this.createButton();
                break;
            default:
                return this.createDiv();
                break;
            }
        
        return node;
    }

    createForm() {
        let node = document.createElement("form");
        node.id = this.id;
        return node;
    }

    createInpute() {
        return this.createInpute(this.props);
    }

    createLabel() {
        let node = document.createElement('label');
        node.for = this.props.name;
        node.id = this.id;
        return node;
    }

    createButton() {
        let node = document.createElement('button');
        node.id = this.id;
        return node;
    }

    createDiv() {
        let node = document.createElement("div");
        node.id = this.id;
        return node;
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

class EventInput {
    constructor(props) {
        this.init(props);
    }

    init(props) {
        this.input = props.input;
        this.error = props.error;
    }

    eventInput() {
        this.input.addEventListener('input', (e) => {
            this.error.innerHTML = '';
        });
    }
}



