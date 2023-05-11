import { useHistory } from 'react-router-dom';
import './PostsSidebar.css'

const PostsSidebar = () => {
    const history = useHistory();

    const goCreatePost = e => {
        let path = '/posts/new';
        history.push(path);
    };

    return(
        <div className='posts-sidebar-container'>
            <div id='container-options'>
                <button id='label-home'>
                    <i className="fa-solid fa-house"></i> Home
                </button>
                <div id='container-popular-label'>
                    <button id='label-popular'>
                        <i className="fa-solid fa-fire" id='popular-logo' ></i> Popular
                    </button>
                </div>
            </div>
            <button onClick={goCreatePost} id='create-post-button' >Create a post!</button>
        </div>
    )
}

export default PostsSidebar;