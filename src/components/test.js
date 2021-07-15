import React, { useState } from 'react';
import {
    Switch,
    Route,
    useRouteMatch
} from "react-router-dom";
import { useAuth } from '../hooks/use-auth';
import { SingleTest } from './single-test';
import { Pagination } from './pagination';
import { axios } from '../config/api';


export const Test = (props) => {
    const { user } = useAuth();
    const match = useRouteMatch();

    return (
        <div className="columns column is-12">

            <div className="column is-8">
                <Switch>
                    <Route path={`${match.path}/list`} children={<Pagination match={match} />} />
                    <Route path={`${match.path}/:testId`} children={<SingleTest />} />
                </Switch>
            </div>

            { user &&
            <div className="column is-4">
                <UploadTest />
                { user.roles.includes("ROLE_MODERATOR") && <ChangeTest /> }
                { user.roles.includes("ROLE_ADMIN") && <DeleteTest /> }
            </div>
            }
        </div>
    );
};


const UploadTest = () => {
    const { headers, refreshToken, signout } = useAuth(); 

    const [text, setText] = useState("");
    const handleTextChange = ({target}) => {
        setText(target.value);
    };
    const [error, setError] = useState(null);
    const handleUploadClick = async () => {
        try {
            await axios.post('/create-test', { text: text }, { headers: headers() });
            setText("");
            setError(null);
        } catch (err) {
            const { response } = err;

            if (response.status === 401) { // accessToken expired!
                const err = await refreshToken();

                if(err) {
                    let time = 5;
                    const intvl = setInterval(() => {
                        setError(`${err.message}. Signing out... ${time}`);

                        if (time <= 0) {
                            clearInterval(intvl);
                            signout();
                            return;
                        }
                        --time;
                    }, 1000);
                } else {
                    setError(response.data.message + " Try again!");
                }
            } else {
                setError(response.data.message);
            }
        }
    };

    return (
        <div className="box">
            <input value={text} onChange={handleTextChange} type="text" className="input" />
            { error && (
            <div className="notification is-danger is-light">
                <strong>ERROR: </strong>
                {error}
            </div>
            )}
            <button onClick={handleUploadClick} className="button is-primary">Upload</button>
        </div>
    );
};


const ChangeTest = () => {
    const { headers, refreshToken, signout } = useAuth(); 

    const [changeItem, setChangeItem] = useState({id: "", text: ""});
    const handleChangeItemId = ({target}) => { 
        setChangeItem({...changeItem, id: target.value});
    };
    const handleChangeItemText = ({target}) => {
        setChangeItem({...changeItem, text: target.value});
    };
    const [error, setError] = useState(null);
    const handleUpdateItemClick = async () => {
        try {
            await axios.put('/update-test', changeItem, { headers: headers() });
            setChangeItem({ id: "", text: ""});
            setError(null);
        } catch (err) {
            const { response } = err;

            if (response.status === 401) { // accessToken expired!
                const err = await refreshToken();

                if(err) {
                    let time = 5;
                    const intvl = setInterval(() => {
                        setError(`${err.message}. Signing out... ${time}`);

                        if (time <= 0) {
                            clearInterval(intvl);
                            signout();
                            return;
                        }
                        --time;
                    }, 1000);
                } else {
                    setError(response.data.message + " Try again!");
                }
            } else {
                setError(response.data.message);
            }
        }
    }

    return (
        <div className="box">
            <input value={changeItem.id} onChange={handleChangeItemId} type="text" className="input" />
            <input value={changeItem.text} onChange={handleChangeItemText} type="text" className="input" />
            { error && (
            <div className="notification is-danger is-light">
                <strong>ERROR: </strong>
                {error}
            </div>
            )}
            <button onClick={handleUpdateItemClick} className="button is-warning">Update Item</button>
        </div>
    );
};


const DeleteTest = () => {
    const { headers, refreshToken, signout } = useAuth();

    const [deleteId, setDeleteId] = useState("");
    const handleDeleteIdChange = ({target}) => {
        setDeleteId(target.value);
    };
    const [error, setError] = useState(null);
    const handleDeleteItemClick = async () => {
        try {
            await axios.delete('/delete-test',{ data: {id: deleteId}, headers: headers() });
            setDeleteId("");
            setError(null);
        } catch (err) {
            const { response } = err;

            if (response.status === 401) { // accessToken expired!
                const err = await refreshToken();

                if(err) {
                    let time = 5;
                    const intvl = setInterval(() => {
                        setError(`${err.message}. Signing out... ${time}`);

                        if (time <= 0) {
                            clearInterval(intvl);
                            signout();
                            return;
                        }
                        --time;
                    }, 1000);
                } else {
                    setError(response.data.message + " Try again!");
                }
            } else {
                setError(response.data.message);
            }
        }
    };

    return (
        <div className="box">
            <input value={deleteId} onChange={handleDeleteIdChange} type="text" className="input" />
            { error && (
            <div className="notification is-danger is-light">
                <strong>ERROR: </strong>
                {error}
            </div>
            )}
            <button onClick={handleDeleteItemClick} className="button is-danger">Delete Item</button>
        </div>
    );
};