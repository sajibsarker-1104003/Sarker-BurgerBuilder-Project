import React from 'react';
import Header from './Header/Header';
import BurgerBuilder from './BurgerBuilder/BurgerBuilder';

const Main=(props)=>{
  return(
    <div>
      <h1>Main.js</h1>
      <Header/>
      <BurgerBuilder/>

    </div>
    )
}

export default Main;