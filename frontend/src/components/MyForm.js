import React from 'react'


export default function MyForm(input) 
{
//html of welcome page
  return(
      
      <div className="blo">
          <h5><font size="30">Welcome to the Capsule!</font></h5>
          <p><b>To add a post:</b> click the "add to capsule" button and fill out any data required for you personally!</p>
          <p><b>To view posts:</b> click the "view capsule" button and fill out any data to filter your querys!</p>
          <p><b><i><font size="20">Hope you enjoy!</font></i></b></p>
        <button className="button button1" onClick={() => input.setPage('home')}>Go Back</button>
      </div>
    
  );
}

