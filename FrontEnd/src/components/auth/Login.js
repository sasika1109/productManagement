import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { AuthService } from '../../services/authService';
import './Login.css';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.authService = new AuthService();
        this.state = {
            email: '',
            password: '',
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
            this.authService.login(this.state)
                .then(result => {
                    if (result.data.message) {
                        localStorage.setItem('token', result.data.token);
                        localStorage.setItem('user', JSON.stringify(result.data.user));
                        alert('Welcome back!');
                        this.props.history.push(`/products`);
                        window.location.reload(true);
                    }
                })
                .catch(error => {
                    console.log(error);
                    alert(error);
                })
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-6">
                            <form onSubmit={this.handleSubmit} className="form-login">
                                <h3>Sign In</h3>
                                <div className="row row-login-form">
                                    <div className="col-md-12">
                                        <input type="text" name="email" value={this.state.email} onChange={this.handleChange} placeholder="Email"></input>
                                    </div>
                                    <div className="col-md-12">
                                        <input type="password" name="password" value={this.state.password} onChange={this.handleChange} placeholder="Password"></input>
                                    </div>
                                    <div className="col-md-12">
                                        <p>Forgot your password?</p>
                                        <a href="">
                                            <button type="submit" className="button-login">LOG IN</button>
                                        </a>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="col-md-6 auth-col-right">
                            <h1>Spera Lab Products</h1>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae nulla porro ad beatae cupiditate culpa deleniti dolores reiciendis atque eaque? Inventore unde ullam iste tempore? Nobis natus nemo a eveniet.</p>
                            <Link to="/signup">
                                <button type="submit" className="button-signup">SIGN UP</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
