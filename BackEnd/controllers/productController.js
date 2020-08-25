const Product = require('./../models/Product');

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().populate([
            { path: 'user_id', model: 'User' }
        ]);

        res.status(200).json({
            status: 'success',
            data: {
                products
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'failed',
            message: 'products could not be loaded'
        });
    }
}

exports.getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate([
            { path: 'user_id', model: 'User' }
        ]);
        res.status(200).json({
            status: 'success',
            data: {
                product
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'failed',
            message: 'Products could not be found'
        });
    }
}

exports.createProduct = async (req, res) => {
    try {
        const newProduct = new Product(req.body);

        await newProduct.save();

        res.status(201).json({
            status: 'success',
            data: {
                newProduct
            }
        });

    } catch (err) {
        console.log(err);

        res.status(400).json({
            status: 'failed',
            message: 'product could not be created'
        });
    }
}

exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            runValidators: true,
            new: true
        });

        res.status(200).json({
            status: 'success',
            data: {
                updateProduct: product
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'failed',
            message: 'product could not be updated'
        })
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);

        res.status(200).json({
            status: 'success',
            data: null
        });
    } catch (err) {
        res.status(400).json({
            status: 'failed',
            message: 'Product could not be deleted'
        })
    }
}