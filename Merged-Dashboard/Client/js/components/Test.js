import React from "react";
import { Link } from "react-router-dom";

class Test extends React.Component {

    componentDidMount(){

        $("button").click(function(){
            alert("HI!");
              });

    }
    
    render() {
        return (
            <div>
                <p>Welcome to the dashboard!</p>
                <p>This is the home page.</p>
                <button>Hi!</button>
            </div>
        )
    }
}

export default Test;