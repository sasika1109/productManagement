import React, { Component } from 'react';
import { ProductService } from './../../services/ProductService';

import './../auth/Login.css';

export default class _AddCategory extends Component {

    categoriesService;

    constructor(props) {
        super(props);
        this.productsService = new ProductService();
        this.state = {
            name: '',
            description: '',
            quantity: '',
            user_id: '',
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
            this.productsService.addProduct(this.state)
                .then(result => {
                    if (result.data.status === 'success') {
                        this.props.history.push('/products');
                    };
                })
        }
    }

    componentDidMount() {
        const userString = localStorage.getItem('user');
        const user = JSON.parse(userString);

        this.setState({
            user_id: user._id
        });
    }

    render() {
        return (
            <React.Fragment>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="category-form">
                                <form onSubmit={this.handleSubmit} className="form-login">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <h3 className="form-title">ADD PRODUCT</h3>
                                        </div>
                                        <div className="col-md-12">
                                            <input type="text" name="name" value={this.state.name} onChange={this.handleChange} placeholder="Name" />
                                        </div>
                                        <div className="col-md-12">
                                            <input type="text" name="description" value={this.state.description} onChange={this.handleChange} placeholder="Description" />
                                        </div>
                                        <div className="col-md-12">
                                            <input type="text" name="quantity" value={this.state.quantity} onChange={this.handleChange} placeholder="Quantity" />
                                        </div>
                                        <div className="col-md-12">
                                            <input type="hidden" name="user_id" value={this.state.user_id} />
                                        </div>

                                        <div className="col-md-12 button-col">
                                            <button type="submit">SAVE</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment >
        )
    }
}