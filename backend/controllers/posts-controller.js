async function getAllPosts(req, res) {
    console.log('req,user:', req.user)
    console.log('win the protectes route')
    res.json({
        user: req.user
    })
}

module.exports = {
    getAllPosts
}