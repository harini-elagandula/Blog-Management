
import { createPost, deletePost } from "./postManager.js";

let posts = [
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

const form = document.getElementById("blogForm");
const postContainer = document.getElementById("posts");

function displayPosts() {
    postContainer.innerHTML = "";

    posts.forEach(post => {
        const article = document.createElement("article");
        article.className = "post";

        const heading = document.createElement("h2");
        heading.textContent = post.title;

        const content = document.createElement("div");
        content.innerHTML = DOMPurify.sanitize(
            marked.parse(post.content)
        );

        const button = document.createElement("button");
        button.textContent = "Delete";
        button.className = "delete-btn";

        button.addEventListener("click", () => {
            posts = deletePost(posts, post.id);
            displayPosts();
        });

        article.append(heading, content, button);
        postContainer.appendChild(article);
    });
}

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;

    try {
        posts = createPost(posts, title, content);
        form.reset();
        displayPosts();
    } catch (error) {
        alert(error.message);
    }
});

displayPosts();
