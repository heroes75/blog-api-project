module.exports = async function logoutController(req, res) {
    console.log('req:', req)
    res.status(200).json({
        message: 'logout',
    })
}