const express=require('express');
const router= express.Router();
const { createProject, getAllProjects, getSingleProject, deleteProject, updateProject } = require('../controllers/projectController');

router.route('/').post(createProject).get(getAllProjects)
router.route('/:id').get(getSingleProject).delete(deleteProject).patch(updateProject)


module.exports=router;