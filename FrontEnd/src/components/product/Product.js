import React, { Component } from 'react';
import { ProductService } from '../../services/ProductService';
import './Product.css';
import { Link } from 'react-router-dom';

export default class Events extends Component {
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

    onEdit(ID) {
        this.props.history.push(`/product/edit/${ID}`);
    }

    onDelete(ID) {
        if (window.confirm('Are you sure..?')) {
            this.productsServices.deleteProduct(ID)
                .then(result => {
                    if (result.data.status === 'success') {
                        this.setState({
                            products: this.state.products.filter(product => product._id !== ID)
                        });
                    };
                })
        }
    }

    onLogout() {
        localStorage.removeItem("token");
        this.props.history.push(`/`);
    }

    render() {
        return (
            <React.Fragment>
                <div className="container-fluid">
                    <div className="row landing-page-all-products">
                        <div className="col-md-12">
                            <h2>All  Products</h2>
                            <button className="button-logout" onClick={() => this.onLogout()}>LOG OUT</button>
                            <Link to="/addProduct">
                                <button className="add-product-button">ADD PRODUCTS</button>
                            </Link>
                        </div>
                        {this.state.products.map(product => (
                            <div key={product._id} className="col-md-4">
                                <div className="landing-page-product-card">
                                    <p className="small-font">Product Name: {product.name}</p>
                                    <p className="small-font">Description: {product.description}</p>
                                    <p className="small-font">Quantity: {product.quantity}</p>
                                    <p className="small-font">Added by: {product.user_id.firstName} {product.user_id.lastName}</p>

                                    <button className="btn-products" onClick={() => this.onView(product._id)}>VIEW</button>
                                    <button className="btn-products" onClick={() => this.onEdit(product._id)}>EDIT</button>
                                    <button className="btn-products-delete" onClick={() => this.onDelete(product._id)}>DELETE</button>

                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
