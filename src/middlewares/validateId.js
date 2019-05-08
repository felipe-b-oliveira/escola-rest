const mongoose = require('mongoose');

module.exports = validateId = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params._id))
    return res.status(400).json({ message: 'Id inválido' });

  return next();
};
