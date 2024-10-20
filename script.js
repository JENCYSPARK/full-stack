let currentUser = null;
const users = JSON.parse(localStorage.getItem('users')) || {};
const posts = JSON.parse(localStorage.getItem('posts')) || [];
const userFollowers = JSON.parse(localStorage.getItem('userFollowers')) || {}; // To track who follows whom

// Check if a user is already signed in
function checkCurrentUser() {
    if (localStorage.getItem('currentUser')) {
        currentUser = localStorage.getItem('currentUser');
        toggleAuth(false);
        renderPosts();
        renderFollowers();
    }
}

// Event listener for Sign Up
document.getElementById('signupButton').addEventListener('click', function() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (username && password) {
        users[username] = password;
        userFollowers[username] = []; // Initialize followers array
        alert('Registration successful!');
        localStorage.setItem('users', JSON.stringify(users));
        clearAuthFields();
    }
});

// Event listener for Sign In
document.getElementById('signinButton').addEventListener('click', function() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (users[username] === password) {
        currentUser = username;
        localStorage.setItem('currentUser', currentUser); // Save current user
        alert('Login successful!');
        toggleAuth(false);
        clearAuthFields();
        renderPosts();
        renderFollowers();
    } else {
        alert('Invalid credentials');
    }
});

// Event listener for Logout
document.getElementById('logoutButton').addEventListener('click', function() {
    currentUser = null;
    localStorage.removeItem('currentUser'); // Remove current user
    toggleAuth(true);
    document.getElementById('feed').innerHTML = '';
});

// Event listener for Post
document.getElementById('postButton').addEventListener('click', function() {
    const postContent = document.getElementById('postContent').value;
    const postImage = document.getElementById('postImage').files[0];
    const timestamp = new Date().toLocaleString();
    
    if (postContent && currentUser) {
        const post = {
            id: Date.now(),
            content: postContent,
            author: currentUser,
            image: postImage ? URL.createObjectURL(postImage) : null,
            likes: 0,
            dislikes: 0,
            comments: [],
            timestamp: timestamp
        };
        posts.unshift(post);
        localStorage.setItem('posts', JSON.stringify(posts)); // Save posts to localStorage
        document.getElementById('postContent').value = '';
        document.getElementById('postImage').value = '';
        renderPosts();
    }
});

function toggleAuth(show) {
    document.getElementById('authSection').style.display = show ? 'block' : 'none';
    document.getElementById('postSection').style.display = show ? 'none' : 'block';
}

function clearAuthFields() {
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
}

function renderPosts() {
    const feed = document.getElementById('feed');
    feed.innerHTML = '';
    const followedPosts = posts.filter(post => userFollowers[currentUser].includes(post.author) || post.author === currentUser);
    
    followedPosts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'post';
        postElement.innerHTML = `
            <strong class="user">${post.author}</strong>: ${post.content} <br>
            <small class="timestamp">${post.timestamp}</small> <br>
            ${post.image ? `<img src="${post.image}" class="post-image" />` : ''}
            <div class="comment-action-buttons">
                <button class="icon-button" onclick="likePost(${post.id})">
                    <i class="far fa-thumbs-up"></i> ${post.likes}
                </button>
                <button class="icon-button" onclick="dislikePost(${post.id})">
                    <i class="far fa-thumbs-down"></i> ${post.dislikes}
                </button>
                <span class="comment-count">Comments: ${post.comments.length}</span>
            </div>
            <div class="comments">
                <h5>Comments:</h5>
                <div id="comments-${post.id}"></div>
                <div class="comment-input">
                    <input type="text" id="comment-input-${post.id}" placeholder="Add a comment..." />
                    <button class="icon-button" onclick="addComment(${post.id})">
                        <i class="far fa-comment-dots"></i> Comment
                    </button>
                    ${renderEmojiButtons(post.id)}
                </div>
            </div>
        `;
        feed.appendChild(postElement);
        renderComments(post.id); // Render comments for each post
    });
}

function renderFollowers() {
    const followersSection = document.getElementById('followers');
    followersSection.innerHTML = '';
    Object.keys(users).forEach(user => {
        if (user !== currentUser) {
            const isFollowing = userFollowers[currentUser].includes(user);
            const buttonLabel = isFollowing ? 'Unfollow' : 'Follow';
            const button = document.createElement('button');
            button.textContent = buttonLabel;
            button.onclick = () => {
                toggleFollow(user);
                renderFollowers();
            };
            const followerElement = document.createElement('div');
            followerElement.textContent = user;
            followerElement.appendChild(button);
            followersSection.appendChild(followerElement);
        }
    });
}

function toggleFollow(user) {
    const index = userFollowers[currentUser].indexOf(user);
    if (index > -1) {
        userFollowers[currentUser].splice(index, 1); // Unfollow
    } else {
        userFollowers[currentUser].push(user); // Follow
    }
    localStorage.setItem('userFollowers', JSON.stringify(userFollowers)); // Save followers to localStorage
}

function renderEmojiButtons(postId) {
    const emojis = ['😀', '😂', '😍', '😢', '😡'];
    return emojis.map(emoji => `
        <button class="emoji-button" onclick="addEmojiToComment('${emoji}', ${postId})">${emoji}</button>
    `).join('');
}

function likePost(postId) {
    const post = posts.find(p => p.id === postId);
    if (post) {
        post.likes++;
        localStorage.setItem('posts', JSON.stringify(posts)); // Update posts in localStorage
        renderPosts();
    }
}

function dislikePost(postId) {
    const post = posts.find(p => p.id === postId);
    if (post) {
        post.dislikes++;
        localStorage.setItem('posts', JSON.stringify(posts)); // Update posts in localStorage
        renderPosts();
    }
}

function addComment(postId) {
    const commentInput = document.getElementById(`comment-input-${postId}`);
    const commentText = commentInput.value;
    const timestamp = new Date().toLocaleString();
    const post = posts.find(p => p.id === postId);
    
    if (post && commentText) {
        post.comments.push({ user: currentUser, text: commentText, timestamp: timestamp });
        commentInput.value = '';
        localStorage.setItem('posts', JSON.stringify(posts)); // Update posts in localStorage
        renderComments(postId);
    }
}

function addEmojiToComment(emoji, postId) {
    const commentInput = document.getElementById(`comment-input-${postId}`);
    commentInput.value += emoji; // Append emoji to comment input
    commentInput.focus(); // Focus back on the input field
}

function renderComments(postId) {
    const post = posts.find(p => p.id === postId);
    const commentsDiv = document.getElementById(`comments-${postId}`);
    commentsDiv.innerHTML = '';
    post.comments.forEach(comment => {
        const commentElement = document.createElement('div');
        commentElement.className = 'comment';
        commentElement.textContent = `${comment.user}: ${comment.text} - ${comment.timestamp}`;
        commentsDiv.appendChild(commentElement);
    });
}

// Check for current user on page load
checkCurrentUser();
