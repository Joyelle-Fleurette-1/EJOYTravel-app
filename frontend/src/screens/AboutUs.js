import React from 'react';
import { Link } from 'react-router-dom';


export default function AboutUs(props) {
 
  return (
    <div  className="aboutus">
      <div className="col-1">
        <div>
          <h2>
            Welcome. We are are happy you chose us.
          </h2>
          <h2>
            We help you make your reservation at hotel of your choice from anywhere in Burundi and you will pay on your arrival at the hotel
          </h2>
          
          <li>Call us on: + 25776488709</li> or
          <li>Email us on: abc@df.com</li>
          <Link to="/"> Go back to the <b>Home Page</b></Link>
        </div>
       </div> 
    </div>
  );
}