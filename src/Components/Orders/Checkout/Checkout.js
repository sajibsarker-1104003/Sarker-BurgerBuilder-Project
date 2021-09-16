import React,{Component} from "react";
import {Button,Modal,ModalBody} from 'reactstrap';
import Spinner from '../../Spinner/Spinner';

import { resetIngredient } from "../../../redux/actionCreators";

import axios from 'axios';

import {connect} from 'react-redux';

const mapStateToProps=state=>{
  return{
    ingredients:state.ingredients,
    totalPrice:state.totalPrice,
    purchasable:state.purchasable,
    userId:state.userId,
    token:state.token,
  }
}

const mapDispatchToProps=dispatch=>{
  return{
    resetIngredient:()=>dispatch(resetIngredient()),
  }
}

class Checkout extends Component{

  state={
    values:{
      deliveryAddress:"",
      phone:"",
      paymentType:"Cash On Delivery",
    },
    isLoading:false,
    isModalOpen:false,
    modalMsg:"",
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
    //console.log(this.state.values);
    this.setState({
      isLoading:true
    })
    const order={
      ingredients:this.props.ingredients,
      customer:this.state.values,
      price:this.props.totalPrice,
      orderTime:new Date(),
      userId:this.props.userId,
    }
    //console.log(order);
    axios.post("https://burger-builder-69e98-default-rtdb.firebaseio.com/order.json?auth="+this.props.token,order)
    .then(response=>{
      if(response.status===200){
        this.setState({
          isLoading:false,
          isModalOpen:true,
          modalMsg:"Order Placed Successfully",
        })
        this.props.resetIngredient();
      }else{
        this.setState({
          isLoading:false,
          isModalOpen:true,
          modalMsg:"Something Went Wrong! Order Again",
        })
      }

    })
    .catch(er=>{
      this.setState({
        isLoading:false,
        isModalOpen:true,
        modalMsg:"Something Went Wrong! Order Again",
      })
    })

  }

  render(){
    let form=(<div>
      <h4 style={{
          border:"3px solid grey",
          boxShadow:"2px 2px #888888",
          borderRadius:"10px",
          padding:"20px",
        }}>Payment:{this.props.totalPrice} BDT</h4>
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

          <Button style={{backgroundColor:"#D70F64"}} className="mr-auto" onClick={this.submitHandler} disabled={!this.props.purchasable}>Place Order</Button>

          <Button style={{backgroundColor:"secondary"}} className="ml-1" onClick={this.goBack}>Cancel</Button>

        </form>
    </div>)
    return(
      <div>
        {this.state.isLoading ? <Spinner/> : form}   
        <Modal isOpen={this.state.isModalOpen} onClick={this.goBack}>
          <ModalBody>
            <p>{this.state.modalMsg}</p>
          </ModalBody>
        </Modal>

      </div>
      )
  }

}
  
export default connect(mapStateToProps,mapDispatchToProps)(Checkout);