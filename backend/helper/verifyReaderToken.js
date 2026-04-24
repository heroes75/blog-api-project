const jwt = require('jsonwebtoken')
function verifyReaderToken(req, res, next) {
    console.log('bearer:', bearer)
    const bearer = req.headers['authorization']
    console.log('bearer:', bearer)

    if (typeof bearer === 'undefined') {
        req.user = undefined
    } else {
        const bearerToken = bearer.split(' ')
        const token = bearerToken[1]
        // console.log('token:', token)
        console.log('process.env.SECRET_READER,:', process.env.SECRET_READER,)
        jwt.verify(token, 'process.env.SECRET_READER', function(err, authData) {
            // console.log('authData:', authData)
            if (err) {
                console.error(err)
            } else {
                req.user = authData.user
            }
        })
    }
    next()
}

module.exports = verifyReaderToken