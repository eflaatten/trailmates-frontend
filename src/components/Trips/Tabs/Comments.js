import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { getProfile } from "../../../api/profile";
import { Avatar } from "@mui/material";
import "./Comments.css";

const Comments = ({ trip }) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [profilePicture, setProfilePicture] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await getProfile();
        setUsername(profileData.username);
        setProfilePicture(profileData.profile_picture);
      } catch (error) {
        console.error("Failed to fetch profile data:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleCommentChange = (value) => {
    setComment(value);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      const newComment = {
        text: comment,
        date: new Date(),
        username,
        profilePicture,
      };
      setComments([...comments, newComment]);
      setComment("");
    }
  };

  const handleCancel = () => {
    setComment("");
    setEditingIndex(null);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
  };

  const handleSaveEdit = (index, newText) => {
    const updatedComments = [...comments];
    updatedComments[index].text = newText;
    setComments(updatedComments);
    setEditingIndex(null);
  };

  const handleDelete = (index) => {
    setComments(comments.filter((_, i) => i !== index));
  };

  const formatLink = (link) => {
    if (!link.startsWith("http://") && !link.startsWith("https://")) {
      return `http://${link}`;
    }
    return link;
  };

  return (
    <div>
      <form
        onSubmit={handleCommentSubmit}
        style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}
      >
        <Avatar src={profilePicture} alt={username} />
        <div style={{ flex: 1 }}>
          <ReactQuill
            theme='snow'
            value={comment}
            onChange={(value) => {
              // Check if the content is a link and format it
              const linkRegex = /<a href="([^"]+)"/;
              const match = value.match(linkRegex);
              if (match) {
                const formattedLink = formatLink(match[1]);
                value = value.replace(match[1], formattedLink);
              }
              handleCommentChange(value);
            }}
            placeholder='Write a comment...'
            style={{
              backgroundColor: "#11243a",
              border: "1px solid #444",
              borderRadius: "10px",
              color: "white",
              maxHeight: "300px",
              overflowY: "auto",
            }}
            modules={{
              toolbar: [
                [{ header: [1, 2, 3, false] }],
                ["bold", "italic", "underline"],
                [{ list: "ordered" }, { list: "bullet" }],
                ["link"],
              ],
            }}
            formats={[
              "header",
              "bold",
              "italic",
              "underline",
              "list",
              "bullet",
              "link",
            ]}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "10px",
              marginTop: "10px",
            }}
          >
            <button
              type='submit'
              style={{
                padding: "10px 20px",
                borderRadius: "5px",
                border: "2px solid #a061d1",
                backgroundColor: "transparent",
                color: "#a061d1",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) =>
                (e.target.style.backgroundColor = "rgba(160, 97, 209, 0.1)")
              }
              onMouseLeave={(e) =>
                (e.target.style.backgroundColor = "transparent")
              }
            >
              Send
            </button>
            <button
              type='button'
              onClick={handleCancel}
              style={{
                padding: "10px 20px",
                borderRadius: "5px",
                border: "2px solid #ff1400",
                backgroundColor: "transparent",
                color: "#ff1400",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) =>
                (e.target.style.backgroundColor = "rgba(255, 20, 0, 0.1)")
              }
              onMouseLeave={(e) =>
                (e.target.style.backgroundColor = "transparent")
              }
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
      <div style={{ marginTop: "20px" }}>
        {comments.map((cmt, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              marginBottom: "10px",
              padding: "10px",
              border: "1px solid #444",
              borderRadius: "5px",
              backgroundColor: "#061D37",
              color: "white",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Avatar
                src={cmt.profilePicture}
                alt={cmt.username}
                style={{ marginRight: "10px" }}
              />
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "5px",
                  }}
                >
                  <span>{cmt.username}</span>
                  <span>{new Date(cmt.date).toLocaleString()}</span>
                </div>
                {editingIndex === index ? (
                  <ReactQuill
                    theme='snow'
                    value={cmt.text}
                    onChange={(value) => handleSaveEdit(index, value)}
                    style={{
                      backgroundColor: "#11243a",
                      border: "1px solid #444",
                      borderRadius: "10px",
                      color: "white",
                      maxHeight: "300px",
                      overflowY: "auto",
                    }}
                    modules={{
                      toolbar: [
                        [{ header: [1, 2, 3, false] }],
                        ["bold", "italic", "underline"],
                        [{ list: "ordered" }, { list: "bullet" }],
                        ["link"],
                      ],
                    }}
                    formats={[
                      "header",
                      "bold",
                      "italic",
                      "underline",
                      "list",
                      "bullet",
                      "link",
                    ]}
                  />
                ) : (
                  <div dangerouslySetInnerHTML={{ __html: cmt.text }} />
                )}
              </div>
            </div>
            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <button
                onClick={() => handleEdit(index)}
                style={{
                  border: "none",
                  backgroundColor: "transparent",
                  color: "#a061d1",
                  cursor: "pointer",
                }}
              >
                Edit
              </button>
              {cmt.username === username && (
                <button
                  onClick={() => handleDelete(index)}
                  style={{
                    border: "none",
                    backgroundColor: "transparent",
                    color: "#ff1400",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
