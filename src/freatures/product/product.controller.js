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

  addProduct() {}

  rateProduct() {}
}
