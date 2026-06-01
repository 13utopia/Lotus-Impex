const sequelize = require('./database');
const Product = require('./models/Product');

async function fix() {
  await Product.update({ categoryId: '4843e602-300a-4b98-a554-90277ef3e019' }, { where: { categoryId: null } });
  console.log('Fixed');
}
fix();
