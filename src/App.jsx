import React, { Component } from 'react';
import MenuBar from "./menu_bar.jsx";
import { DailyCases } from "./nation_level.jsx";
import HomePage from "./home.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/stylesheet.css"


class App extends Component {

   render() {
      const divStyle = {
         paddingLeft: "10%",
         paddingRight: "10%"
      }

      return (
         <div style={divStyle} className="bg-dark">
            <MenuBar />
            <DailyCases />
            <HomePage />
         </div>
      );
   }
}

export default App;