import React,{Component} from "react";
import {Button} from 'reactstrap';

class Checkout extends Component{

  state={
    values:{
      deliveryAddress:"",
      phone:"",
      paymentType:"Cash On Delivery",
    }
  }

  goBack=()=>{
    this.props.history.goBack("/");
  }

  inputChangeHandler=(e)=>{

    this.setState({
      values:{
        ...this.state.values,
        [e.target.name]:e.target.value,
      }
    })
  }

  submitHandler=()=>{
    console.log(this.state.values);
  }

  render(){
    return(
      <div>
        <form style={{
          border:"3px solid grey",
          boxShadow:"2px 2px #888888",
          borderRadius:"10px",
          padding:"20px",
        }}>
          <textarea name="deliveryAddress" 
          value={this.state.values.deliveryAddress} 
          className="form-control" 
          placeholder="Your Address" 
          onChange={(e)=>this.inputChangeHandler(e)}></textarea>
          <br/>

          <input 
          name="phone" 
          className="form-control" 
          value={this.state.values.phone} 
          placeholder="Your Phone Number" 
          onChange={(e)=>this.inputChangeHandler(e)}/>
          <br/>

          <select 
          name="paymentType" 
          className="form-control" 
          value={this.state.paymentType} 
          onChange={(e)=>this.inputChangeHandler(e)} >
            <option value="Cash On Delivery">Cash On Delivery</option>
            <option value="Bkash">Bkash</option>
          </select>
          <br/>

          <Button style={{backgroundColor:"#D70F64"}} className="mr-auto" onClick={this.submitHandler}>Place Order</Button>

          <Button style={{backgroundColor:"secondary"}} className="ml-1" onClick={this.goBack}>Cancel</Button>

        </form>

      </div>
      )
  }

}
  
export default Checkout;