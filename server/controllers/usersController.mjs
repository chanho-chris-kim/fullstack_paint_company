import bcrypt from "bcrypt"
import Users from "../models/Users.mjs";

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
const createUser = async (req, res, next) => {
  try{
    const { user_pw, name, email, address, phone, role_id } = req.body;
    if (!user_pw) {
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
    } else if (!role_id) {
      res.status(400);
      throw new Error("role field is mandatory");
    }
    const hash = await bcrypt.hash(user_pw, 10)
    let user = new Users(hash, name, email, address, phone, role_id);
    user = await user.save();
    res.status(201).json({
      message: `User created successfully`,
    });
  } catch (err){
    next(err);
  }
  
};

//@desc Update an user
//@route PUT /api/users/:id
//@access public
const updateUser = async (req, res, next) => {
  try {
    // update logic MISSING
    res.status(200).json({ message: `User updated successfully for ${req.params.id}` });
  } catch (err) {
    next(err);
  }
};


//@desc Delete an user
//@route DELETE /api/users/:id
//@access public
const deleteUser = async (req, res, next) => {
  try {
    // delete logic MISSING
    res.status(200).json({ message: `User deleted successfully for ${req.params.id}` });
  } catch (err) {
    next(err);
  }
};


export { getUsers, getUser, createUser, updateUser, deleteUser };

