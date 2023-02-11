import React, { useState } from "react";




function submit(input, state){
    
   //fetch method to post data and add it into the local database after submit button is clicked
     fetch('http://localhost:3000/store-data/'+ state.fname + '/'+ state.Country + '/'+ state.City + '/'+ state.State + '/'+ state.Title + '/'+ state.Msg, {
      method: 'POST',
     // headers: { 'Content-Type': 'application/json' },
      // We convert the React state to JSON and send it as the POST body
   /**  body: JSON.stringify({
      Name: state.fname,
      Title: state.Title,
      Msg: state.Msg,
      City: state.City,
      State: state.State,
      Country: state.Country
    } 
      
      ) */

    })
    
    .then(function(response) {
      
      console.log(response)
      
   //   return response.json();
    });
     input.setPage("home");
     alert("Posted as " + state.Title); //alerts user of post
  
     
 }

export default function AddToCapsule(input){

// uses state to created variables
    const [state, setState] = useState({
        fname: "",
        Title: "",
        Msg: "",
        City: "",
        State: "",
        Country: "",
      })

      const handleChange = e => {
        setState({
          ...state,
          [e.target.name]: e.target.value,
        })
      }
  
  //html of add page. Text input gets sent to state variables
    return(
        <div className="capsuleheader">
            <h1>Add To Capsule</h1>
      
          {/* <br/> */}
       
          Name (optional):
          <input
            type="text"
            name="fname"
            value={state.fname}
            onChange={handleChange}
          />
        
        <br/>
        
          Title:
          <input
            type="text"
            name="Title"
            value={state.Title}
            onChange={handleChange}
          />
    
        <br/>
       
          Message:
          <input
            type="text"
            name="Msg"
            value={state.Msg}
            onChange={handleChange}
          />
       
        <br/>
       
          City (optional):
          <input
            type="text"
            name="City"
            value={state.City}
            onChange={handleChange}
          />
       
        <br/>
       
          State (optional):
          <input
            type="text"
            name="State"
            value={state.State}
            onChange={handleChange}
          />
        
        <br/>
        
          Country (optional):
          <input
            type="text"
            name="Country"
            value={state.Country}
            onChange={handleChange}
          />
        
     
      <h5>
        Post: {state.fname} from {state.Country}, {state.State}, {state.City} says in {state.Title} the following, {state.Msg}
      </h5>

            <button className="button button1" onClick={() => submit(input, state)}>Submit</button>
            <button className="button button1" onClick={() => input.setPage('home')}>Go Back</button>
        </div>
    )
}