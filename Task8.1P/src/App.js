import React from 'react';
import './App.css';
import NavigationList from './NavigationList';
import Image from './Image';
import Header from './Header';
import CardList from './CardList';
import Footer from './Footer';

function App() {
  return (
    <div className="App">
      <NavigationList />
      <Image />
      <Header text="Featured Experts" />
      <CardList />
      <Footer />
    </div>
  );
}

export default App;
