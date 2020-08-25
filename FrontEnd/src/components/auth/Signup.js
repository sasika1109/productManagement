import React, { Component } from 'react'
import { AuthService } from '../../services/authService';
import { Link } from 'react-router-dom';

import './Signup.css';
import './Login.css';

export default class Signup extends Component {
    constructor(props) {
        super(props);
        this.authService = new AuthService();
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            address: '',
            password: '',
            confirmPassword: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {

        event.preventDefault();
        if (event) {

            if (this.state.password !== this.state.confirmPassword) {
                alert('Passwords do not match');
                return;
            }

            this.authService.signup(this.state)
                .then(result => {
                    console.log(result.data);
                    if (result.data.message) {
                        localStorage.setItem('token', result.data.token);
                        localStorage.setItem('user', JSON.stringify(result.data.user));

                        alert('Welcome to speraLab!');
                        this.props.history.push(`/login`);
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-6">
                            <form onSubmit={this.handleSubmit} className="form-login form-signup">
                                <div className="row">
                                    <div className="col-md-12">
                                        <h3>Sign Up</h3>
                                    </div>
                                    <div className="col-md-6">
                                        <input type="text" name="firstName" value={this.state.firstName} onChange={this.handleChange} placeholder="First Name"></input>
                                    </div>
                                    <div className="col-md-6">
                                        <input type="text" name="lastName" value={this.state.lastName} onChange={this.handleChange} placeholder="Last Name"></input>
                                    </div>
                                    <div className="col-md-12">
                                        <input type="email" name="email" value={this.state.email} onChange={this.handleChange} placeholder="Email"></input>
                                    </div>
                                    <div className="col-md-12">
                                        <input type="text" name="phone" value={this.state.phone} onChange={this.handleChange} placeholder="Mobile"></input>
                                    </div>
                                    <div className="col-md-12">
                                        <input type="text" name="address" value={this.state.address} onChange={this.handleChange} placeholder="Address"></input>
                                    </div>
                                    <div className="col-md-6">
                                        <input type="password" name="password" value={this.state.password} onChange={this.handleChange} placeholder="Password"></input>
                                    </div>
                                    <div className="col-md-6">
                                        <input type="password" name="confirmPassword" value={this.state.confirmPassword} onChange={this.handleChange} placeholder="Confirm Password"></input>
                                    </div>
                                    <div className="col-md-12">
                                        <button type="submit" className="button-login">SIGN UP</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="col-md-6 auth-col-right">
                            <h1>Spera Lab Products</h1>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae nulla porro ad beatae cupiditate culpa deleniti dolores reiciendis atque eaque? Inventore unde ullam iste tempore? Nobis natus nemo a eveniet.</p>
                            <Link to="/login">
                                <button type="submit" className="button-signup">LOGIN</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </React.Fragment >
        )
    }
}
