const express=require('express');
const router= express.Router();
const { getAllInstitutes, createInstitute, getSingleInstitute, deleteInstitute } = require('../controllers/instituteController');

router.route('/').get(getAllInstitutes).post(createInstitute);
router.route('/:id').get(getSingleInstitute).delete(deleteInstitute);

module.exports=router;