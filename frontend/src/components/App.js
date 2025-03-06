import React, { Component } from "react";
import { render } from "react-dom";
import { createRoot } from "react-dom/client"
import HomePage from "./HomePage";
import Map from "./BackgroundMap"

export default class App extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div>
                <HomePage />
            </div>
        )
    }
}

const appDiv = document.getElementById("app");
const mapDiv = document.getElementById("map");
const rootApp = createRoot(appDiv);
rootApp.render(<App />);
