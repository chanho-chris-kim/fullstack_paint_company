const Users = require("../models/Users");

//@desc Get user
//@route GET /api/users/:id
//@access public
const getAuth = async (req, res, next) => {
  try {
    let email = req.body.email;
    let password = req.body.password;
    let [users, _] = await Users.checkAuth(email, password);
    res.status(200).json({ users: users[0] });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAuth
};
