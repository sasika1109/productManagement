import React, { Component } from 'react';
import { ProductService } from './../../services/ProductService';

import './../auth/Login.css';

export default class _EditCategory extends Component {
    constructor(props) {
        super(props);
        this.productsService = new ProductService();
        this.state = {
            _id: '',
            name: '',
            description: '',
            quantity: '',
            user_id: '',
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const ID = this.props.match.params.id;
        this.productsService.getProduct(ID)
            .then(result => {
                console.log(result);
                this.setState({
                    _id: result.data.data.product._id,
                    name: result.data.data.product.name,
                    description: result.data.data.product.description,
                    quantity: result.data.data.product.quantity,
                    user_id: result.data.data.product.user_id
                });
            })
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
            this.productsService.updateProduct(this.state, this.state._id)
                .then(result => {
                    if (result.data.status === 'success') {
                        this.props.history.push('/products');
                    };
                });
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="container">
                    <div className="row">
                        <div className="col-md-10">
                            <div className="category-form">
                                <form onSubmit={this.handleSubmit} className="form-login">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <h3 className="form-title">EDIT PRODUCT</h3>
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

                                        <div className="col-md-12 button-col">
                                            <button type="submit">SAVE</button>
                                            {/* <button type="button">CANCEL</button> */}
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
