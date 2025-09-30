const express=require('express');
const router=express.Router();
const  controller= require('../controllers/employeeController');


//CURD
router.post('/', controller.createEmployee);
router.get('/', controller.getAllEmployees);
router.put('/:id', controller.updateEmployee);
router.delete('/:id', controller.deleteEmployee);

module.exports=router;