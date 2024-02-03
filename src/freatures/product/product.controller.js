import ProductModel from './product.model.js';
import ProductRepository from './product.repository.js';

export default class ProductController {
  async getAllProducts(req, res) {
    const productRepository = new ProductRepository();
    const products = await productRepository.getAll();
    res.status(200).send(products);
  }

  async filterProducts(req, res) {
    const { minValue, maxValue, category } = req.query;
    const productRepository = new ProductRepository();
    const products = await productRepository.filter(
      minValue,
      maxValue,
      category
    );
    res.status(200).send(products);
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

  async rateProduct(req, res) {
    const productId = req.params.id;
    const productRating = req.query.rating;
    const userId = res.locals.tokenPayload.id;
    const productRepository = new ProductRepository();
    const result = await productRepository.rateProduct(productId, userId, productRating);
    if (!result) {
      return res.status(400).send('error occured');
    }
    return res.status(200).send(result);
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
