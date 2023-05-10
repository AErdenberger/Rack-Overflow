import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearPostErrors, composePost } from "../../../store/posts";
import PostBox from "../PostBox/PostBox";
import "./PostCompose.css";
import ChatBot from "../../ChatBot/ChatBot";
import jwtFetch from "../../../store/jwt";

function PostCompose() {
    const [text, setText] = useState("");
    const dispatch = useDispatch();
    const author = useSelector((state) => state.session.user);
    const newPost = useSelector((state) => state.posts.new);
    const errors = useSelector((state) => state.errors.posts);

    useEffect(() => {
        return () => dispatch(clearPostErrors());
    }, [dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(composePost({ text }));
      //   console.log('TTTTTTText', text)
      //   const data = { prompt: text};
       
      //   const response = await jwtFetch("/api/posts/open-ai", {
      //     method: "POST",
      //     body: JSON.stringify(data),
      // });
      // const ans = await response.json()
      // console.log(ans);
      //   console.log(ans);
        setText("");
    };

    const update = (e) => setText(e.currentTarget.value);

    return (
        <>
            <form className="compose-post" onSubmit={handleSubmit}>
                <input
                    type="textarea"
                    value={text}
                    onChange={update}
                    placeholder="Write your post..."
                    required
                />
                <div className="errors">{errors?.text}</div>
                <input type="submit" value="Submit" />
            </form>
            <div className="post-preview">
                <ChatBot/>
                <h3>Post Preview</h3>
                {text ? <PostBox post={{ text, author }} /> : undefined}
            </div>

            <div className="previous-post">
                <h3>Previous Post</h3>
                {newPost ? <PostBox post={newPost} /> : undefined}
            </div>
        </>
    );
}

export default PostCompose;
