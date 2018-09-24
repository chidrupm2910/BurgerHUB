import React, {Component} from 'react';
import Button from '../../../components/UI/Button/button'
import classes from './contactData.css';

class ContactData extends Component {
    state = {
        name: '',
        email:'',
        addres: {
            street:'',
            postalCose:''
        }
    }

render() {
    return (
        <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        <form>
           <input type="text" name="name" placeholder = "your name" />
           <input type="text" name="email" placeholder = "your name" />
           <input type="text" name="street" placeholder = "your street" />
           <input type="text" name="zipcode" placeholder = "your zipcode" />
           <Button btnType="Success">ORDER</Button>
        
        </form>
        </div>
        )
    
}

}

export default ContactData;