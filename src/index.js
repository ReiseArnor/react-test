import React from 'react';
import ReactDOM from 'react-dom';
import { ProvideAuth } from './hooks/use-auth';
import { NavigationBar } from './components/navigation-bar';
import {
    BrowserRouter as Router,
    Switch
} from "react-router-dom";
import 'bulma/css/bulma.css';

export default function App() {
return (
    <div className="columns">
        <Switch>
            <NavigationBar />
        </Switch>
    </div>
    );
}

ReactDOM.render(
    <Router>
        <ProvideAuth>
            <App/>
        </ProvideAuth>
    </Router>, 
    document.getElementById('root'));