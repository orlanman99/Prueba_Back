import debugLib from 'debug';
import { Request, Response } from 'express';
import { locationService } from '../services/location.service';

import HTTP_STATUS_CODES from 'http-status';

const debug = debugLib('CoreController');

class CoreController {

    saveLocation(req: Request, res: Response) {
        debug('[NEW] CALL Save Location');

        locationService.saveLocation(req)
            .then(response => res.status(HTTP_STATUS_CODES.CREATED).send(response))
            .catch(error => res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send(error.message));
    }

    getLocations(req: Request, res: Response) {
        debug('[NEW] CALL Get Location');

        locationService.getLocation()
            .then(response => res.status(HTTP_STATUS_CODES.CREATED).send(response))
            .catch(error => res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send(error.message));
    }

}

export const coreController = new CoreController();
