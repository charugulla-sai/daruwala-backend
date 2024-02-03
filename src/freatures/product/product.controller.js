import ProductModel from './product.model.js';
import ProductRepository from './product.repository.js';

export default class ProductController {
  async getAllProducts(req, res) {
    const productRepository = new ProductRepository();
    const products = await productRepository.getAll();
    res.status(200).send(products);
  }

  filterProducts(req, res) {
    const minValue = req.query.minValue;
    const maxValue = req.query.maxValue;
    const category = req.query.category;
    const result = ProductModel.filter(minValue, maxValue, category);
    res.send(result);
  }

  async addProduct(req, res) {
    const productRepository = new ProductRepository();
    const { title, description, imageURL, category, price, sizes } = req.body;
    const newProduct = new ProductModel(
      title,
      description,
      imageURL,
      category,
      price,
      sizes
    );
    const result = await productRepository.add(newProduct);
    if (!result) {
      return res.status(400).send('Adding product unsucessful');
    }
    return res.status(201).send({
      product: newProduct,
      productId: result.insertedId,
      message: 'Product added successfully',
    });
  }

  // userId, productId, rating
  rateProduct(req, res) {
    const { userId, productId, rating } = req.query;
    // below rateProduct function will return something only if there is some error.
    const error = ProductModel.rateProduct(userId, productId, rating);
    if (error) {
      res.status(400).send(error);
    } else {
      res.status(200).send('Rated successfully');
    }
  }

  async getOneProduct(req, res) {
    const productId = req.params.id;
    const productRepository = new ProductRepository();
    const product = await productRepository.get(productId);
    if (!product) {
      return res.status(404).send({ error: 'Product not found.' });
    }
    return res.status(200).send(product);
  }
}
