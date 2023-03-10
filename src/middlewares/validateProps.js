function validateProps(req, res, next) {
  const requiredProperties = ['armorCheckPenalty', 'abilityMod',
  'description', 'skillName', 'trainedOnly'];
  if (requiredProperties.every((prop) => prop in req.body)) {
    next();
  } else {
    res.status(400).json({ message: 'invalid props' });
  }
}

module.exports = validateProps;