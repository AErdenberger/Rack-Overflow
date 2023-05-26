import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearPostErrors, composePost } from "../../../store/posts";
import PostBox from "../PostBox/PostBox";
import jwtFetch from "../../../store/jwt";
import "./PostCompose.css";
import TagInput from "../../Tags/TagInput";
import { fetchAI, composeComment } from "../../../store/comments";

function PostCompose() {
    const [text, setText] = useState("");
    const [title, setTitle] = useState("");
    const [selectedTags, setSelectedTags] = useState([]);
    const dispatch = useDispatch();
    const author = useSelector((state) => state.session.user);
    const newPost = useSelector((state) => state.posts.new);
    const errors = useSelector((state) => state.errors.posts);

    useEffect(() => {
        return () => dispatch(clearPostErrors());
    }, [dispatch]);

    const makeAIcomment = async (text, newPost) => {
        try {
            const data = { prompt: text };
            const response = await jwtFetch("/api/posts/open-ai", {
                method: "POST",
                body: JSON.stringify(data),
            });
            const ans = await response.json();
            const commentData = {
                parentPost: newPost._id,
                text: ans.result,
                voteCount: 0,
                tags: [],
            };
            dispatch(composeComment(commentData));
        } catch (err) {
            console.error("ERROR STATUS", err.status);
            console.error("ERROR DATA", err.data);
            console.error("ERROR MESSAGE", err.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let newPost = await dispatch(
            composePost({ title, text, selectedTags })
        );
        await makeAIcomment(text, newPost);
        setText("");
        setTitle("");
        setSelectedTags([]);
    };

    const colors = [
        "tomato",
        "brown",
        "salmon",
        "cyan",
        "green",
        "orange",
        "gold",
        "violet",
        "pink",
    ];

    const changeColor = (e) => {
        const randomIndex = Math.floor(Math.random() * colors.length);
        const color = colors[randomIndex];
        const label = document.getElementById("label-loading-post");
        if (label) {
            label.style.color = color;
        }
    };

    setInterval(function () {
        changeColor();
    }, 1500);

    const updateTitle = (e) => setTitle(e.currentTarget.value);
    const updateText = (e) => setText(e.currentTarget.value);
    const updateTags = (e) => setSelectedTags([e.currentTarget.value]);
    return (
        <div id="container-create-post-form">
            <form className="compose-post" onSubmit={handleSubmit}>
                <div id="container-title">
                    <input
                        type="textarea"
                        id="title"
                        value={title}
                        onChange={updateTitle}
                        placeholder="Write a title..."
                        required
                    />
                </div>
                <div id="container-text-content">
                    <input
                        type="textarea"
                        id="text-content"
                        value={text}
                        onChange={updateText}
                        placeholder="Write your post..."
                        required
                    />
                </div>
                <div id="container-tags-dropmenu">
                    <TagInput
                        onChange={updateTags}
                        selectedTags={selectedTags}
                        setSelectedTags={setSelectedTags}
                    />
                </div>
                <div className="errors">{errors?.text}</div>
                <input type="submit" value="Submit" id="button-submit" />
            </form>
            <div className="post-preview">
                <label id="label-post-preview">Post Preview</label>
                <div>
                    {text ? (
                        <PostBox post={{ text, author, tags: selectedTags }} />
                    ) : (
                        <label id="label-loading-post"> Loading...</label>
                    )}
                </div>
            </div>
            <div className="previous-post">
                <label id="label-post-previous">Previous Post</label>
                <div>
                    {newPost ? (
                        <PostBox post={newPost} />
                    ) : (
                        <label id="label-no-previous-post">
                            {" "}
                            No previous post, go ahead and create one!
                        </label>
                    )}
                </div>
            </div>
        </div>
    );
}

export default PostCompose;
