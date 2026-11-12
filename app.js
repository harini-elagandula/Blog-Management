
import { createPost, deletePost } from "./postManager.js";

// Load saved posts from Local Storage
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

// Save posts to Local Storage
function savePosts() {
    localStorage.setItem("posts", JSON.stringify(posts));
}

// Display all blog posts
function renderPosts() {
    const postList = document.getElementById("post-list");
    postList.innerHTML = "";

    posts.forEach(post => {
        const article = document.createElement("article");

        const heading = document.createElement("h2");
        heading.textContent = post.title;

        const content = document.createElement("div");
        content.innerHTML = DOMPurify.sanitize(
            marked.parse(post.content)
        );

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", () => {
            posts = deletePost(posts, post.id);
            savePosts();
            renderPosts();
        });

        article.appendChild(heading);
        article.appendChild(content);
        article.appendChild(deleteButton);

        postList.appendChild(article);
    });
}

// Create a new blog post
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

// Display posts when the page loads
renderPosts();
