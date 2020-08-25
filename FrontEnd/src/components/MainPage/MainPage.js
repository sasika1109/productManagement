import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { ProductService } from '../../services/ProductService';
import './MainPage.css';

export default class MainPage extends Component {

    constructor(props) {
        super(props);
        this.productsServices = new ProductService();
        this.state = {
            products: [],
            userName: '',
        }
    }

    componentDidMount() {
        this.productsServices.getproducts()
            .then(result => {
                console.log(result.data.data.products)
                this.setState({
                    products: result.data.data.products,
                });
            });
    }

    onView(ID) {
        this.props.history.push(`/product/view/${ID}`);
    }
    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <Link to="/login">
                                <button className="auth-buttons" type="button">LOGIN</button>
                            </Link>
                            <Link to="/signup">
                                <button className="auth-buttons" type="button">SIGNUP</button>
                            </Link>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <h3 className="title-main-page">Products</h3>
                        </div>
                        {this.state.products.map(product => (
                            <div key={product._id} className="col-md-4 main-page-product-col">
                                <div className="main-page-product-card">
                                    <p className="small-font">Product Name: {product.name}</p>
                                    <p className="small-font">Description: {product.description}</p>
                                    <p className="small-font">Added by: {product.user_id.firstName} {product.user_id.lastName}</p>
                                    <button className="btn-products" onClick={() => this.onView(product._id)}>VIEW</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}
