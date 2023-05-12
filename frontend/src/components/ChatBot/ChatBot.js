
import { useState } from "react";
import { useDispatch } from "react-redux";
// import generate from "./generate1";

import jwtFetch from "../../store/jwt";

import "./ChatBot.css";

const ChatBot = ({}) => {
  

    const [inputText, setInputText] = useState("");

    const onChangeHandler = (e) => {
        e.preventDefault();
        setInputText(e.target.value);
        console.log('in change handler')
    };
    const handleSubmit = async (e) => {
        console.log('HHHHAAAANNDDLE')
        try {
            e.preventDefault();
            const data = { prompt: inputText};
            const response = await jwtFetch("/api/posts/open-ai", {
                method: "POST",
                body: JSON.stringify(data),
            });
            const ans = await response.json()
            console.log(ans);
            
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
        <div className="chatContainer">
            <form className="chatForm" onSubmit={handleSubmit}>
               
                    <input
                        className="chatInput"
                        placeholder="AI Input"
                        type="text"
                        value={inputText}
                        onChange={onChangeHandler}
                    />
               
                <button className="chatSubmit">Submit</button>
            </form>
            </div>
           
        </>
    );
};

export default ChatBot;