const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const skills = require('./data/skills.json');
const apiCredentials = require('./middlewares/apiCredentials');
const validateId = require('./middlewares/validateId');
const validateProps = require('./middlewares/validateProps');

const OK = 200;
const CREATED = 201;

const app = express();
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.json());

let nextId = 13;

// GET skill name by Query

app.get('/skills/search', (req, res) => {
  const { q } = req.query;

  if (q) {
    const filteredSkills = skills.filter(({ skillName }) => skillName.includes(q));
    return res.status(OK).json(filteredSkills);
  }

  res.status(OK).end();
});

// Get All Skills

app.get('/skills', (_req, res) => res.status(OK).json(skills));

// GET by Id

app.get('/skills/:id', validateId, (req, res) => {
  const { id } = req.params;
  const filteredSkills = skills.find(({ skillId }) => skillId === +id);  
  res.status(OK).json(filteredSkills);
});

app.use(apiCredentials);

// Post new Skill

app.post('/skills', validateProps, (req, res) => {
  if (req.skills.clearLevel > 1) return res.status(403).json({ message: 'Low Clearance Level' });
  const newSkill = { skillId: nextId, ...req.body };
  skills.push(newSkill);
  nextId += 1;
  res.status(CREATED).json(skills);
});

// PUT Editing skills via ID

app.put('/skills/:id', validateId, validateProps, (req, res) => {
  const { id } = req.params;
  const skillToUpdate = skills.find(({ skillId }) => skillId === +id);
  const index = skills.indexOf(skillToUpdate);
  const updatedSkill = { skillId: +id, ...req.body };
  skills.splice(index, 1, updatedSkill);
  res.status(201).json(updatedSkill);
});

// DELETE delete skills

app.delete('/skills/:id', validateId, (req, res) => {
  if (req.skills.clearLevel > 0) return res.status(403).json({ message: 'Low Clearance Level' });
  const { id } = req.params;
  const skillToDelete = skills.findIndex((skill) => skill.skillId === +id);
  const deletedSkill = skills[skillToDelete].skillName;
  skills.splice(skillToDelete, 1);
  res.status(200).json({ message: `${deletedSkill} skill deleted` });
});

module.exports = app;