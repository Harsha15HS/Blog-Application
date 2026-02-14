import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { API } from "../../api";

const SingleBlog = () => {
    const token = localStorage.getItem("token");
    const { id } = useParams();

    const [blog, setBlog] = useState(null);
    const [comments, setComments] = useState([]);
    const [showComments, setShowComments] = useState(false);
    const [loading, setLoading] = useState(false);
    const [newComment, setNewComment] = useState("");


    const scrollToComments = () => {
        const section = document.getElementById("commentsSection");
        section?.scrollIntoView({ behavior: "smooth" });
    };


    const fetchBlog = async () => {
        try {
            const res = await axios.get(
                `${API}/blogs/getblog/${id}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setBlog(res.data.blog);
        } catch (err) {
            console.log(err);
        }
    };

    // ✅ Fetch Comments
    const fetchComments = async () => {
        try {
            setLoading(true);
            const res = await axios.get(
                `${API}/comments/getComments/${id}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setComments(res.data.comments);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const handleShowComments = async () => {
        if (!showComments) {
            await fetchComments();
            setShowComments(true);
        }
        scrollToComments();
    };
    const handleCreateComment = async () => {
        if (!newComment.trim()) return;

        try {
            await axios.post(
                `${API}/comments`,
                { text: newComment, blogId: id },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setNewComment("");      // clear input
            fetchComments();        // refresh comments
        } catch (err) {
            console.log(err);
        }
    };


    useEffect(() => {
        fetchBlog();
    }, [id]);

    return (
        <div style={{ padding: "20px", color: "#f1f5f9" }}>
            <h1>{blog?.title}</h1>
            <p>{blog?.content}</p>

            <button
                onClick={handleShowComments}
                style={{
                    marginTop: "20px",
                    color: "white",
                    backgroundColor: "#2563eb",
                    border: "none",
                    padding: "8px 15px",
                    borderRadius: "6px",
                    cursor: "pointer"
                }}
            >
                💬 Comments ({comments.length})
            </button>


            {showComments && (
                <div id="commentsSection" className="mt-8">
                    <h2>Comments</h2>
                    <div className="mb-4">
                        <textarea
                            placeholder="Write a comment..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "10px",
                                borderRadius: "8px",
                                border: "1px solid #ccc",
                                marginBottom: "10px"
                            }}
                        />

                        <button
                            onClick={handleCreateComment}
                            style={{
                                backgroundColor: "#2563eb",
                                color: "white",
                                border: "none",
                                padding: "8px 15px",
                                borderRadius: "6px",
                                cursor: "pointer"
                            }}
                        >
                            Post
                        </button>
                    </div>


                    {loading ? (
                        <p>Loading...</p>
                    ) : comments.length === 0 ? (
                        <p>No comments yet.</p>
                    ) : (
                        comments.map((comment) => (
                            <div
                                key={comment._id}
                                style={{
                                    border: "1px solid #444",
                                    padding: "10px",
                                    marginBottom: "10px",
                                    borderRadius: "8px",
                                    backgroundColor: "#1f2937",   // dark card
                                }}
                            >
                                <strong style={{ color: "#60a5fa", fontSize: "12px" }}>
                                    {comment.userId.username}
                                </strong>

                                <p style={{ color: "white", marginTop: "5px" }}>
                                    {comment.text}
                                </p>

                                <small style={{ color: "#9ca3af", fontSize: "10px" }}>
                                    {new Date(comment.createdAt).toLocaleString()}
                                </small>
                            </div>

                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default SingleBlog;
