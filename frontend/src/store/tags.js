
import jwtFetch from "./jwt";
import { RECEIVE_USER_LOGOUT } from "./session";


const RECEIVE_TAGS = "tags/RECEIVE_TAGS";
const RECEIVE_TAG = "tags/RECEIVE_TAG";
const RECEIVE_POST_ERRORS = "posts/RECEIVE_POST_ERRORS";

export const receiveTags = tags =>({
    type: RECEIVE_TAGS,
    tags
});

export const receiveTag = tag =>({
    type: RECEIVE_TAG,
    tag
});
const receiveErrors = (errors) => ({
    type: RECEIVE_POST_ERRORS,
    errors,
});

export const getTags = ({state}) => {
    return state?.Tags ? Object.values(state.Tags) : [];
}

export const getTag = ({tagId}) => {
    return state?.Tags[tagId] ? state.Tags[tagId] : {};
}

export const fetchTags = () => async (dispatch) =>{
    try{
        const res = await jwtFetch("/api/tags");
        const tags = await res.json();
        dispatch(receiveTags(tags)); 
    } catch (err) {
        const resBody = await err.json();
        if(resBody.statusCode === 400){
            dispatch(receiveErrors(resBody.errors));
        }
    }
};

