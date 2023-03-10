// This is only an exercise, NOT REALLY SECURE
const fs = require('fs/promises');

module.exports = async function apiCredentials(req, res, next) {
  const token = req.header('X-API-TOKEN');
  const authdata = await fs.readFile('./authdata.json', { encoding: 'utf-8' });
  const authorized = JSON.parse(authdata);

  if (token in authorized) {
    req.skills = authorized[token];
    next();
  } else {
    res.status(401).json({ message: 'Expired or Invalid Token' });
  }
};
