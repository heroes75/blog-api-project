const { prisma } = require('../lib/prisma')
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs')


async function loginController(req, res) {
    const {username, password} = req.body
    const user = await prisma.users.findUnique({
        where: {
            username
        }
    })
    if(!user) {
        res.status(401).json({
            message: 'incorrect username'
        })
    }

    const compare = await bcrypt.compare(password, user.password)

    if (!compare) {
        res.status(401).json({
            message: 'incorrect password'
        })
    }
    const token = jwt.sign({user}, process.env.SECRET, {expiresIn: '1h'})
    res.status(200).json({
        user,
        token
    })
}

module.exports = {
    loginController
}