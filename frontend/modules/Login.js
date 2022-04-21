import validator from 'validator';

export default class Login {
    constructor(formClass) {
        this.form = document.querySelector(formClass);

    }

    init(){
        this.events();
    }

    events(){
        if(!this.form) return;
        this.form.addEventListener('submit', e => {
            e.preventDefault();
            this.validate(e);
        })
    }

    validate(e){
        const el = e.target;
        const emailInput = el.querySelector('input[name="email"]');
        const passwordInput = el.querySelector('input[name="password"]');

        if(!validator.isEmail(emailInput.value)) return alert("Invalid email")
        if(passwordInput.value.length<3 || passwordInput.value.length>15) return alert("Password length must be between 3 and 15 characters");
        el.submit();
        
    }
}