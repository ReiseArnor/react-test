import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { TestComments } from './test-comments';
import { axios } from '../config/api';


export const SingleTest = (props) => {
    const { testId } = useParams();

    const [ value, setValue] = useState("");
    useEffect( () => {
        getTest();
        // eslint-disable-next-line
    }, [])

    const getTest = async () => {
        try {
            const res = await axios.get(`/test/${testId}`);
            setValue(res.data.value);
        } catch (err) {
            console.error(err);
        }; 
    };

    return  (
        <div className="content">
            <div className="box">
                <h1 className="title">Value is:</h1>
                <p>{value}</p>
            </div>
            <div>
                <TestComments test_id={testId}/>
            </div>
        </div>
    );
};