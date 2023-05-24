import jwtFetch from "./jwt";
import { RECEIVE_USER_LOGOUT } from "./session";

const RECEIVE_POSTS = "posts/RECEIVE_POSTS";
const RECEIVE_POST = "posts/RECEIVE_POST";
const REMOVE_POST = "posts/REMOVE_POST";
const RECEIVE_USER_POSTS = "posts/RECEIVE_USER_POSTS";
const RECEIVE_NEW_POST = "posts/RECEIVE_NEW_POST";
const RECEIVE_POST_ERRORS = "posts/RECEIVE_POST_ERRORS";
const CLEAR_POST_ERRORS = "posts/CLEAR_POST_ERRORS";

const receivePosts = (posts) => ({
    type: RECEIVE_POSTS,
    posts
});

const receivePost = post => ({
  type: RECEIVE_POST,
  post
})

const removePost = postId => ({
  type: REMOVE_POST,
  postId
})

const receiveUserPosts = (posts) => ({
    type: RECEIVE_USER_POSTS,
    posts,
});

const receiveNewPost = (post) => ({
    type: RECEIVE_NEW_POST,
    post,
});

const receiveErrors = (errors) => ({
    type: RECEIVE_POST_ERRORS,
    errors,
});

export const clearPostErrors = (errors) => ({
    type: CLEAR_POST_ERRORS,
    errors,
});

export const fetchPosts = () => async (dispatch) => {
    try {
        const res = await jwtFetch("/api/posts");
        const posts = await res.json();
        dispatch(receivePosts(posts));
    } catch (err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
            dispatch(receiveErrors(resBody.errors));
        }
    }
};

export const fetchPost = (postId) => async (dispatch) => {
    try {
        const res = await jwtFetch(`/api/posts/${postId}`);
        const post = await res.json();
        dispatch(receivePost(post));
    } catch (err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
            dispatch(receiveErrors(resBody.errors));
        }
    }
};

export const fetchUserPosts = (id) => async (dispatch) => {
    try {
        const res = await jwtFetch(`/api/posts/user/${id}`);
        const posts = await res.json();
        dispatch(receiveUserPosts(posts));
    } catch (err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
            return dispatch(receiveErrors(resBody.errors));
        }
    }
  };

  export const fetchTagsPosts = tag => async dispatch => {
    try {
        const res = await jwtFetch(`/api/posts?tag=${tag}`);
        const posts = await res.json();
        dispatch(receiveUserPosts(posts));
    } catch (err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
            return dispatch(receiveErrors(resBody.errors));
        }
    }
};

// this is for the searchBar
export const fetchTagSearch = (tag) => async (dispatch) => {

  const encodedTag = tag
    .split(",") 
    .map((word) => encodeURIComponent(word.trim())) 
    .join(",");
  
    try {
      const res = await jwtFetch(`/api/posts?tags=${encodedTag}`);
      const posts = await res.json();
      dispatch(receivePosts(posts));
  } catch (err) {
      const resBody = await err.json();
      if (resBody.statusCode === 400) {
          return dispatch(receiveErrors(resBody.errors));
      }
  }
};
  
export const composePost = data => async dispatch => {
  try {
    const res = await jwtFetch('/api/posts/', {
      method: 'POST',
      body: JSON.stringify(data)
    });
    const post = await res.json();
    dispatch(receiveNewPost(post));
    return post;
  } catch(err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      return dispatch(receiveErrors(resBody.errors));
    }
  }
};

export const updatePost = data => async dispatch => {
  try {
    const res = await jwtFetch(`/api/posts/${data.postId}`, {
      method: 'PATCH',
      body: JSON.stringify(data)
    });
    const post = await res.json();
    dispatch(receivePost(post));
  } catch(err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      return dispatch(receiveErrors(resBody.errors));
    }
  }
};

export const deletePost = (postId) => async dispatch => {
  try {
    await jwtFetch(`/api/posts/${postId}`, {
      method: 'DELETE'
    });
    dispatch(removePost(postId));
  } catch (err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      dispatch(receiveErrors(resBody.errors));
    }
  }
}



const nullErrors = null;

export const postErrorsReducer = (state = nullErrors, action) => {
    switch (action.type) {
        case RECEIVE_POST_ERRORS:
            return action.errors;
        case RECEIVE_NEW_POST:
        case CLEAR_POST_ERRORS:
            return nullErrors;
        default:
            return state;
    }
};

const postsReducer = (state = { all: {}, user: [], new: undefined }, action) => {
    let filteredUserPosts;
    switch(action.type) {
      case RECEIVE_POSTS:
        return { ...state, all: action.posts, new: undefined};
      case RECEIVE_POST:
        return {
          ...state, all: {...state.all, [action.post._id]: action.post} };
      case REMOVE_POST:
        filteredUserPosts = state.user.filter(userPost => {
          return userPost._id.toString() !== action.postId.toString();
        });
        const newState = {...state};
        delete newState.all[action.postId]
        return {...newState, user: filteredUserPosts, new: undefined };
      case RECEIVE_USER_POSTS:
        return { ...state, user: action.posts, new: undefined};
      case RECEIVE_NEW_POST:
        const mappedUserPosts = state.user.map(userPost => {
          return userPost;
        })
        // return { ...state, new: action.post, };
        return { ...state, new: action.post, user: mappedUserPosts};
      case RECEIVE_USER_LOGOUT:
        return { ...state, user: [], new: undefined }
      default:
        return state;
    }
};

export default postsReducer;
