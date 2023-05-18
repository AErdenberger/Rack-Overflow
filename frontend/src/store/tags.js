
import jwtFetch from "./jwt";
import { RECEIVE_USER_LOGOUT } from "./session";


const RECEIVE_TAGS = "tags/RECEIVE_TAGS";
const RECEIVE_TAG = "tags/RECEIVE_TAG";
const RECEIVE_TAG_ERRORS = "tags/RECEIVE_POST_ERRORS";

export const receiveTags = tags =>({
    type: RECEIVE_TAGS,
    tags
});

export const receiveTag = tag =>({
    type: RECEIVE_TAG,
    tag
});
const receiveErrors = (errors) => ({
    type: RECEIVE_TAG_ERRORS,
    errors
});

export const getTags = (state) => {
    return state.tags ? Object.values(state.tags) : [];
}

export const getTag = ({state, tagId}) => {
    return state?.tags[tagId] ? state.ags[tagId] : {};
}

export const fetchTags = () => async (dispatch) =>{
    try{
        const res = await jwtFetch("/api/tags/getAllTags");
        const tags = await res.json();
        dispatch(receiveTags(tags)); 
    } catch (err) {
        const resBody = await err.json();
        if(resBody.statusCode === 400){
            dispatch(receiveErrors(resBody.errors));
        }
    }
};

export const fetchTag = ({tagId})=> async (dispatch) =>{
    try{
        const res = await jwtFetch("/api/tags/getTagName");
        const tag = await res.json();
        dispatch(receiveTag(tagId));
    } catch (err) {
        const resBody = await err.json();
        if(resBody.statusCode === 400){
            dispatch(receiveErrors(resBody.errors));
        }
    }
}

const tagReducer = (state = {}, action) =>{
    switch(action.type) {
        case RECEIVE_TAGS:
            return ({...state,  ...action.tags});
        case RECEIVE_TAG:
            return ({...state, [action.tag.id]: action.tag});
        case RECEIVE_TAG_ERRORS:
            return action.errors;
        default:
            return state;
            
    }
}

export default tagReducer;