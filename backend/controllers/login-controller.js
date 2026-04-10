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
        return res.status(401).json({
            message: 'incorrect username',
            statusCode: 401,
        })
    }

    const compare = await bcrypt.compare(password, user.password)

    if (!compare) {
        return res.status(401).json({
            message: 'incorrect password',
            statusCode: 401,
        })
    }
    const opts = {}
    opts.expiresIn = '7d'
    const token = jwt.sign({user}, process.env.SECRET, opts)
    res.status(200).json({
        user,
        token
    })
}

module.exports = {
    loginController
}