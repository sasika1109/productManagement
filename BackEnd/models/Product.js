const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A Product must have a  name']
    },
    description: {
        type: String,
        required: [true, 'A product must have a description']
    },
    quantity: {
        type: String,
        required: [true, 'A user must have quantity']
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
    },
   
});

module.exports = mongoose.model('Product', productSchema);