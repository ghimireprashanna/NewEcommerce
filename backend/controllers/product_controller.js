const Product = require('../models/product')

exports.getProductById = async (req, res, next, id) => {
    try {
        console.log("Fetching product with ID:", id); // Add this line
        const product = await Product.findById(id)
        if (!product) {
            return res.status(400).json({ error: 'No product found' });
        }
        req.product = product;
        next();
    } catch (err) {
        return res.status(400).json({ error: err?.message || 'No product found' });
    }
}


exports.getProduct = (req, res) => {
    return res.json(req.product);
}

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find()
        res.json(products);
    } catch (err) {
        return res.status(400).json({ error: err?.message || 'No product found' });
    }
}

exports.createProducts = async (req, res) => {
    try {
        req.body.user = req.user._id;
        const product = new Product(req.body)
        const createdProduct = await product.save()
        res.json({ message: 'Product craeted successfully', product: createdProduct })

    } catch (err) {
        return res.status(400).json({ error: err?.message || 'No product found' });
    }
}

exports.updateProduct = async (req, res) => {
    try {
        const product = req.product
        product.title = req.body.title;
        product.description = req.body.description;
        product.price = req.body.price;
        product.discounted_price = req.body.discounted_price;
        product.image = req.body.image;
        product.brand = req.body.brand;
        product.sizes = req.body.sizes;
        const updatedProduct = await product.save()
        res.json({ message: 'Product updated successfully', product: updatedProduct })
    } catch (err) {
        return res.status(403).json({ error: err?.message || 'Failed to update product' });
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        const product = req.product
        await product.deleteOne()

        res.json({ message: 'Product deleted successfully' })
    } catch (err) {
        return res.status(403).json({ error: err?.message || 'Failed to delete product' });
    }
}