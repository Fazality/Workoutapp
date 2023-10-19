import {Router} from 'express';
import * as genericController from '../controllers/generic-controller';
const router:Router = Router();
export default router;

router.route('/user').post(genericController.createEntityController('User'));
router.route('/user/:id').get(genericController.getEntityByIdController('User'));
router.route('/user').get(genericController.getAllEntitiesController('User'));
router.route('/user/:id').put(genericController.updateEntityController('User'));
router.route('/user/:id').delete(genericController.deleteEntityController('User'));

router.route('/exercise').post(genericController.createEntityController('CatalogExercise'));
router.route('/exercise/:id').get(genericController.getEntityByIdController('CatalogExercise'));
router.route('/exercise').get(genericController.getAllEntitiesController('CatalogExercise'));
router.route('/exercise/:id').put(genericController.updateEntityController('CatalogExercise'));
router.route('/exercise/:id').delete(genericController.deleteEntityController('CatalogExercise'));

router.route('/workout').post(genericController.createEntityController('Workout'));
router.route('/workout/:id').get(genericController.getEntityByIdController('Workout'));
router.route('/workout').get(genericController.getAllEntitiesController('Workout'));
router.route('/workout/:id').put(genericController.updateEntityController('Workout'));
router.route('/workout/:id').delete(genericController.deleteEntityController('Workout'));
