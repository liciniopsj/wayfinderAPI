const skills = require('../data/skills.json');

const OK = 200;
const CREATED = 201;
let nextId = 28;

const searchByQuery = (req, res) => {
  const { q } = req.query;

  if (q) {
    const filteredSkills = skills.filter(({ skillName }) => skillName.includes(q));
    return res.status(OK).json(filteredSkills);
  }

  res.status(OK).end();
};

const getAllSkills = (_req, res) => res.status(OK).json(skills);

const searchById = (req, res) => {
  const { id } = req.params;
  const filteredSkills = skills.find(({ skillId }) => skillId === +id);  
  res.status(OK).json(filteredSkills);
};

const addSkill = (req, res) => {
  if (req.skills.clearLevel > 1) return res.status(403).json({ message: 'Low Clearance Level' });
  const newSkill = { skillId: nextId, ...req.body };
  skills.push(newSkill);
  nextId += 1;
  res.status(CREATED).json(skills);
};

const deleteSkill = (req, res) => {
  if (req.skills.clearLevel > 0) return res.status(403).json({ message: 'Low Clearance Level' });
  const { id } = req.params;
  const skillToDelete = skills.findIndex((skill) => skill.skillId === +id);
  const deletedSkill = skills[skillToDelete].skillName;
  skills.splice(skillToDelete, 1);
  res.status(200).json({ message: `${deletedSkill} skill deleted` });
};

const editSkill = (req, res) => {
  const { id } = req.params;
  const skillToUpdate = skills.find(({ skillId }) => skillId === +id);
  const index = skills.indexOf(skillToUpdate);
  const updatedSkill = { skillId: +id, ...req.body };
  skills.splice(index, 1, updatedSkill);
  res.status(201).json(updatedSkill);
};

module.exports = {
  searchByQuery,
  getAllSkills,
  searchById,
  addSkill,
  deleteSkill,
  editSkill,
};