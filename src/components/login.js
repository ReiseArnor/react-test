import React, { useState } from 'react';
import { Redirect } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { useAuth } from '../hooks/use-auth';

export const Login = () => {
    const auth = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [ error, setError ] = useState("");
    const onSubmit = async (data) => {
        const response = await auth.signin(data.username, data.password);

        if(response.error) {
            setError(response.message);
            return;
        }
        setError(null);
        console.log(response);
    }

    return (
    <div className="columns column is-11">
        <form className="column" onSubmit={handleSubmit(onSubmit)}>
            <div className="field">
                <label className="label">Username</label>
                <div className="control">
                    <input className="input is-medium" {...register('username', { required: true })} />
                    {errors.username && <p className="help is-danger">Username is required.</p>}
                </div>
            </div>

            <div className="field">
                <label className="label">Password</label>
                <div className="control">
                    <input className="input is-medium" {...register('password', { required: true })} />
                    {errors.password && <p className="help is-danger">Password is required.</p>}
                </div>
            </div>
            
            <input className="input" type="submit" />

            { error && (
                <div className="notification is-danger is-light">
                    <button className="delete"></button>
                    <strong>ERROR: </strong>
                    {error}
                </div>
            )}
        </form>
    </div>
  );
};

export const Logout = () => {
    const auth = useAuth();
    auth.signout();
    return <Redirect to="/" />;
};