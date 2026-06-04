const express = require('express');
const multer = require('multer');
const fs = require('fs/promises');
const path = require('path');
const Product = require('../models/Product');
const Category = require('../models/Category');
const { protect } = require('../middleware/authMiddleware');
const { uploadsDir } = require('../storagePaths');
const router = express.Router();

// Multer config for image uploads
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, uploadsDir);
  },
  filename(req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    const filetypes = /jpg|jpeg|png|webp/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb('Images only!');
    }
  },
});

const deleteImageFile = async (imagePath) => {
  if (!imagePath || typeof imagePath !== 'string') {
    return;
  }

  const normalizedPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
  const absolutePath = path.join(__dirname, '..', normalizedPath);

  try {
    await fs.unlink(absolutePath);
  } catch (error) {
    if (error.code !== 'ENOENT') {
      throw error;
    }
  }
};

// @desc    Upload product images (multiple)
// @route   POST /api/products/upload
// @access  Private
router.post('/upload', protect, upload.array('images', 5), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).send('No image uploaded');
  }
  const imagePaths = req.files.map(file => `/${file.path.replace(/\\/g, '/')}`);
  res.json({ imagePaths });
});

// @desc    Get all products
// @route   GET /api/products
// @access  Public
router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [{ model: Category, as: 'category' }]
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [{ model: Category, as: 'category' }]
    });
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const images = Array.isArray(req.body.images) ? req.body.images.filter(Boolean) : [];
    if (images.length === 0) {
      return res.status(400).json({ message: 'At least one product image is required' });
    }

    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private
router.put('/:id', protect, async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (product) {
      const removedImages = Array.isArray(req.body.removedImages) ? req.body.removedImages.filter(Boolean) : [];
      const nextImages = Array.isArray(req.body.images) ? req.body.images.filter(Boolean) : [];
      if (nextImages.length === 0) {
        return res.status(400).json({ message: 'At least one product image is required' });
      }

      for (const imagePath of removedImages) {
        await deleteImageFile(imagePath);
      }

      const updatePayload = {
        ...req.body,
        images: nextImages,
      };
      delete updatePayload.removedImages;

      await product.update(updatePayload);
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (product) {
      const productImages = Array.isArray(product.images) ? product.images : [];
      for (const imagePath of productImages) {
        await deleteImageFile(imagePath);
      }
      await product.destroy();
      res.json({ message: 'Product removed' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
