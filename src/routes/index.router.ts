import { Router } from 'express';
import { RoutesEnum } from '../enums/routes.enum';
import {coreController} from '../controllers/core.controller'

class IndexRouter {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    private config(): void {
        this.router.post(RoutesEnum.saveLocation, coreController.saveLocation );
        this.router.get(RoutesEnum.getLocation, coreController.getLocations );
    }
}

const indexRouter = new IndexRouter();
export default indexRouter.router;

