const {transaction, commit, rollback, query} = require('./mysqlcon');

//sign up 
const signUp = async(username, encryptPassWord, token)=> {
    let result = await query(`SELECT * FROM employee where name = "${username}"`);
    
    if (result.length === 0)
        {
            let result2 = await query(`INSERT INTO employee (provider, password, name, access_token) VALUES ("native", "${encryptPassWord}", "${username}", "${token}")`);
            console.log(result2);
            return result2;
        }else
             {
              let result3 = {name: "existed"}
              console.log('Username already there...')
              return result3;
              }

 }

 const signIn = async()=> {
    await console.log('test2')
}    

 module.exports = {
     signUp, signIn
 };