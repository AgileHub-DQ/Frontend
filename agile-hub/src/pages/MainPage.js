import React from 'react';
import Header from '../components/MainPage/Header'; 
import Footer from '../components/MainPage/Footer';
import Main1 from '../components/MainPage/Main1';
import Main2 from '../components/MainPage/Main2';
import Main3 from '../components/MainPage/Main3';
import Main4 from '../components/MainPage/Main4';
import { createRoutesFromChildren } from 'react-router-dom';

function MainPage() {

  return (
    <div>
      <Header/>
      <Main1/>
      <Main2/>
      <Main3/>
      <Main4/>
      <Footer/>
    </div>
  );
}

export default MainPage;
