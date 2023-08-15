//delete post
document.addEventListener('DOMContentLoaded', () => {
    const deleteButtons = document.querySelectorAll('.delete-post');

    deleteButtons.forEach(button => {
        button.addEventListener('click', async (event) => {
            const postId = event.target.getAttribute('data-post-id');
            
            try {
                const response = await fetch(`/api/blogposts/${postId}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    // Reload the page to reflect the updated post list
                    window.location.reload();
                } else {
                    const data = await response.json();
                    console.error('Delete error:', data.message);
                }
            } catch (error) {
                console.error('Delete error:', error);
            }
        });
    });
});
