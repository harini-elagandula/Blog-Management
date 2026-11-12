
import { createPost, deletePost } from "./postManager.js";

let posts = JSON.parse(localStorage.getItem("posts")) || [
    {
        id: 1,
        title: "Introduction to JavaScript",
        content: "JavaScript is a **programming language**."
    },
    {
        id: 2,
        title: "Introduction to Markdown",
        content: "Markdown is used for *text formatting*."
    }
];

function savePosts() {
    localStorage.setItem("posts", JSON.stringify(posts));
}

function renderPosts() {
    const postList = document.getElementById("post-list");
    postList.innerHTML = "";

    posts.forEach(post => {
        const article = document.createElement("article");
        const heading = document.createElement("h2");
        heading.textContent = post.title;

        const content = document.createElement("div");
        content.innerHTML = DOMPurify.sanitize(marked.parse(post.content));

        const button = document.createElement("button");
        button.textContent = "Delete";

        button.addEventListener("click", () => {
            posts = deletePost(posts, post.id);
            savePosts();
            renderPosts();
        });

        article.append(heading, content, button);
        postList.appendChild(article);
    });
}

document.getElementById("post-form").addEventListener("submit", event => {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;

    try {
        posts = createPost(posts, title, content);
        savePosts();
        renderPosts();
        event.target.reset();
    } catch (error) {
        alert(error.message);
    }
});

renderPosts();
