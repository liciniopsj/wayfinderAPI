const skills = require('../data/skills.json');

function validateId(req, res, next) {
  const { id } = req.params;
  const filteredSkills = skills.find(({ skillId }) => skillId === +id);
  const intId = +id;
  if (filteredSkills) {
    next();
  } else {
    if (Number.isNaN(intId)) {
      res.status(400).json({ message: 'id needs to be a number.' });
    }
    res.status(404).json({ message: 'Skill not found!' });
  }
}

module.exports = validateId;
