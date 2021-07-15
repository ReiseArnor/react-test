import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../hooks/use-auth';

export const Signup = () => {
    const auth = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const onSubmit = async (data) => {
        if (data.password !== data.password_v) {
            setError("Passwords need to be the same!")
            return;
        }

        const response = await auth.signup(
            data.username,
            data.email,
            data.password
        );

        if(response.error) {
            setError(response.message);
            return;
        }
        setError(null);
        setSuccess(response.data.message);
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
                <label className="label">Email</label>
                <div className="control">
                    <input className="input is-medium" {...register('email', { required: true })} />
                    {errors.email && <p className="help is-danger">Email is required.</p>}
                </div>
            </div>

            <div className="field">
                <label className="label">Password</label>
                <div className="control">
                    <input className="input is-medium" {...register('password', { required: true })} />
                    {errors.password && <p className="help is-danger">Password is required.</p>}
                </div>
            </div>

            <div className="field">
                <label className="label">Verify Password</label>
                <div className="control">
                    <input className="input is-medium" {...register('password_v', { required: true })} />
                    {errors.password_v && <p className="help is-danger">Passwords verification is required.</p>}
                </div>
            </div>
            
            <input className="input" type="submit" />

            { success && (
                <div className="notification is-success is-light">
                    {success}
                </div>
            )}

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