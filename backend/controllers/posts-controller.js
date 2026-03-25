const { prisma } = require("../lib/prisma");

async function getAllPosts(req, res) {
    res.json({
        users: req.context.models.posts.filter((post) => post.published),
    });
}

async function createPost(req, res) {
    const { text, title } = req.body;
    const user = req.user;
    const post = await prisma.posts.create({
        data: {
            authorId: user.id,
            text,
            title,
        },
    });
    res.status(200).json({
        post,
    });
}

async function updatePost(req, res) {
    const { postId } = req.params;
    const { text, title } = req.body;
    const user = req.user;
    const updatedPost = await prisma.posts.update({
        where: {
            id: postId,
            AND: {
                authorId: user.id,
            },
        },
        data: {
            text,
            title,
        },
    });
    if (!updatePost) {
        res.status(403).json({
            message: 'update failed'
        })
    }
    res.status(200).json({
        updatedPost
    });
}

module.exports = {
    getAllPosts,
    createPost,
    updatePost,
};
