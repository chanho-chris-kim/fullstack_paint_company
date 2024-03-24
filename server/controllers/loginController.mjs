import Users from "../models/Users.mjs";
import bcrypt from "bcrypt"

//@desc login user
//@route POST /api/login
//@access public
const loginUser = async (req, res, next) => {
  try {
    const { email, user_pw } = req.body;

    // Validate input fields
    if (!email || !user_pw) {
      res.status(400).json({ error: "Email and password are required" });
      return;
    }

    // Retrieve user from database
    const user = await Users.checkAuth(email, user_pw);

    // Check if user exists
    if (!user) {
      res.status(401).json({ error: "Invalid email or password" });
      return;
    }

    // Check password using bcrypt
    const isValidPassword = await bcrypt.compare(user_pw, user.user_pw);
    if (!isValidPassword) {
      res.status(401).json({ error: "Invalid email or password" });
      return;
    }

    // Successful login
    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    next(error); // Forward the error to the error handler
  }
};

export { loginUser }; // Export the loginUser function
