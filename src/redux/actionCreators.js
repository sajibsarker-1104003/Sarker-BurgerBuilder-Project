import * as actionTypes from './actionTypes';

import axios from 'axios';


export const addIngredient=igtype=>{
  return{
    type:actionTypes.ADD_INGREDIENT,
    payload:igtype,
  }
}

export const removeIngredient=igtype=>{
  return{
    type:actionTypes.REMOVE_INGREDIENT,
    payload:igtype,

  }
}

export const updatePurchasable=()=>{
  return{
    type:actionTypes.UPDATE_PURCHASABLE,

  }
} 

export const resetIngredient=()=>{
  return{
    type:actionTypes.RESET_INGREDIENTS,
    
  }
}

export const loadOrders=order=>{
  return{
    type:actionTypes.LOAD_ORDERS,
    payload:loadOrders,
  }
}

export const orderLoadFailed=()=>{
  return{
    type:actionTypes.ORDER_LOAD_FAILED,
  }
}

export const fetchOrders=()=>dispatch=>{
  axios.get("https://burger-builder-69e98-default-rtdb.firebaseio.com/orders.json")
  .then(response=>{
    //console.log(response.data)
    dispatch(loadOrders(response.data));
  })
}