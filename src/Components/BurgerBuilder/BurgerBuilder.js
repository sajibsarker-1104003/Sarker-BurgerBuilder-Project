import React, { Component } from 'react';
import Burger from './Burger/Burger';
import Controls from './Controls/Controls';
import {Modal,ModalBody,ModalHeader,ModalFooter,Button} from 'reactstrap';
import Summary from './Summary/Summary';


import {connect} from 'react-redux';
import { addIngredient,removeIngredient,updatePurchasable} from '../../redux/actionCreators';


const mapStateToProps=state=>{
    return{
        ingredients:state.ingredients,
        totalPrice:state.totalPrice,
        purchasable:state.purchasable,
    }
}

const mapDispatchToProps=dispatch=>{
    return{
        addIngredient:(igtype)=>dispatch(addIngredient(igtype)),
        removeIngredient:(igtype)=>dispatch(removeIngredient(igtype)),
        updatePurchasable:()=>dispatch(updatePurchasable()),
    }
}

 class BurgerBuilder extends Component {
    state = {       
        modalOpen:false,        
    }


    addIngredientHandle=type=>{
        //console.log(type);
        this.props.addIngredient(type);
        this.props.updatePurchasable();
    }
    removeIngredientHandle=type=>{
        //console.log(type);
        this.props.removeIngredient(type);
        this.props.updatePurchasable();
    }

    toggleModal=()=>{
        this.setState({
            modalOpen:!this.state.modalOpen
        })
    }

    handleCheckout=()=>{
        this.props.history.push("/checkout");

    }
    render() {
        return (
            <div>
              <div className="d-flex flex-md-row flex-column">
                <Burger ingredients={this.props.ingredients} />
                <Controls
                ingredientAdded={this.addIngredientHandle} 
                ingredientRemoved={this.removeIngredientHandle}
                price={this.props.totalPrice} 
                toggleModal={this.toggleModal}
                purchasable={this.props.purchasable}
                />
              </div>
              <Modal isOpen={this.state.modalOpen}>
                <ModalHeader>Your Order Summary</ModalHeader>
                <ModalBody>
                    <h5>Total Price:{this.props.totalPrice.toFixed(0)} BDT</h5>
                </ModalBody>
                <Summary ingredients={this.props.ingredients}/>
                <ModalFooter>
                    <Button color="success" onClick={this.handleCheckout}>Continue to Checkout</Button>
                    <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
                </ModalFooter>
              </Modal>
            </div>
            
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder)