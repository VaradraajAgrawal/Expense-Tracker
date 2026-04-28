const jwt = require("jsonwebtoken");

const jwtVerify = (ids) => {
  return jwt.sign(
    {
      id: ids,
    },
    process.env.SECRET,
    { expiresIn: "2h" },
  );
};

module.exports = jwtVerify;
