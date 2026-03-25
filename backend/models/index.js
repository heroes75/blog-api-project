const { prisma } = require("../lib/prisma");


const posts = (async function () {
    const post = await prisma.posts.findMany();
    return post;
})();


const comments = (async () => await prisma.comments.findMany())();

module.exports = {
    posts,
    comments,
};
