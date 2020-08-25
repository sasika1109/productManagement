import React, { Component } from 'react'
import { ProductService } from './../../services/ProductService';
import './Product.css';
import { Link } from 'react-router-dom';

export default class SingleProduct extends Component {

    constructor(props) {
        super(props);
        this.productsService = new ProductService();
        this.state = {
            _id: '',
            name: '',
            quantity: '',
            description: '',
            user_id: ''
        }
    }

    componentDidMount() {
        const ID = this.props.match.params.id;

        this.productsService.getProduct(ID)
            .then(result => {
                console.log(result.data.data.product);
                let product = result.data.data.product;

                this.setState({
                    _id: product._id,
                    name: product.name,
                    quantity: product.quantity,
                    description: product.description,
                    user_id: product.user_id
                });
            });
    }


    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="single-product-card">
                                <h2>View Product</h2>
                                <p className="small-font">Product Name: {this.state.name}</p>
                                <p className="small-font">Description: {this.state.description}</p>
                                <p className="small-font">Quantity: {this.state.quantity}</p>
                                <p className="small-font">Added by: {this.state.user_id.firstName} {this.state.user_id.lastName} </p>
                                <Link to="/products">
                                <button type="submit" className="button-go-back">GO BACK</button>
                                </Link>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
