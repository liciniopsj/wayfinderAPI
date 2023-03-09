const express = require('express');

const OK = 200;
const CREATED = 201;
const NOT_FOUND = 404;

const skills = require('./data/skills.json');

const app = express();

app.use(express.json());

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

app.get('/skills/:id', (req, res) => {
  const { id } = req.params;
  const filteredSkills = skills.find(({ skillId }) => skillId === +id);

  if (!filteredSkills) {
    res.status(NOT_FOUND).json({ message: 'Skill not found!' });
  }
  
  res.status(OK).json(filteredSkills);
});

// Post new Skill

app.post('/skills', (req, res) => {
  const newSkill = { ...req.body };
  skills.push(newSkill);

  res.status(CREATED).json(skills);
});

// PUT Editing skills via ID

// eslint-disable-next-line max-lines-per-function
app.put('/skills/:id', (req, res) => {
  const { id } = req.params;
  const {
    abilityBonus,
    abilityMod,
    armorCheckPenalty,
    classSkill,
    description,
    miscMod,
    ranks,
    skillname,
    skillTotal,
    trainedOnly,
  } = req.body;

  const skillToUpdate = skills.find(({ skillId }) => skillId === +id);

  if (!skillToUpdate) {
    res.status(NOT_FOUND).json({ message: 'Skill not found!' });
  }

  skillToUpdate.abilityBonus = abilityBonus;
  skillToUpdate.abilityMod = abilityMod;
  skillToUpdate.armorCheckPenalty = armorCheckPenalty;
  skillToUpdate.classSkill = classSkill;
  skillToUpdate.description = description;
  skillToUpdate.miscMod = miscMod;
  skillToUpdate.ranks = ranks;
  skillToUpdate.skillname = skillname;
  skillToUpdate.skillTotal = skillTotal;
  skillToUpdate.trainedOnly = trainedOnly;
  res.status(OK).json(skillToUpdate);
});

// DELETE delete skills

app.delete('/skills/:id', (req, res) => {
  const { id } = req.params;
  const skillIndex = skills.findIndex(({ skillId }) => skillId === +id);
  skills.splice(skillIndex, 1);

  res.status(OK).end();
});

module.exports = app;