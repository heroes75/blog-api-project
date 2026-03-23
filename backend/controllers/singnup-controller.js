const bcrypt = require('bcryptjs');
const { prisma } = require('../lib/prisma');
async function signup(req, res) {
    const {username, password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await prisma.users.create({
        data: {
            username,
            password: hashedPassword,
        }
    })
    res.redirect('/')
}

module = signup