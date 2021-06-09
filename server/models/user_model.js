const {transaction, commit, rollback, query} = require('./mysqlcon');

//sign up 
const signUp = async(username, encryptPassWord, token)=> {
	let result = await query(`SELECT * FROM employee where name = "${username}"`);
    
	if (result.length === 0)
	{
		let result1 = await query(`INSERT INTO employee (provider, password, name, access_token) VALUES ("native", "${encryptPassWord}", "${username}", "${token}")`);
		let result2 = await query(`SELECT * FROM employee where name = "${username}"`);
		console.log(result2);
		return result2;
	}else
	{
		let result3 = {name: "existed"}
		console.log('Username already there...')
		return result3;
	}
}

const signIn = async(username, encryptPassWord)=> {
    let sql = `SELECT * FROM employee where name = ? AND password = ?`
	let result = await query(sql, [username, encryptPassWord]);
    
	if (result.length === 0)
	{
		let result1 = {name: "notInUserList"}
		return result1;
	}else
	{
		console.log('User sign in success...')
		return result;
	}
} 


// Sign in wiht Apple
const signInApple = async(username, token, email)=> {
	
    let sql = `SELECT * FROM employee where name = ? AND access_token = ?`
	let result = await query(sql, [username, token]);
    
	if (result.length === 0)
	{
		let result1 = await query(`INSERT INTO employee (provider, email, password, name, access_token) VALUES ("apple", "${email}", "NA", "${username}", "${token}")`);
		let result2 = await query(`SELECT * FROM employee where name = "${username}"`);
		console.log(result2);
		return result2;
	}else
	{
		console.log('User sign in success...')
		return result;
	}
} 

// Sign in with Goole

const signInGoogle = async(username, token, email)=> {
	
    let sql = `SELECT * FROM employee where name = ? AND access_token = ?`
	let result = await query(sql, [username, token]);
    
	if (result.length === 0)
	{
		let result1 = await query(`INSERT INTO employee (provider, email, password, name, access_token) VALUES ("google", "${email}", "NA", "${username}", "${token}")`);
		let result2 = await query(`SELECT * FROM employee where name = "${username}"`);
		console.log(result2);
		return result2;
	}else
	{
		console.log('User sign in success...')
		return result;
	}
} 

const userProfile = async(token)=> {
	console.log(token); 
	let result = await query(`SELECT * FROM employee WHERE access_token = "${token}"`);
	if (result)
	{
		console.log('signed in...')
		let user = {
			employeeID: result[0].employee_id,
			provider: result[0].provider,
			email: result[0].email,
			name: result[0].name
		}
		console.log(user)
		return user;
	}else
	{
		let result1 = {name: "notSignIn"}
		return result1;
	}

} 

module.exports = {
	signUp, signIn, signInApple, signInGoogle, userProfile
};