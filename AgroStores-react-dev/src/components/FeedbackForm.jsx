import { useState, useEffect } from "react";

export const FeedbackForm = ({ productId, onClose, feedbacks }) => {
  const [feedback, setFeedback] = useState({
    userName: "",
    profilePicture: null,
    text: "",
    image: null,
    video: null,
    rating: 0,
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [previewVideo, setPreviewVideo] = useState(null);
  const [hoverRating, setHoverRating] = useState(0);

  // Fetch the user's name from the database
  useEffect(() => {
    fetch("/api/user")
      .then((res) => res.json())
      .then((data) => {
        setFeedback((prev) => ({ ...prev, userName: data.userName }));
      })
      .catch((error) => console.error("Error fetching user data:", error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("userName", feedback.userName);
    formData.append("profilePicture", feedback.profilePicture);
    formData.append("text", feedback.text);
    formData.append("image", feedback.image);
    formData.append("video", feedback.video);
    formData.append("rating", feedback.rating);
    formData.append("productId", productId);

    fetch("/api/feedback", {
      method: "POST",
      body: formData,
    })
      .then(() => {
        alert("Feedback submitted successfully!");
        onClose();
      })
      .catch((error) => {
        console.error("Error submitting feedback:", error);
        alert("Failed to submit feedback. Please try again.");
      });
  };

  const formStyles = {
    padding: "20px",
    background: "#f9f9f9",
    borderRadius: "8px",
    maxWidth: "500px",
    margin: "0 auto",
  };

  const inputStyles = {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    marginBottom: "10px",
    width: "100%",
  };

  const buttonStyles = {
    padding: "10px",
    backgroundColor: "#4caf50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  };

  const starStyles = {
    display: "flex",
    gap: "5px",
    justifyContent: "center",
    marginBottom: "10px",
  };

  const starIconStyles = (index) => ({
    fontSize: "24px",
    color: index <= (hoverRating || feedback.rating) ? "#FFD700" : "#ccc",
    cursor: "pointer",
  });

  return (
    <div>
      {/* Feedback Form */}
      <div style={formStyles}>
        <h2 style={{ textAlign: "center" }}>Submit Feedback</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your Name"
            value={feedback.userName}
            readOnly
            style={inputStyles}
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              setFeedback({ ...feedback, profilePicture: e.target.files[0] });
              setPreviewImage(URL.createObjectURL(e.target.files[0]));
            }}
            style={inputStyles}
          />
          {previewImage && (
            <img
              src={previewImage}
              alt="Profile Preview"
              style={{ width: "100px", height: "100px", marginBottom: "10px" }}
            />
          )}
          <textarea
            placeholder="Write your feedback..."
            value={feedback.text}
            onChange={(e) =>
              setFeedback({ ...feedback, text: e.target.value })
            }
            required
            style={inputStyles}
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              setFeedback({ ...feedback, image: e.target.files[0] });
              setPreviewImage(URL.createObjectURL(e.target.files[0]));
            }}
            style={inputStyles}
          />
          <input
            type="file"
            accept="video/*"
            onChange={(e) => {
              setFeedback({ ...feedback, video: e.target.files[0] });
              setPreviewVideo(URL.createObjectURL(e.target.files[0]));
            }}
            style={inputStyles}
          />
          {previewVideo && (
            <video
              src={previewVideo}
              controls
              style={{ width: "100%", marginBottom: "10px" }}
            />
          )}
          <div style={starStyles}>
            {[1, 2, 3, 4, 5].map((index) => (
              <span
                key={index}
                style={starIconStyles(index)}
                onMouseEnter={() => setHoverRating(index)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setFeedback({ ...feedback, rating: index })}
              >
                ★
              </span>
            ))}
          </div>
          <button
            type="submit"
            style={buttonStyles}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#45a049")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#4caf50")}
          >
            Submit
          </button>
        </form>
      </div>

      {/* Display Feedback */}
      <div style={{ marginTop: "20px" }}>
        <h3>Feedback from Other Users</h3>
        {feedbacks.map((fb, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <p>
              <strong>{fb.userName}</strong>
            </p>
            {fb.profilePicture && (
              <img
                src={fb.profilePicture}
                alt="User Profile"
                style={{ width: "50px", height: "50px", borderRadius: "50%" }}
              />
            )}
            <p>{fb.text}</p>
            {fb.image && (
              <img
                src={fb.image}
                alt="Feedback"
                style={{ width: "100px", height: "100px" }}
              />
            )}
            {fb.video && <video src={fb.video} controls style={{ width: "100%" }} />}
            <p>Rating: {fb.rating} ⭐</p>
          </div>
        ))}
      </div>
    </div>
  );
};