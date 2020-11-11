const path = require('path');
const fs = require('fs');
// const products = [];

const prodFilePath = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');

const getProductsFromFile = callback => {
  fs.readFile(prodFilePath, (err, fileContent) => {
    let prods = [];
    if (!err) {
      prods = JSON.parse(fileContent);
    }

    callback(prods);
  })
}

module.exports = class Product {
  constructor(t) {
    this.title = t;
  }

  save() {

    getProductsFromFile(products => {
      products.push(this);
      fs.writeFile(prodFilePath, JSON.stringify(products), err => {
        console.log(err);
      });
    });
  }

  static fetchAll(callback) {
    getProductsFromFile(callback);
  }
}