import app from '../../src/app';
import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import HTTP_STATUS_CODES from 'http-status';
import {locationService} from '../../src/services/location.service';

chai.use(chaiHttp);
chai.should();

describe('Core Controller Testing', () => {

    let saveLocationServiceMock: any = null;
    let getLocationServiceMock: any = null;

    beforeEach(() => {
        saveLocationServiceMock = sinon.stub(locationService, 'saveLocation');
        saveLocationServiceMock.returns(Promise.resolve({
            status: '200'
        }));

        getLocationServiceMock = sinon.stub(locationService, 'getLocation');
        getLocationServiceMock.returns(Promise.resolve({
            status: '200'
        }));
    });

    afterEach(() => {
        saveLocationServiceMock.restore();
        getLocationServiceMock.restore();
    });

    it('Save location', (done) => {
        chai.request(app)
            .post('/location')
            .end((_err: any, res: any) => {
                res.should.have.status(HTTP_STATUS_CODES.CREATED);
                done();
            });
    });

    it('Fail Save location', (done) => {
        saveLocationServiceMock.rejects({
            status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
        });
        chai.request(app)
            .post('/location')
            .end((_err: any, res: any) => {
                res.should.have.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
                done();
            });
    });

    it('Get locations', (done) => {
        chai.request(app)
            .get('/getLocations')
            .end((_err: any, res: any) => {
                res.should.have.status(HTTP_STATUS_CODES.OK);
                done();
            });
    });

    it('Fail Get locations', (done) => {
        getLocationServiceMock.rejects({
            status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
        });
        chai.request(app)
            .get('/getLocations')
            .end((_err: any, res: any) => {
                res.should.have.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
                done();
            });
    });

});
