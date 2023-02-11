
import './App.css'; //styling
import React, { useEffect } from 'react';
import AddToCapsule from './components/AddToCapsule'; //importing pages
import ViewCapsule from './components/ViewCapsule';
import MyForm from './components/MyForm'


function App() {

  
  let [currPage, setPage] = React.useState('home') //starts on home page
  if(currPage === 'home'){
    //html of home page
    return (
      <div className="App">
        <h1>
          Find out what is going on in the world today!
        </h1> 
        
         <button className='button button1' onClick={() => setPage('addtocapsule')}>
          Add to capsule 
        </button> 
        <button className='button button1' onClick={() => setPage('viewcapsule')}>
          View capsule
        </button>
        <button className='button button1' onClick={() => setPage('MyForm')}>
         Welcome!
        </button>
       
      
        
      </div>
      
    );
  }
  else if (currPage === 'addtocapsule'){// changes pages after button click
    
    return (
      <AddToCapsule setPage = {setPage}/>
    );
  }
  else if (currPage === 'viewcapsule'){
    return (
      <ViewCapsule setPage = {setPage}/>
    );
  }
  else if (currPage === 'MyForm'){
    return (
      <MyForm setPage = {setPage}/>
    );
  }

  else{
    return (
      <div>
        refresh page if here
      </div>
    );
  }
}

export default App;

