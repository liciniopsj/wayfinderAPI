const express = require('express');
const validateId = require('../middlewares/validateId');
const validateProps = require('../middlewares/validateProps');
const apiCredentials = require('../middlewares/apiCredentials');
const {
  searchByQuery,
  getAllSkills,
  searchById,
  addSkill,
  editSkill,
  deleteSkill,
} = require('../functions/skillRouter');

const skillsRouter = express.Router();

skillsRouter
  .get('/search', searchByQuery)
  .get('/', getAllSkills)
  .get('/:id', validateId, searchById);

skillsRouter
  .post('/', apiCredentials, validateProps, addSkill)
  .put('/:id', apiCredentials, validateId, validateProps, editSkill)
  .delete('/:id', apiCredentials, validateId, deleteSkill);

module.exports = skillsRouter;
