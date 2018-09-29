import React , {Component} from 'react';
import Input from '../../components/UI/Input/input'
import Button from '../../components/UI/Button/button'
import classes from './auth.css' 
import {connect} from 'react-redux'
import Spinner from '../../components/UI/Spinner/spinner';
import * as actions from '../../Store/actions/index';
import {Redirect} from 'react-router-dom';

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
        },
        isSignup: true
    }
    componentDidMount() {
        if(!this.props.building && this.props.authRedirect !== '/'){
            this.props.onSetAuthRedirectPath();
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
    
    onSubmitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup)
    }
    
    switchAuthHandler = () => {
        this.setState(prevState => {
            return ({isSignup: !prevState.isSignup})
        })
    }
    
    
    render() {
    const formelements = [];
    for(let ikey in this.state.controls){
        formelements.push({
            id: ikey,
            config: this.state.controls[ikey]
        });
    }
        let form = formelements.map(element => (
            <Input key={element.id}
            changed ={(event) => this.inputChangedHandler(event, element.id)}
           elementtype={element.config.elementtype}
           inValid={!element.config.valid}
           shouldValidate={element.config.validation}
           elementconfig={element.config.elementconfig} 
           touched={element.config.touched}
           value = {element.config.value}/>
    
        ))
        
        
        if(this.props.loading){
            form =<Spinner />
        }
        let errormessage = null;
        if(this.props.error){
            errormessage = (
                <p>{this.props.error.message}</p>)
        }
        let authRedirect = null;
        if(this.props.isAuthenticated){
            authRedirect = <Redirect to={this.props.authRedirect} />
        }
        return (<div className={classes.Auth}>
            <form onSubmit={this.onSubmitHandler}>
               {authRedirect}
               {errormessage}
               {form}
               <Button btnType="Success">Submit</Button>
             </form>
              <Button 
              btnType="Danger"
              clicked ={this.switchAuthHandler}
              >Switch to {this.state.isSignup ? 'Sign In' : 'Sign Up'}</Button>
            </div>)
            
        
    }
    
}

const mapStatetoProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token != null,
        building: state.burgerBuilder.building,
        authRedirect: state.auth.authRedirect
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth:(email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
        onSetAuthRedirectPath: () => dispatch(actions.authRedirectPath('/'))
    }
}

export default connect(mapStatetoProps, mapDispatchToProps)(Auth);