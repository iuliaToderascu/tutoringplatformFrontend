import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import '../assets/SignUp.css'; // Import your custom CSS file

const url = 'http://localhost:7259/auth/register';

const SignUp = () => {
    const yupValidation = Yup.object().shape({
        email: Yup.string().required('Email is mandatory').email(),
        password: Yup.string()
            .required('Please create your password')
            .min(4, 'Add minimum 4 characters'),
        name: Yup.string().required('Name is mandatory'),
        lastname: Yup.string().required('Last name is mandatory'),
        educationLevel: Yup.string().when('accountType', {
            is: 'student',
            then: Yup.string().required('Education level is mandatory'),
            otherwise: Yup.string()
        }),
        specialization: Yup.string().when('accountType', {
            is: 'tutor',
            then: Yup.string().required('Specialization is mandatory'),
            otherwise: Yup.string()
        }),
        age: Yup.number().when('accountType', {
            is: 'student',
            then: Yup.number().required('Age is mandatory').positive().integer(),
            otherwise: Yup.number().notRequired()
        })
    });

    const formOptions = { resolver: yupResolver(yupValidation) };
    const { register, handleSubmit, formState: { errors } } = useForm(formOptions);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        lastname: '',
        educationLevel: '',
        specialization: '',
        age: '',
        accountType: 'student'
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async () => {
        try {
            const response = await axios.post(url, formData);
            console.log(response.data);
            navigate("/login");
        } catch (error) {
            console.log(error.response);
        }
    };

    return (
        <section className="signup-container">
            <section className="logincard">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h3>Sign Up</h3>
                    <div className="form-group">
                        <label>First name</label>
                        <input
                            type="text"
                            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                            placeholder="First name"
                            {...register('name')}
                            onChange={handleChange}
                        />
                        <div className="invalid-feedback">{errors.name?.message}</div>
                    </div>

                    <div className="form-group">
                        <label>Last name</label>
                        <input
                            type="text"
                            className={`form-control ${errors.lastname ? 'is-invalid' : ''}`}
                            placeholder="Last name"
                            {...register('lastname')}
                            onChange={handleChange}
                        />
                        <div className="invalid-feedback">{errors.lastname?.message}</div>
                    </div>

                    <div className="form-group">
                        <label>Email address</label>
                        <input
                            type="email"
                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                            placeholder="Enter email"
                            {...register('email')}
                            onChange={handleChange}
                        />
                        <div className="invalid-feedback">{errors.email?.message}</div>
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                            placeholder="Enter password"
                            {...register('password')}
                            onChange={handleChange}
                        />
                        <div className="invalid-feedback">{errors.password?.message}</div>
                    </div>

                    <div className="form-group">
                        <label>Account Type</label>
                        <select
                            className="form-control"
                            {...register('accountType')}
                            onChange={handleChange}
                        >
                            <option value="student">Student</option>
                            <option value="tutor">Tutor</option>
                        </select>
                    </div>

                    {formData.accountType === 'student' && (
                        <div className="form-group">
                            <label>Education Level</label>
                            <input
                                type="text"
                                className={`form-control ${errors.educationLevel ? 'is-invalid' : ''}`}
                                placeholder="Education level"
                                {...register('educationLevel')}
                                onChange={handleChange}
                            />
                            <div className="invalid-feedback">{errors.educationLevel?.message}</div>
                        </div>
                    )}

                    {formData.accountType === 'tutor' && (
                        <div className="form-group">
                            <label>Specialization</label>
                            <input
                                type="text"
                                className={`form-control ${errors.specialization ? 'is-invalid' : ''}`}
                                placeholder="Specialization"
                                {...register('specialization')}
                                onChange={handleChange}
                            />
                            <div className="invalid-feedback">{errors.specialization?.message}</div>
                        </div>
                    )}

                    {formData.accountType === 'student' && (
                        <div className="form-group">
                            <label>Age</label>
                            <input
                                type="number"
                                className={`form-control ${errors.age ? 'is-invalid' : ''}`}
                                placeholder="Age"
                                {...register('age')}
                                onChange={handleChange}
                            />
                            <div className="invalid-feedback">{errors.age?.message}</div>
                        </div>
                    )}

                    <div className="d-grid">
                        <button type="submit" className="btn btn-primary">Sign Up</button>
                    </div>

                    <p className="forgot-password text-right">
                        Already registered <a href="/login">sign in?</a>
                    </p>
                </form>
            </section>
        </section>
    )
}

export default SignUp;