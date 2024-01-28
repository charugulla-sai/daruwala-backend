export default class ProductModel {
  constructor(id, name, description, imageURL, category, price, sizes) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.imageURL = imageURL;
    this.category = category;
    this.price = price;
    this.sizes = sizes;
  }
  static get() {
    return products;
  }

  static filter(minValue, maxValue, category) {
    const filteredProducts = products.filter((product) => {
      return (
        product.price >= (minValue || 0) &&
        (!maxValue || product.price <= maxValue) &&
        (!category || product.category === category)
      );
    });
    return filteredProducts;
  }
}

var products = [
  new ProductModel(
    1,
    'Laptop',
    'Powerful laptop with high-speed processor and ample storage',
    'https://example.com/laptop.jpg',
    'Electronics',
    999.99,
    ['Small', 'Medium', 'Large']
  ),
  new ProductModel(
    2,
    'Smartphone',
    'Feature-packed smartphone with a stunning display',
    'https://example.com/smartphone.jpg',
    'Electronics',
    599.99,
    ['32GB', '64GB', '128GB']
  ),
  new ProductModel(
    3,
    'Running Shoes',
    'Comfortable running shoes with advanced cushioning',
    'https://example.com/runningshoes.jpg',
    'Fashion',
    79.99,
    ['US 7', 'US 8', 'US 9']
  ),
  new ProductModel(
    4,
    'Coffee Maker',
    'Automatic coffee maker for brewing your favorite beverages',
    'https://example.com/coffeemaker.jpg',
    'Home & Kitchen',
    129.99,
    ['Standard']
  ),
  new ProductModel(
    5,
    'Bluetooth Headphones',
    'Wireless headphones with noise-canceling technology',
    'https://example.com/headphones.jpg',
    'Electronics',
    149.99,
    ['One Size']
  ),
  new ProductModel(
    6,
    'Backpack',
    'Durable backpack with multiple compartments for organized storage',
    'https://example.com/backpack.jpg',
    'Fashion',
    49.99,
    ['Medium']
  ),
  new ProductModel(
    7,
    'Fitness Tracker',
    'Track your fitness activities with this advanced fitness tracker',
    'https://example.com/fitnesstracker.jpg',
    'Electronics',
    89.99,
    ['Small', 'Large']
  ),
  new ProductModel(
    8,
    'Cookware Set',
    'Premium cookware set for your kitchen needs',
    'https://example.com/cookwareset.jpg',
    'Home & Kitchen',
    199.99,
    ['Standard']
  ),
  new ProductModel(
    9,
    'Graphic T-Shirt',
    'Stylish graphic t-shirt made from comfortable fabric',
    'https://example.com/graphictshirt.jpg',
    'Fashion',
    29.99,
    ['Small', 'Medium', 'Large']
  ),
  new ProductModel(
    10,
    'Smart Watch',
    'Smartwatch with fitness tracking and notification features',
    'https://example.com/smartwatch.jpg',
    'Electronics',
    179.99,
    ['One Size']
  ),
];
