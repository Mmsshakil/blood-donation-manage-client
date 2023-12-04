import React from 'react';
import { useForm, Controller } from 'react-hook-form';

const YourFormComponent = () => {
    const { control, handleSubmit, watch } = useForm();

    const password = watch('password', ''); // Watch the 'password' input
    const confirmPassword = watch('confirmPassword', ''); // Watch the 'confirmPassword' input

    const onSubmit = (data) => {
        // Your form submission logic here
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {/* Other form fields */}
            <label>Password:</label>
            <Controller
                name="password"
                control={control}
                render={({ field }) =>
                    <input {...field} type="password" />
                }
            />

            <label>Confirm Password:</label>
            <Controller
                name="confirmPassword"
                control={control}
                render={({ field }) =>
                    <input {...field} type="password" />
                }
            />

            {password !== confirmPassword && (
                <p style={{ color: 'red' }}>Passwords do not match</p>
            )}

            <button type="submit">Submit</button>
        </form>
    );
};

export default YourFormComponent;
