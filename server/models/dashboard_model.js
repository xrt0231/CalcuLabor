
const {transaction, commit, rollback, query} = require('./mysqlcon');

const getDashboard = async()=> {
    await console.log('test');
    
 }
 module.exports = {
     getDashboard
 };