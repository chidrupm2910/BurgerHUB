import React, {Component} from 'react';
import Button from '../../../components/UI/Button/button'
import classes from './contactData.css';
import Spinner from '../../../components/UI/Spinner/spinner'
import axios from '../../../axios-orders'
import Input from '../../../components/UI/Input/input'

class ContactData extends Component {
    state = {
        orderForm: {
            
                name: {
                    elementtype: 'input',
                    elementconfig: {
                        placeholder: 'your name',
                        type: 'text'
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                    
                    },
                street : {
                    elementtype: 'input',
                    elementconfig: {
                        placeholder: 'your street',
                        type: 'text'
                    },
                    value: '',
                      validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                    
                    },
                zipcode: {
                    elementtype: 'input',
                    elementconfig: {
                        placeholder: 'your zipcode',
                        type: 'text'
                    },
                    value: '',
                      validation: {
                        required: true,
                        minlength: 5,
                        maxlength: 5
                    },
                    valid: false,
                    touched: false
                    },
                country: {
                    elementtype: 'input',
                    elementconfig: {
                        placeholder: 'your country',
                        type: 'text'
                    },
                    value: '',
                      validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                    },
                
                email : {
                    elementtype: 'input',
                    elementconfig: {
                        placeholder: 'your email',
                        type: 'text'
                    },
                    value: '',
                      validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                    },
            
                deliveryMethod: {
                    elementtype: 'select',
                    elementconfig: {
                        options: [{
                            value: 'fastest',
                            displayValue: 'Fastest'
                            },
                            {
                            value: 'cheapest',
                            displayValue: 'Cheapest'
                            }]
                    },
                    value: 'cheapest',
                    validation: {},
                    valid: true 
                    }
            
        },
        formIsValid: false,
        loading: false
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
    
    inputChangedHandler= (event, inputID) => {
        const updatedOrderForm = {...this.state.orderForm}
        const updatedformelement = {...updatedOrderForm[inputID]};
        
        updatedformelement.value = event.target.value;
        updatedformelement.valid = this.checkValidity(updatedformelement.value, updatedformelement.validation)
        updatedformelement.touched = true;
        console.log(updatedformelement)
        updatedOrderForm[inputID] = updatedformelement;
        let formIsValid = true
        for(let i in updatedOrderForm ){
            formIsValid = updatedOrderForm[i].valid && formIsValid;
        }
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid})
    }
    
    orderHandler = (event) =>{
        event.preventDefault();
        
        const formData = {};
        for(let i in this.state.orderForm) {
            formData[i] =this.state.orderForm[i].value;        }
        
        this.setState({loading: true})
        //alert("You Continued");
        const order ={
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            orderData: formData
            
        };
        axios.post('/orders.json', order)
        .then(response => {
            this.setState({loading: false})
            this.props.history.push('/');
        })
        .catch(error => {
            this.setState({loading: false})
        });
        
        
    }

render() {
    const formelements = [];
    for(let ikey in this.state.orderForm){
        formelements.push({
            id: ikey,
            config: this.state.orderForm[ikey]
        });
    }
    let form = (
         <form onSubmit ={this.orderHandler}>
           
           {formelements.map(element => (
           <Input key ={element.id}
           changed ={(event) => this.inputChangedHandler(event, element.id)}
           elementtype={element.config.elementtype}
           inValid={!element.config.valid}
           shouldValidate={element.config.validation}
           elementconfig={element.config.elementconfig} 
           touched={element.config.touched}
           value = {element.config.value} />
           ))}
           <Button btnType="Success" disabled={!this.state.formIsValid} clicked={this.orderHandler}>ORDER</Button>
        
        </form>
        );
    if(this.state.loading) {
        form = <Spinner />
    }
    
    return (
        <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
        </div>
        )
    
}

}

export default ContactData;