import jwt from 'jsonwebtoken';

export const jwtAuth = (req, res, next) => {
  // get the authtoken that passed in request headers
  const authtoken = req.headers['authorization'];
  if (!authtoken) {
    res.status(401).send('Please provide authorization token');
  }
  // verify the authtoken with .verify() provided by jsonwebtoken package
  try {
    jwt.verify(authtoken, 'PO79tkUO6ScSMO4uIH75zlfv6Oeb3n57');
  } catch (err) {
    res.status(401).send('Request not authorized');
  }

  next();
};
