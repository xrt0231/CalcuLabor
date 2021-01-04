const app = require('../app');
const chai = require('chai');
const chaihttp = require('chai-http');

const { expect } = chai;
chai.use(chaihttp);
describe('Sign up/Profile API test', async()=>{
    it('sign up API', async() => {
        chai
        .request(app)
        .post('/api/1.0/admin/signUp')
        .send({
            username: 'JS1', password: '1'
        })
        .end((err, res)=>{
            expect(res).to.have.status(200);
        });
        
    });
    it('Get user API', async() => {
        chai
        .request(app)
        .post('/api/1.0/admin/userProfile')
        .send({
            token: '7ba9589b0dad440d982667c449cceb724d86f1fd13077d26fdd374ee2221c4cd'
        })
        .end((err, res)=>{
            expect(res).to.have.status(200);
        });
    });
});




 