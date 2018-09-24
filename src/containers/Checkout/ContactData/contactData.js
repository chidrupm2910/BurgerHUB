import React, {Component} from 'react';
import Button from '../../../components/UI/Button/button'
import classes from './contactData.css';
import Spinner from '../../../components/UI/Spinner/spinner'
import axios from '../../../axios-orders'

class ContactData extends Component {
    state = {
        name: '',
        email:'',
        addres: {
            street:'',
            postalCose:''
        },
        loading: false
    }
    
    orderHandler = (event) =>{
        event.preventDefault();
        this.setState({loading: true})
        //alert("You Continued");
        const order ={
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            customer: {
                name: 'Chid',
                address: {
                    street : 'Blk MTN RD',
                    zipcode: '92126',
                    country: "USA"
                },
                email : 'chid@gmail.com'
            },
            deliveryMethod: "fastest"
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
    let form = (
         <form>
           <input type="text" name="name" placeholder = "your name" />
           <input type="text" name="email" placeholder = "your name" />
           <input type="text" name="street" placeholder = "your street" />
           <input type="text" name="zipcode" placeholder = "your zipcode" />
           <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
        
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