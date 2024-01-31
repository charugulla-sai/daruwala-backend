import ProductModel from './product.model.js';

export default class ProductController {
  getAllProducts(req, res) {
    const products = ProductModel.get();
    res.send(products);
  }

  filterProducts(req, res) {
    const minValue = req.query.minValue;
    const maxValue = req.query.maxValue;
    const category = req.query.category;
    const result = ProductModel.filter(minValue, maxValue, category);
    res.send(result);
  }

  getOneProduct() {}

  // id, name, description, imageURL, category, price, sizes
  addProduct(req, res) {
    const product = {
      id: req.body.id,
      name: req.body.name,
      description: req.body.description,
      imageURL: req.body.imageURL,
      category: req.body.category,
      price: req.body.price,
      sizes: req.body.sizes,
    };

    try {
      const result = ProductModel.add(product);
      res.status(200).send(result);
    } catch (err) {
      res.status(400).send(err);
    }
  }

  rateProduct() {}
}
