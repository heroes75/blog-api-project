const { prisma } = require("../lib/prisma");

const postNoFound = "no post found in the system";

async function postComment(req, res) {
  const { postId } = req.params;
  const { text } = req.body;
  const post = await prisma.posts.findUnique({
    where: {
      id: postId,
    },
  });
  if (!post) {
    res.status(404).json({
      message: postNoFound,
    });
  }
  console.log('req.user', req.user)
  const comment = await prisma.comments.create({
    data: {
      text,
      authorId: req.user.id,
      postsId: post.id,
    },
    include: {
      author: {
        select: {
          username: true,
        },
      },
    },
  });
  console.log("comment:", comment);
  res.status(200).json({
    comment,
  });
}

async function updateComment(req, res) {
  const { postId, commentId } = req.params;
  const { text } = req.body;
  const post = await prisma.posts.findUnique({
    where: {
      id: postId,
    },
  });
  const comment = await prisma.comments.findUnique({
    where: {
      id: commentId,
    },
  });

  if (!post || !comment) {
    res.status(404).json({
      message: `no ${!post ? "post" : "comment"} found in the system`,
    });
  }

  const updatedComment = await prisma.comments.update({
    where: {
      id: commentId,
    },
    data: {
      text,
    },
  });

  res.status(200).json({
    updatedComment,
  });
}

async function deleteComment(req, res) {
  const { postId, commentId } = req.params;
  const post = await prisma.posts.findUnique({
    where: {
      id: postId,
    },
  });
  const comment = await prisma.comments.findUnique({
    where: {
      id: commentId,
    },
  });

  console.log("post:", post);
  if (!post || !comment) {
    res.status(404).json({
      message: `no ${!post ? "post" : "comment"} found in the system`,
    });
  }

  const deletedComment = await prisma.comments.delete({
    where: {
      id: commentId,
    },
  });

  res.status(200).json({
    deletedComment,
  });
}
module.exports = {
  postComment,
  updateComment,
  deleteComment,
};
