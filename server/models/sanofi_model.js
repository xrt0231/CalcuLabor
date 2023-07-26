const {transaction, commit, rollback, query} = require('./mysqlcon');

//Get working hour data for clock in/out
const sanofiInformation = async(productQRCode)=> {
	console.log(productBarcode);
	let result = await query(`SELECT * FROM product_register WHERE product_id = "${productQRCode}"`);
	return result;
}

module.exports = {
    sanofiInformation,
};