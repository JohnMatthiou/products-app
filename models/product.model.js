const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

let productSchema = new Schema({
    product: { 
        type: String,
        required: [true, 'product is required field'],
        max: 100
     },
    cost: { 
        type: Number,
        required: [true, 'cost is required field']
    },
    description: {
        type: String
    },
    quantity: { 
        type: Number,
         required: true 
        }    
},
{
    collection: 'products',
    timestamps: true
});

productSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Product', productSchema)