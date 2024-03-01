import ProductModel from './product.model.js';
import ProductRepository from './product.repository.js';

const productRepository = new ProductRepository();

export default class ProductController {
  async addProduct(req, res) {
    const { title, description, imageUrl, category, price, stock } = req.body;
    const newProduct = new ProductModel(
      title,
      description,
      imageUrl,
      category,
      price,
      stock
    );
    try {
      const addedProduct = await productRepository.add(newProduct);
      return res.status(201).send({
        product: addedProduct,
        productId: addedProduct._id,
        message: 'Product added successfully',
      });
    } catch (err) {
      res.status(400).send(err.message);
    }
  }

  async getAllProducts(req, res) {
    const products = await productRepository.getAll();
    res.status(200).send(products);
  }

  async getOneProduct(req, res) {
    const productId = req.params.id;
    try {
      const product = await productRepository.get(productId);
      return res.status(200).send(product);
    } catch (err) {
      res.status(404).send({
        error: err.message,
        message: 'Product Not found.',
      });
    }
  }

  async filterProducts(req, res) {
    const { minValue, maxValue, category } = req.query;
    try {
      const products = await productRepository.filter(
        minValue,
        maxValue,
        category
      );
      res.status(200).send(products);
    } catch (err) {
      res.status(200).send(err.message);
    }
  }

  async rateProduct(req, res) {
    try {
      const { productId, rating, review } = req.body;
      const userId = res.locals.tokenPayload.id;
      const result = await productRepository.rateProduct(
        productId,
        userId,
        rating,
        review
      );
      return res.status(200).send(result);
    } catch (err) {
      console.log(err.message);
      res.status(400).send(err.message);
    }
  }
}
