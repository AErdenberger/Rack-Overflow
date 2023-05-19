import { useState, useEffect } from 'react';
import { deleteComment } from '../../../store/comments';
import { useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { fetchComments } from '../../../store/comments';
import './CommentButton.css';

function CommentButton ({comment}) {
    const { postId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const [showModalEdit, setShowModalEdit] = useState(false);

    const remove = () => {
        dispatch(deleteComment(comment._id));
        dispatch(fetchComments(postId));
    }

    useEffect(() => {
        dispatch(fetchComments(postId));
    }, [dispatch]);

    const goToUpdate = () => {
        let path = `/${postId}/answer/${comment._id}/update`;
        history.push(path);
    }

    return(
        <div id='dropdown'>
            <button id='dropbtn'>
                <div id='container-info-logo'>
                    <i className="fa-solid fa-ellipsis" id='options-button'></i>
                </div>
            </button>
            <div id='dropdown-content'>
                <button onClick={goToUpdate} id='button-edit-comment'>Edit comment</button>
                <button onClick={remove} id='button-delete-comment'>Delete comment</button>
            </div>
        </div>
    )
};

export default CommentButton;