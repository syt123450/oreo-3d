import React, { Component } from 'react';
import './assets/font/zcool.css';
import './assets/font/material-icons.css';
import './App.css';
import './assets/react-toolbox/theme.css';
import theme from './assets/react-toolbox/theme.js';
import ThemeProvider from 'react-toolbox/lib/ThemeProvider';
import Scene from './component/Scene';
import Exporter from './component/Exporter';
import Order from './component/Order';
import { Localization } from "./component/Localization";
import GithubCorner from 'react-github-corner';

class App extends Component {

    constructor(props) {
        super(props);
        this.scene = React.createRef();
        this.exporter = React.createRef();
        this.order = React.createRef();
		this.refreshComponents = [];
    }

	componentDidMount(){
        this.refreshComponents.push(this.exporter);
        this.refreshComponents.push(this.order);
	}

    render() {
        return (
            <ThemeProvider theme={theme}>
                <div className="App">
                    <GithubCorner href="https://github.com/syt123450/oreo-3d"
                            size={100}
                            bannerColor={"#FC4482"}/>
                    <Localization refreshComponents={this.refreshComponents}/>
                    <Exporter ref={this.exporter} scene={this.scene}/>
                    <Order ref={this.order} scene={this.scene} />
                    <Scene ref={this.scene}/>
                </div>
            </ThemeProvider>
        );
    }
}

export default App;
