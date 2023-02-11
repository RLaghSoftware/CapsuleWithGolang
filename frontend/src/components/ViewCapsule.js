import React, { useState } from "react";
import axios from 'axios'; //used to "get" from database




export default function ViewCapsule(input){

//creates state to store variables
      const [state, setState] = useState({ 
           fname:'',
           Title:'',
            City:'',
            State:'',
            Country:'',
            Msg:'',
            Time:'',
            EndTime:'',
           users: [],
         });


         
         const handleChange = e => {
            setState({
              ...state,
              [e.target.name]: e.target.value,
            })
          }

    let [inSearch, setSearch] = React.useState(false); //orignally, system is not searching for query, and user inputs filters
 

    function search(){ //if filters are added, system uses axios.get to send parameters to the backend, logs results, and displays data
        console.log(state.Time);
        console.log(state.EndTime);
        axios.get('/users/'+ state.fname + '/' + state.Time + '/' + state.EndTime + '/'+ state.Country + '/'+ state.City + '/'+ state.State + '/'+ state.Title + '/'+ state.Msg + '/'+ 'View') 
        .then((response) => {
          const data = response.data.data;
          setState({ users: data }); 
          console.log('Data has been received!!');
          console.log(response);
          console.log(response.data);
    
        })  
        .catch(() => {
          console.log('Error retrieving data!!!');
        });
        
        setSearch(true)
    }

    function displayUsers (users) {

        if (!users.length) return null;
      
//html of a formatted map showcasing retrieved data users.Name, users.City, users.State, users.Country, users.Title, users.Message, users.created_at
      
        return users.map((users, index) => (
          <div key={index} className="test">
            <p> <font size="3">  From {users.City}, {users.State}, {users.Country}</font></p>
            <p>**************************************</p>
            <h3>{users.Title} by {users.Name}</h3> 
            <p>Message: {users.Message}</p>
            <p>**************************************</p>
            <p><font size="3"> <b>Posted on: {((users.created_at).replace("T", " at ")).replace(".000Z","-")} UTC</b></font> </p>
            <p>________________________________________________________________________________________________________________________________________________________________________________________________</p>
            
           
          </div>
        ));
      };
    

    if(inSearch){


   return(
       //header section for results
       <div className="blog-">
           <h1>Results:</h1>
         {displayUsers(state.users)}
         <button className="button button1" onClick={() => input.setPage('home')}>Go Back</button>
       </div>
     
    );
    }
 

        
       

    
    else{
        return(
            // html of search page, what the user first sees. Text input is sent to state variables
            <div className="viewcap" >
                <h1>Enter Capsule</h1>
          
                Enter Local Start Time: <input
                    type="datetime-local"
                    name="Time"
                    value={state.Time}
                    onChange={handleChange}
                />
                <br/>
                Enter Local End Time: <input
                    type="datetime-local"
                    name="EndTime"
                    value={state.EndTime}
                    onChange={handleChange}
                />
                <br/>
                Enter  Name:
                <input
                    type="text"
                    name="fname"
                    value={state.fname}
                    onChange={handleChange}
                />
                <br/>
                Enter Country: <input
                    type="text"
                    name="Country"
                    value={state.Country}
                    onChange={handleChange}
                />
                <br/>
                Enter State: <input
                    type="text"
                    name="State"
                    value={state.State}
                    onChange={handleChange}
                />
                <br/>
                Enter City: <input
                    type="text"
                    name="City"
                    value={state.City}
                    onChange={handleChange}
                />
                <br/>
                Enter Title: <input
                    type="text"
                    name="Title"
                    value={state.Title}
                    onChange={handleChange}
                />
                <br/>
                Enter Quotes from message: <input
                    type="text"
                    name="Msg"
                    value={state.Msg}
                    onChange={handleChange}
                />
                <br/>
                <button className="button button1" onClick={() => search()}>Search</button>
                <button className="button button1" onClick={() => input.setPage('home')}>Go Back</button>
            </div>
        )
    }
}

