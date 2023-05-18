import ModalEditComment from "../../../modal/Modal";
import CommentUpdate from "./CommentUpdate";
import { useHistory, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const CommentUpdateModal = () => {
    const { commentId } = useParams();
    const history = useHistory();
    const showUpdateCommentModal = true;
    const comment = useSelector(state => state.comments.all[commentId])
    
    const changeRoute = () => {
        history.goBack();
    };

    return(
        <>
            {showUpdateCommentModal && (
                <ModalEditComment closeModal={changeRoute} component={<CommentUpdate comment={comment} />} />
            )}
        </>
    );
};

export default CommentUpdateModal;