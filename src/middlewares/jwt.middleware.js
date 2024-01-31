import jwt from 'jsonwebtoken';

export const isSeller = (req, res, next) => {
  // get the authtoken that passed in request headers
  const authtoken = req.headers['authorization'];
  if (!authtoken) {
    res.status(401).send('Please provide authorization token');
  }
  // verify the authtoken with .verify() provided by jsonwebtoken package
  try {
    const tokenPayload = jwt.verify(
      authtoken,
      'PO79tkUO6ScSMO4uIH75zlfv6Oeb3n57'
    );
    if (tokenPayload.type !== 'Seller') {
      throw new Error('This user dont have access for this API');
    }
    next();
  } catch (err) {
    return res.status(401).send(err);
  }
};
export const isCustomer = (req, res, next) => {
  // get the authtoken that passed in request headers
  const authtoken = req.headers['authorization'];
  if (!authtoken) {
    res.status(401).send('Please provide authorization token');
  }
  // verify the authtoken with .verify() provided by jsonwebtoken package
  try {
    const tokenPayload = jwt.verify(
      authtoken,
      'PO79tkUO6ScSMO4uIH75zlfv6Oeb3n57'
    );
    if (tokenPayload.type !== 'Customer') {
      return res.status(401).send('This user dont have access for this API');
    }
    next();
  } catch (err) {
    return res.status(401).send(err);
  }
};
