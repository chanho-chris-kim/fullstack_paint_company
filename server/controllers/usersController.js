//@desc Get all users
//@route GET /api/users
//@access public
const getUsers = async (req, res) => {
  res.status(200).json({
    message: "GET success",
  });
};

//@desc Get user
//@route GET /api/users/:id
//@access public
const getUser = async (req, res) => {
  res.status(200).json({
    message: `GET success for ${req.params.id}`,
  });
};

//@desc create an user
//@route POST /api/users
//@access public
const createUser = async (req, res) => {
    const {
        pw,
        name, 
        email,
        address, 
        phone,
        role,
        date
    } = req.body;
    if (!pw){
        res.status(400);
        throw new Error("password field is mandatory");
    } else if (!name){
        res.status(400);
        throw new Error("name field is mandatory");
    } else if (!email){
        res.status(400);
        throw new Error("name field is mandatory");
    } else if (!address){
        res.status(400);
        throw new Error("name field is mandatory");
    } else if (!phone){
        res.status(400);
        throw new Error("name field is mandatory");
    } else if (!role){
        res.status(400);
        throw new Error("name field is mandatory");
    }
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
    deleteUser 
};
