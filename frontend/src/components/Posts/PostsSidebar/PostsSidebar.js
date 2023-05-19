import { useHistory } from 'react-router-dom';
import './PostsSidebar.css'

const PostsSidebar = () => {
    const history = useHistory();

    const goHome = e => {
        e.preventDefault();
        let path = '/';
        history.push(path);
    };

    const goCreatePost = e => {
        e.preventDefault();
        let path = '/posts/new';
        history.push(path);
    };

    return(
        <div className='posts-sidebar-container'>
            <div id='container-options'>
            {window.location.pathname !== '/posts' ?
                <button id='label-home' onClick={goHome}>
                    <i className="fa-solid fa-house" id='home-logo'></i> Home
                </button>
                : undefined }
                {/* <div id='container-popular-label'>
                    {window.location.pathname === '/posts' ? <button id='label-popular' >
                        <i className="fa-solid fa-fire" id='popular-logo' ></i> Popular
                    </button> : undefined }
                </div> */}
            </div>
            <button onClick={goCreatePost} id='create-post-button' >Create a post!</button>
        </div>
    )
}

export default PostsSidebar;