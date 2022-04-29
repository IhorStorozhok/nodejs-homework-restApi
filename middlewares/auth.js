const { User } = require("../models");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
const { SECRET_KEY } = process.env;

const auth = async (req, res, next) => {
  const { authorization = "" } = req.headers;

  const [bearer, token] = authorization.split(" ");

  try {
    if (!bearer === "Bearer") {
      return res.status(401).json({
        status: "rejected",
        code: 401,
        message: "Not authorized",
      });
    }
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.token) {
      return res.status(401).json({
        status: "rejected",
        code: 401,
        message: "Not authorized",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    if (error.message === "invalid token") {
      return res.status(401).send({ message: "Not authorized" });
    }

    next(error);
  }
};

module.exports = auth;
