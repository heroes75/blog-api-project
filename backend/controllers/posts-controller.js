const { prisma } = require("../lib/prisma");

async function getAllPosts(req, res) {
    res.json({
        posts: req.context.models.posts.filter((post) => post.published),
    });
}

async function createPost(req, res) {
    const { text, title } = req.body;
    const user = req.user;
    if (!user) {
        return res.status(401).json({message: res.statusText})
    }
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
    const user = req.user;
    if (!user) {
        return res.status(401).json({message: 'not authenticated'})
    }
    const { postId } = req.params;
    const { text, title, published } = req.body;
    const post = await prisma.posts.findUnique({
        where: {
            id: postId
        }
    })
    if (!post) {
        return res.status(404).json({
            message: 'post not found in the system'
        })
    }
    if (post.authorId !== user.id) {
        return res.status(403).json({
            message: "forbidden update"
        })
    } 
    const updatedPost = await prisma.posts.update({
        where: {
            id: postId,
        },
        data: {
            text,
            title,
            published,
        },
    });
    res.status(200).json({
        updatedPost
    });
}

async function deletePost(req, res) {
    const {postId} = req.params
    const user = req.user
    if (!user) {
        return res.status(401).json({message: 'not authenticated'})
    }
    const post = await prisma.posts.findUnique({
        where: {
            id: postId
        }
    })
    if (!post) {
        return res.status(404).json({
            message: "no post found"
        })
    }
    if (post.authorId !== user.id) {
        return res.status(403).json({
            message: "forbidden delete"
        })
    }
    const deletedPost = await prisma.posts.delete({
        where: {
            id: postId
        }
    })
    
    res.status(200).json({
        deletedPost
    })
}

async function getAllPostOfUser(req,res) {
    const user = req.user
    if (!user) {
        return res.status(401).json({message: res.statusText})
    }
    const posts = await prisma.posts.findMany({
        where: {
            authorId: user.id
        },
        include: {
            author: {
                select: {
                    username: true
                }
            }
        }
    })

    res.status(200).json({
        posts,
        user: {username: user.username, id: user.id}
    })
}

async function getPost(req, res) {
    const {postId} = req.params;
    const user = req.user
    const post = await prisma.posts.findUnique({
        where: {
            id: postId
        },
        include: {
            author: {
                select: {
                    username: true
                }
            },
            comments: {
                include: {
                    author: {
                        select: {
                            username: true
                        }
                        
                    }
                }
            }
        }
    })
    console.log('post:', post)
    console.log('req.user:', req.user)
    if (!post) {
        return res.status(404).json({
            status: 404,
            message: "no post find in the system"
        })
    } else if(!post.published) {
        if (user?.id === post.authorId) {
            return res.status(200).json({post})
        }
        return res.status(403).json({
            status: 403,
            message: 'access denied',
        })
    }
    res.status(200).json({
        post,
        userId: user?.id
    })
}

async function getCreatePost(req, res) {
    const user = req.user
    if(!user) {
        return res.status(401).json({message: ``})
    }
    res.status(200).json()
}

async function getUpdatePostPage(req, res) {
    const user = req.user
    if (!user) {
        return res.status(401).json({message: 'not authenticated'})
    }
    const { postId } = req.params;
    const post = await prisma.posts.findUnique({
        where: {
            id: postId,
        }
    })
    if (!post) {
        return res.status(404).json({
            message: 'post not found in the system'
        })
    }
    if (post.authorId !== user.id) {
        return res.status(403).json({
            message: "forbidden update"
        })
    }
    res.status(200).json({post})
}

module.exports = {
    getAllPosts,
    createPost,
    updatePost,
    deletePost,
    getAllPostOfUser,
    getPost,
    getCreatePost,
    getUpdatePostPage,
};
