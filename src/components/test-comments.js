import { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { axios } from '../config/api';
import { useAuth } from "../hooks/use-auth";

export const TestComments = (props) => {
    const test_id = props.test_id;

    const [comments, setComments] = useState([]);
    useEffect(() => {
        getComments();
        // eslint-disable-next-line
    }, []);
    
    const getComments = async () => {
        try {
            const res = await axios.get(`/get-comments/${test_id}`);
            setComments(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h1 className="title">Test Comments</h1>
            <NewComment test_id={test_id} getComments={getComments} />
            <div className="box">
                {
                comments.map((item, index) =>
                    <article className="message" key={index}>
                        <div className="message-header">
                            <p>Comment {item.id}</p>
                            <DeleteComment id={item.id} test_id={test_id} getComments={getComments} />
                        </div>
                        <div className="message-body">
                            {item.comment}
                        </div>
                    </article>
                    )
                }
            </div>
        </div>
    );
};

TestComments.propTypes = {
    test_id: PropTypes.string.isRequired
};


const NewComment = (props) => {
    const { headers, refreshToken, signout } = useAuth();
    const { test_id, getComments } = props;

    const [newComment, setNewComment] = useState("");
    const handleNewCommentChange = ({ target }) => {
        setNewComment(target.value);
    };
    const [error, setError] = useState(null);
    const handleUploadComment = async () => {
        try {
            await axios.post(
                '/create-comment',
                { test_id: test_id, comment: newComment },
                { headers: headers() }
            );
            setNewComment("");
            getComments();
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
            <input className="input" onChange={handleNewCommentChange} value={newComment}/>
            { error && (
            <div className="notification is-danger is-light">
                <strong>ERROR: </strong>
                {error}
            </div>
            )}
            <button className="button" onClick={handleUploadComment}>Upload Comment</button>
        </div>
    );
};

NewComment.propTypes = {
    test_id: PropTypes.string.isRequired,
    getComments: PropTypes.func.isRequired
};


const DeleteComment = (props) => {
    const { headers, refreshToken, signout } = useAuth();
    const { id, test_id, getComments } = props;

    const [error, setError] = useState(null);
    const handleDeleteComment = async () => {
        try {
            await axios.delete(
                '/delete-comment',
                {
                    data: {id: id, test_id: test_id},
                    headers: headers()
                }
            );
            getComments();
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
                            setError(null);
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
        <div>
            <button className="delete" onClick={handleDeleteComment} aria-label="delete"></button>
            { error && (
            <div className="notification is-danger is-light">
                <strong>ERROR: </strong>
                {error}
            </div>
            )}
        </div>
    );
};

DeleteComment.propTypes = {
    id: PropTypes.number.isRequired,
    test_id: PropTypes.string.isRequired,
    getComments: PropTypes.func.isRequired
};