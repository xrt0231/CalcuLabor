const {transaction, commit, rollback, query} = require('./mysqlcon');

//Get working hour data for clock in/out
const productInformation = async(productBarcode)=> {
	console.log(productBarcode);
	let result = await query(`SELECT * FROM product_register WHERE product_id = "${productBarcode}"`);
	return result;
}

module.exports = {
    productInformation,
};