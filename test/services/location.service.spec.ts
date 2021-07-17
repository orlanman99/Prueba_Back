import HTTP_STATUS_CODES from 'http-status';
import sinon from 'sinon';
import app from '../../src/app';
import { pool } from '../../src/utils/DbConn';
import chai from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);
chai.should();

describe('locationService', () => {
    let sqlMock: any = null;
    before(() => {
        sqlMock = sinon.stub(pool, 'query');
    });

    after(() => {
        sqlMock.restore();
    });

    it('should save a location', (done) => {
        sqlMock.returns(Promise.resolve({
            rows: [{
                fieldCount: 0,
                affectedRows: 1,
                insertId: 0,
                serverStatus: 2,
                warningCount: 0,
                message: '',
                protocol41: true,
                changedRows: 0
            }]
        }));
        chai.request(app)
            .post('/location')
            .send({
                Name: 'Bogota',
                Area: 50
            })
            .end((_err: any, res: any) => {
                res.should.have.status(HTTP_STATUS_CODES.CREATED);
                done();
            });
    });

    it('should fail save location', (done) => {
        sqlMock.rejects();
        chai.request(app)
            .post('/location')
            .send({
                Name: 'Bogota',
                Area: 50
            })
            .end((_err: any, res: any) => {
                res.should.have.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
                done();
            });
    });

    it('should get locations', (done) => {
        sqlMock.returns(Promise.resolve({
            rows: [{
                fieldCount: 0,
                affectedRows: 1,
                insertId: 0,
                serverStatus: 2,
                warningCount: 0,
                message: '',
                protocol41: true,
                changedRows: 0
            }]
        }));
        chai.request(app)
            .get('/getLocations')
            .end((_err: any, res: any) => {
                res.should.have.status(HTTP_STATUS_CODES.OK);
                done();
            });
    });

    it('should fail get locations', (done) => {
        sqlMock.rejects();
        chai.request(app)
            .get('/getLocations')
            .end((_err: any, res: any) => {
                res.should.have.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
                done();
            });
    });
});
