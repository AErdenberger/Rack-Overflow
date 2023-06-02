import jwtFetch from "./jwt";
import { RECEIVE_USER_LOGOUT } from "./session";

const RECEIVE_COMMENTS = "comments/RECEIVE_COMMENTS";
const RECEIVE_COMMENT = "comments/RECEIVE_COMMENT";
const RECEIVE_NEW_COMMENT = "comment/RECEIVE_NEW_COMMENT";
const RECEIVE_COMMENT_ERRORS = "comment/RECEIVE_COMMENT_ERRORS";
const CLEAR_COMMENT_ERRORS = "comment/CLEAR_COMMENT_ERRORS";
const REMOVE_COMMENT = 'comment/REMOVE_COMMENT';

const receiveComments = comments => ({
    type: RECEIVE_COMMENTS,
    comments
});

const receiveComment = comment => ({
    type: RECEIVE_COMMENT,
    comment
});

const receiveNewComment = comment => ({
    type: RECEIVE_NEW_COMMENT,
    comment
});

const removeComment = commentId => ({
    type: REMOVE_COMMENT,
    commentId
});

const receiveErrors = errors => ({
    type: RECEIVE_COMMENT_ERRORS,
    errors
});

export const clearCommentErrors = errors => ({
    type: CLEAR_COMMENT_ERRORS,
    errors
});

export const fetchAI = (prompt, post) => async (dispatch) => {

    try{
    const response = await jwtFetch("/api/answers/open-ai", {
        method: "POST",
        headers: {
            "Content-Type": 'application/json'
        }, 
        body: JSON.stringify({prompt})
    });
    
    const ans = await response.json();
    
    // {result: Text string}
    // let data = {parentPost:post, text: ans.result, tags:null }
    // dispatch(composeComment(data));
    return ans.result
  
} catch (err) {
    const resBody = await err.json();
    if(resBody.statusCode === 400){
        dispatch(receiveErrors(resBody.errors));
    }
}
    
};

export const fetchComments = (postId) => async dispatch => {
    try{
        const res = await jwtFetch(`/api/answers/${postId}`);
        const comments = await res.json();
        dispatch(receiveComments(comments));
    } catch (err) {
        const resBody = await err.json();
        if(resBody.statusCode === 400){
            dispatch(receiveErrors(resBody.errors));
        }
    }
};

export const fetchComment = (commentId) => async dispatch => {
    try{
        const res = await jwtFetch(`/api/answers/${commentId}`);
        const comment = await res.json();
        dispatch(receiveComment(comment));
    } catch (err) {
        const resBody = await err.json();
        if(resBody.statusCode === 400){
            dispatch(receiveErrors(resBody.errors));
        }
    }
};

export const composeComment = data => async dispatch => {
    try{
        const res = await jwtFetch(`/api/answers/${data.parentPost}`, {
            method: 'POST',
            body: JSON.stringify(data)
        })
        const comment = await res.json();
        dispatch(receiveNewComment(comment));
    } catch(err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
            return dispatch(receiveErrors(resBody.errors));
        }
    }
};

export const updateComment = data => async dispatch => {
    try{
        const res = await jwtFetch(`/api/answers/${data.commentId}`, {
            method: 'PATCH',
            body: JSON.stringify(data)
        });
        const comment = await res.json();
        dispatch(receiveComment(comment));
    } catch (err) {
        const resBody = await err.json();
        if(resBody.statusCode === 400) {
            return dispatch(receiveErrors(resBody.errors));
        }
    }
};

export const deleteComment = (commentId) => async dispatch => {
    try{
        await jwtFetch(`/api/answers/${commentId}`, {
            method: 'DELETE'
        })
        dispatch(removeComment(commentId));
    } catch (err) {
        const resBody = await err.json();
        if(resBody.statusCode === 400){
            dispatch(receiveErrors(resBody.errors));
        }
    }
};

const nullErrors = null;

export const commentErrorReducer = (state = nullErrors, action) => {
    switch(action.type) {
        case RECEIVE_COMMENT_ERRORS:
            return action.errors;
        case RECEIVE_NEW_COMMENT:
        case CLEAR_COMMENT_ERRORS:
            return nullErrors;
        default:
            return state;
    }
};

const commentsReducer = (state = { all: {}, user: {}, new: undefined}, action) => {
    switch(action.type){
        case RECEIVE_COMMENTS:
            return {...state, all: action.comments, new: undefined};
        case RECEIVE_COMMENT:
            return{...state, all: {...state.all, [action.comment._id]: action.comment } };
        case RECEIVE_NEW_COMMENT:
            return {...state, all: {...state.all, [action.comment._id]: action.comment }};
        case RECEIVE_USER_LOGOUT:
            return {...state, user: {}, new: undefined };
        default:
            return state;
    }
};

export default commentsReducer;