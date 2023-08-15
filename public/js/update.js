//update post logic

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("updatePostForm");
  
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
  
      const postId = form.dataset.postId;
      const title = form.title.value;
      const body = form.body.value;
  
      try {
        const response = await fetch(`/api/blogposts/${postId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, body }), // Send data in JSON format
        });
  
        if (response.ok) {
          // Successfully updated, redirect or update the DOM
          window.location.href = "/dashboard";
        } else {
          // Handle specific error status codes
          if (response.status === 404) {
            console.error("Blog post not found");
          } else {
            console.error("Failed to update post");
          }
        }
      } catch (error) {
        console.error("Error:", error);
      }
    });
  });
  
  
  