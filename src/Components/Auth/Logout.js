import React,{Component} from 'react';
import {Redirect} from 'react-router-dom';
import { connect } from 'react-redux';

import  {logout}  from '../../redux/authActionCreators';
 


const mapDispatchToProps = dispatch =>{
  return{
    logout: () => dispatch(logout()),
  }
}

class Logout extends Component {
  componentDidMount() {
    console.log(this.props.logout());
    this.props.logout();
}
render() {
  return (<Redirect to="/" />)
}
}

export default connect(null, mapDispatchToProps)(Logout);