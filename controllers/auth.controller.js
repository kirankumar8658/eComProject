const bcrypt = require("bcryptjs");
const user_model = require("../models/user.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();
exports.signup = async (req, res) => {
  const request_body = req.body;
  const userObj = {
    name: request_body.name,
    userId: request_body.userId,
    email: request_body.email,
    userType: request_body.userType,
    password: bcrypt.hashSync(request_body.password, 10),
  };

  try {
    const user_created = await user_model.create(userObj);

    const res_obj = {
      name: user_created.name,
      userId: user_created.userId,
      email: user_created.email,
      userType: user_created.userType,
      createdAt: user_created.createdAt,
      updatedAt: user_created.updatedAt,
    };
    res.status(201).send(res_obj);
  } catch (err) {
    console.log("Error while registering the user", err);
    res.status(500).send({
      message: "Some error happened while registering the user",
    });
  }
};

exports.signin = async (req, res) => {
  try {
    const user = await user_model.findOne({ userId: req.body.userId });

    if (!user) {
      return res
        .status(400)
        .send({ message: "User id passed is not a valid user id" });
    }

    const isPasswordValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!isPasswordValid) {
      return res.status(401).send({ message: "Wrong password passed" });
    }

    const token = jwt.sign({ id: user.userId }, process.env.SECRET, {
      expiresIn: 120,
    });

    res.status(200).send({
      name: user.name,
      userId: user.userId,
      email: user.email,
      userType: user.userType,
      accessToken: token,
    });
  } catch (err) {
    console.error("Error in signin:", err);
    res.status(500).send({ message: "Internal server error during signin" });
  }
};
