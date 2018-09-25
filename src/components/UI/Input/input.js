import React from 'react';
import classes from './input.css'
const input = (props) => {
    let inputElement = 'null'
    let inputClasses = [classes.InputElement];
    
    if(props.inValid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
    }
    
    switch(props.elementtype) {
        case('input'):
            inputElement = <input  onChange={props.changed}
            className={inputClasses.join(' ')}
            {...props.elementconfig} 
            value={props.value}/>;
            break;
            case('select'):
            inputElement = (<select onChange={props.changed}
            className={inputClasses.join(' ')}
            value={props.value}>
           {props.elementconfig.options.map(option =>(
           <option key = {option.value} value={option.value}>{option.displayValue}</option>
           ) )}
            
            </select>);
            break;
        case('textarea'):
            inputElement = <textarea  onChange={props.changed}
            className={inputClasses.join(' ')} 
            {...props.elementconfig} 
            value={props.value}/>;
            break;
        default:
        inputElement = <input onChange={props.changed}
        className={inputClasses.join(' ')} 
        {...props.elementconfig} 
        value={props.value}/>;
        
    }
    
      return(
      <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
      
      </div>
      )
}

export default input;