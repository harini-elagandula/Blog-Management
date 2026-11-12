
import { test } from "node:test";
import assert from "node:assert";
import { createPost, deletePost } from "./postManager.js";

test("Should create a new blog post", () => {
    const posts = [];

    const result = createPost(
        posts,
        "My First Blog",
        "Hello World"
    );

    assert.equal(result.length, 1);
    assert.equal(result[0].title, "My First Blog");
});

test("Should delete an existing blog post", () => {
    const posts = [
        { id: 1, title: "Blog 1", content: "Content 1" },
        { id: 2, title: "Blog 2", content: "Content 2" }
    ];

    const result = deletePost(posts, 1);

    assert.equal(result.length, 1);
    assert.equal(result[0].id, 2);
});

test("Should reject an empty blog post", () => {
    assert.throws(() => {
        createPost([], "", "Content");
    });
});
