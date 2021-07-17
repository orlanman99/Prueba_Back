import { Request } from 'express';
import { QueryResult } from 'pg';
import { pool } from '../utils/DbConn';
import { LocationModel } from '../models/location.model';
import HTTP_STATUS_CODES from 'http-status';
import { ResponseModel } from '../models/response.model';

class LocationService {

    async saveLocation(req: Request): Promise<any> {

        const successCode = HTTP_STATUS_CODES.CREATED;
        const locationModel: LocationModel = {
            Name: req.body.Name,
            Area: req.body.Area
        };
        return this.queryLocation(locationModel)
            .then(response => {
                const responseMessage: ResponseModel = {
                    data: {
                        id: response
                    },
                    statusCode: successCode,
                    message: 'Location created successfully'
                };
                return Promise.resolve(responseMessage);
            })
            .catch(error => {
                return Promise.reject(error);
            });

    }

    async getLocation(): Promise<any> {

        const successCode = HTTP_STATUS_CODES.CREATED;

        return this.queryGetLocations()
            .then(response => {
                const responseMessage: ResponseModel = {
                    data: {
                        response
                    },
                    statusCode: successCode,
                    message: 'Get Location successfully'
                };
                return Promise.resolve(responseMessage);
            })
            .catch(error => {
                return Promise.reject(error);
            });

    }

    async queryLocation(values: LocationModel): Promise<any> {
        try {
            const response: QueryResult = await pool.query('INSERT INTO location (name, ' +
                'area_m2) VALUES ($1, $2) ON CONFLICT (name) DO UPDATE SET name = $1, area_m2 = $2 returning name',
                [values.Name, values.Area]);
            return response.rows[0].name;
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async queryGetLocations(): Promise<any> {
        try {
            const response: QueryResult = await pool.query('SELECT * FROM location');
            return response.rows;
        } catch (error) {
            return Promise.reject(error);
        }
    }
}

export const locationService = new LocationService();
