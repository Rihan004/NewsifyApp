async function vote(postId, voteType) {
    try {
        const response = await fetch('/post/vote', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ postId, voteType })
        });

        const data = await response.json();

        if (data.success) {
            alert(`Vote successful! True: ${data.trueVotes}, False: ${data.falseVotes}`);
            // Optionally update the percentage dynamically in the UI
        } else {
            alert(data.error);
        }
    } catch (err) {
        console.error('Error voting:', err);
    }
}


async function addComment(postId) {
    const content = document.getElementById('comment-input').value.trim();

    if (!content) {
        alert('Comment cannot be empty!');
        return;
    }

    try {
        const response = await fetch(`/post/${postId}/comment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ content })
        });

        const data = await response.json();

        if (data.success) {
            document.getElementById('comment-input').value = ''; // Clear input
            const commentsContainer = document.getElementById('comments-container');
            
            // Append the new comment dynamically
            const newComment = document.createElement('div');
            newComment.className = 'flex items-start mb-4';
            newComment.innerHTML = `
                <img class="w-8 h-8 rounded-full" src="data:image/png;base64,<%= user.profilePicture.toString('base64') || 'https://via.placeholder.com/150' %>" alt="Profile">
                <div class="ml-3">
                    <p class="font-semibold">${data.comments[data.comments.length - 1].user.name}</p>
                    <p class="text-sm text-gray-600">${data.comments[data.comments.length - 1].content}</p>
                    <p class="text-xs text-gray-400">${new Date().toLocaleString()}</p>
                </div>
            `;
            commentsContainer.appendChild(newComment);
        } else {
            alert(data.error);
        }
    } catch (err) {
        console.error('Error adding comment:', err);
    }
}
