const app = require('../app');
const chai = require('chai');
const chaihttp = require('chai-http');

const { expect } = chai;
chai.use(chaihttp);
describe('Get standard API test', ()=>{
    it('get standard api', async() => {
        chai
        .request(app)
        .post('/api/1.0/admin/getStandard')
        .send({
            recordProcess: 'process_1', partNum: 10000001
        })
        .end((err, res)=>{
            const standardOutput = res.body[0].standard_output;
            expect(res).to.have.status(200);
            expect(standardOutput).to.equal(130);
        });
    });
});