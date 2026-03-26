const bcrypt = require("bcryptjs");
const { prisma } = require("../lib/prisma");
const { body, validationResult, matchedData } = require("express-validator");

const password = "your password must";
const validateUsername = body("username")
    .trim()
    .isAlphanumeric()
    .withMessage("your username must be only alphanumeric")
    .custom(async (value) => {
        const user = await prisma.users.findUnique({
            where: {
                username: value
            }
        })
        if (user) {
            throw new Error('')
        }
    }).withMessage('user with this username already exits')

const validatePassword = body("password")
    .isLength({ min: 8 })
    .withMessage("your password must overflow 8 characters")
    .matches(/[A-Z]/)
    .withMessage(`${password} contains at least one upper case`)
    .matches(/[0-9]/)
    .withMessage(`${password} contains at least one number`)
    .matches(/[\W]/)
    .withMessage(`${password} contains at least non alphanumeric character`);

async function signup(req, res) {
    const errors = validationResult(req);
    console.log("errors:", errors);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: errors.errors.map(error => error.msg),
            statusCode: 401,
        });
    }
    const { username, password } = matchedData(req);
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.users.create({
        data: {
            username,
            password: hashedPassword,
        },
    });
    res.json({
        user,
    });
}

module.exports = [[validateUsername, validatePassword], signup];
