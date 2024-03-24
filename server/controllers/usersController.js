const Users = require("../models/Users");

//@desc Get all users
//@route GET /api/users
//@access public
const getUsers = async (req, res, next) => {
  try {
    const [users, _] = await Users.findAll();
    res.status(200).json({ count: users.length, users });
  } catch (err) {
    next(err);
  }
};

//@desc Get user
//@route GET /api/users/:id
//@access public
const getUser = async (req, res, next) => {
  try {
    let userId = req.params.id;
    let [users, _] = await Users.findById(userId);
    res.status(200).json({ users: users[0] });
  } catch (err) {
    next(err);
  }
};

//@desc create an user
//@route POST /api/users
//@access public
const createUser = async (req, res) => {
  const { pw, name, email, address, phone, role } = req.body;
  if (!pw) {
    res.status(400);
    throw new Error("password field is mandatory");
  } else if (!name) {
    res.status(400);
    throw new Error("name field is mandatory");
  } else if (!email) {
    res.status(400);
    throw new Error("email field is mandatory");
  } else if (!address) {
    res.status(400);
    throw new Error("address field is mandatory");
  } else if (!phone) {
    res.status(400);
    throw new Error("phone number field is mandatory");
  } else if (!role) {
    res.status(400);
    throw new Error("role field is mandatory");
  }

  let user = new Users(pw, name, email, address, phone, role);
  user = await user.save();
  res.status(201).json({
    message: `POST success`,
  });
};

//@desc Update an user
//@route PUT /api/users/:id
//@access public
const updateUser = async (req, res) => {
  res.status(200).json({
    message: `PUT success for ${req.params.id}`,
  });
};

//@desc Delete an user
//@route DELETE /api/users/:id
//@access public
const deleteUser = async (req, res) => {
  res.status(200).json({
    message: `DELETE success for ${req.params.id}`,
  });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
