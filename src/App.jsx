import React, { Component } from 'react';
import MenuBar from "./menu_bar.jsx";
import { DailyCases, StateWiseCases } from "./nation_level.jsx";
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
            <StateWiseCases />
         </div>
      );
   }
}

export default App;