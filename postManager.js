
export function createPost(posts, title, content) {
    if (!title.trim() || !content.trim()) {
        throw new Error("Title and content are required");
    }

    const newPost = {
        id: Date.now(),
        title: title.trim(),
        content: content.trim()
    };

    return [...posts, newPost];
}

export function deletePost(posts, id) {
    return posts.filter(post => post.id !== id);
}
