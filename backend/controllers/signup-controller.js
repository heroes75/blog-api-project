const bcrypt = require("bcryptjs");
const { prisma } = require("../lib/prisma");
const { body, validationResult, matchedData } = require("express-validator");

const password = "your password must";
const validateUsername = body("username")
  .trim()
  .isAlphanumeric()
  .withMessage("your username must be only alphanumeric")
  .custom(async (value, { req }) => {
    const user = await prisma.users.findUnique({
      where: {
        username_role: {
          username: value,
          role: req.body.role,
        },
      },
    });
    if (user) {
      throw new Error("");
    }
  })
  .withMessage("user with this username already exits");

const validatePassword = body("password")
  .isLength({ min: 8 })
  .withMessage("your password must overflow 8 characters")
  .matches(/[A-Z]/)
  .withMessage(`${password} contains at least one upper case`)
  .matches(/[0-9]/)
  .withMessage(`${password} contains at least one number`)
  .matches(/[\W]/)
  .withMessage(`${password} contains at least non alphanumeric character`);

const validateRole = body("role")
  .matches(/AUTHOR|READER/)
  .withMessage("invalid role");

const validateConfirmPassword = body("confirmPassword")
  .custom((value, { req }) => {
    // console.log('value:', value)
    // console.log('req.body.password:', req.body.password)
    // console.log('value !== req.body.password:', value !== req.body.password)
    if (value !== req.body.password) {
        console.log('WHYYYYYY')

        throw new Error("")
    };
    return true
  })
  .withMessage("your two passwords must be equal");

async function signup(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(401).json({
      message: errors.errors.map((error) => error.msg),
      statusCode: 401,
    });
  }
  const { username, password, role } = matchedData(req);
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.users.create({
    data: {
      username,
      password: hashedPassword,
      role,
    },
  });
  res.status(200).json({
    user,
  });
}

module.exports = [
  [validateUsername, validatePassword, validateConfirmPassword, validateRole],
  signup,
];
