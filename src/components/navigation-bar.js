import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../hooks/use-auth';
import { Route, Redirect } from "react-router-dom";
import { Test } from './test';
import { Login, Logout } from './login';
import { Signup } from './signup';
import { PrivateRoute } from './private-route';
import { Profile } from './profile';

export const NavigationBar = () => {
    const auth = useAuth();

    const [isMobileNavbar, setIsMobileNavbar] = useState("");
    const movileNavbar = () => {
        if(!isMobileNavbar[0]) {
            setIsMobileNavbar(" is-active");
        } else {
            setIsMobileNavbar("");
        }
    };

    return (
        <div className="column is-desktop">
            <nav className="navbar column is-mobile is-desktop" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <a onClick={movileNavbar} href="#mobilebar" role="button" className={`navbar-burger${isMobileNavbar}`} aria-label="menu" aria-expanded="false" data-target="navbar">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>

                <div id="navbar" className={`navbar-menu${isMobileNavbar}`}>
                    <div className="navbar-start">
                        <div className="navbar-item has-dropdown is-hoverable">
                            <a href="#navigationbar" id="navigationbar" className="navbar-link" >
                                Test
                            </a>
                            <div className="navbar-dropdown">
                                <Link to="/" className="navbar-item">Home</Link>
                                <Link to="/about" className="navbar-item">About</Link>
                                <Link to={{ pathname: '/tests/list',
                                            search: '?page=1' }} className="navbar-item">Tests</Link>
                                {
                                    auth.user ? (
                                    <div>
                                        <Link to="/profile" className="navbar-item">Profile</Link>
                                        <Link to="/logout" className="navbar-item">Logout</Link>
                                    </div>
                                    ) : (
                                    <div>
                                        <Link to="/login" className="navbar-item">Log in</Link>
                                        <Link to="/signup" className="navbar-item">Sign Up</Link>
                                    </div>
                                    )
                                }
                                <hr className="navbar-divider" />
                                <div className="navbar-item">
                                    Version 0.9.3
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <Route path="/about">
                <About />
            </Route>

            <Route path="/tests">
                <Test />
            </Route>
        
            <Route path="/login">
            {auth.user ? <Redirect to="/"/> : <Login />}
            </Route>

            <Route path="/signup">
            {auth.user ? <Redirect to="/"/> : <Signup />}
            </Route>
                
            <PrivateRoute path="/profile">
                <Profile />
            </PrivateRoute>

            <PrivateRoute path="/logout">
                <Logout />
            </PrivateRoute>
            
            <Route exact path="/">
                <Users />
            </Route>
        </div>
    );
};


function About() {
    return <h2>About</h2>;
}

function Users() {
    return <h2>Users</h2>;
}