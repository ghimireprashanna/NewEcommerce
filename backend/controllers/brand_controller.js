const Brand = require('../models/brand')

exports.getBrandById = async (req, res, next,id) => {
    try {
        const brand = await Brand.findById(id)
        if (!brand) {
            return res.status(400).json({error: 'No brand found'});
        }
        req.brand = brand;
        next();
    } catch (err) {
        return res.status(400).json({error: err?.message || 'No brand found'});
    }
}


exports.getBrand = (req, res) => {
    return res.json(req.brand);
}

exports.getAllBrands = async (req, res) => {
    try {
        const brands = await Brand.find()
        res.json(brands);
    } catch (err) {
        return res.status(400).json({error:err?.message || 'No brand found'});
    }
}

exports.createBrand = async (req, res) => {
    try {
        req.body.user = req.user._id;
        const brand = new Brand(req.body)
        const createdBrand = await brand.save()
        res.json({message: 'Brand craeted successfully', brand: createdBrand})

    } catch (err) {
        return res.status(400).json({error:err?.message || 'No brand found'});
    }
}

exports.updateBrand = async (req,res) => {
    try {
        const brand = req.brand
        brand.name = req.body.name;
        const updatedBrand = await brand.save()
        res.json({message: 'Brand updated successfully', brand: updatedBrand})
    } catch (err) {
        return res.status(403).json({error:err?.message || 'Failed to update brand'});
    }
}

exports.deleteBrand = async (req,res) => {
    try {
        const brand = req.brand
        await brand.deleteOne()
        
        res.json({message: 'Brand deleted successfully'})
    } catch (err) {
        return res.status(403).json({error:err?.message || 'Failed to delete brand'});
    }
}