import React , {Component} from 'react';
import Input from '../../components/UI/Input/input'
import Button from '../../components/UI/Button/button'
import classes from './auth.css'
class Auth extends Component {
    state = {
        controls: {
            email: {
                    elementtype: 'input',
                    elementconfig: {
                        placeholder: 'Email address',
                        type: 'email'
                    },
                    value: '',
                    validation: {
                        required: true,
                        isEmail: true
                    },
                    valid: false,
                    touched: false
                    
                    },
                    password: {
                    elementtype: 'input',
                    elementconfig: {
                        placeholder: 'Password',
                        type: 'password'
                    },
                    value: '',
                    validation: {
                        required: true,
                        minlength: 7
                    },
                    valid: false,
                    touched: false
                    
                    },
        }
    }
    checkValidity (value, rules) {
        let isValid = true;
        if(rules.required){
            isValid = value.trim() !== ''  && isValid;
        }
        if(rules.minlength){
            isValid = value.length >= rules.minlength && isValid;
        }
          if(rules.maxlength){
            isValid = value.length <= rules.maxlength && isValid;
        }
        return isValid;
    }
    
    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value,this.state.controls[controlName].validation),
                touched: true
            }
        }
        this.setState({controls: updatedControls})
    }
    
    render() {
    const formelements = [];
    for(let ikey in this.state.controls){
        formelements.push({
            id: ikey,
            config: this.state.controls[ikey]
        });
    }
        const form = formelements.map(element => (
            <Input key={element.id}
            changed ={(event) => this.inputChangedHandler(event, element.id)}
           elementtype={element.config.elementtype}
           inValid={!element.config.valid}
           shouldValidate={element.config.validation}
           elementconfig={element.config.elementconfig} 
           touched={element.config.touched}
           value = {element.config.value}/>
    
        ))
        return (
            <div className={classes.Auth}>
               {form}
               <Button btnType="Success">Submit</Button>
             
            </div>
        )
    }
    
}

export default Auth;