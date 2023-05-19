import jwtFetch from "./jwt";

const RECEIVE_VOTES = "votes/RECEIVE_VOTES";
const RECEIVE_VOTE = "votes/RECEIVE_VOTE";
const RECEIVE_VOTE_ERRORS = "votes/RECEIVE_VOTES_ERRORS";
const CLEAR_VOTE_ERRORS = "votes/CLEAR_POST_ERRORS";

const receiveVotes = votes => ({
    type: RECEIVE_VOTES,
    votes
});

const receiveVote = vote => ({
    type: RECEIVE_VOTE,
    vote
})

const receiveErrors = (errors) => ({
    type: RECEIVE_VOTE_ERRORS,
    errors,
});

export const clearVoteErrors = (errors) => ({
    type: CLEAR_VOTE_ERRORS,
    errors,
});

export const fetchPostVotes = (postId) => async dispatch => {
    try {
        const res = await jwtFetch(`/api/postvotes/votecount/${postId}`);
        const votes = await res.json();
        dispatch(receiveVotes(votes)); 
    } catch (err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
            dispatch(receiveErrors(resBody.errors));
        }
    }
};

export const fetchPostVote = (postId, userId) => async dispatch => {
    try {
        const res = await jwtFetch(`/api/postvotes/${postId}/user/${userId}`);
        const vote = await res.json();
        dispatch(receiveVote(vote)); 
    } catch (err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
            dispatch(receiveErrors(resBody.errors));
        }
    }
}

export const createPostVote = (data, postId) => async dispatch => {
    try {
        const res = await jwtFetch(`/api/postvotes/${postId}`, {
            method: 'POST',
            body: JSON.stringify({vote: data})
        });
        const votes = await res.json();
        dispatch(receiveVotes(votes));
    } catch (err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
            return dispatch(receiveErrors(resBody.errors));
        }
    }
};


export const fetchAnswerVotes = (answerId) => async dispatch => {
    try {
        const res = await jwtFetch(`/api/answervotes/votecount/${answerId}`);
        const votes = await res.json();
        dispatch(receiveVotes(votes)); 
    } catch (err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
            dispatch(receiveErrors(resBody.errors));
        }
    }
};

export const createAnswerVote = (data, answerId) => async dispatch => {
    try {
        const res = await jwtFetch(`/api/answervotes/${answerId}`, {
            method: 'POST',
            body: JSON.stringify({vote: data})
        });
        const votes = await res.json();
        dispatch(receiveVotes(votes));
    } catch (err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
            return dispatch(receiveErrors(resBody.errors));
        }
    }
};

const nullErrors = null;

export const votesErrorsReducer = (state = nullErrors, action) => {
    switch(action.type) {
        case RECEIVE_VOTE_ERRORS:
            return action.errors
        case CLEAR_VOTE_ERRORS:
            return nullErrors;
        default:
            return state;
    }
};


const votesReducer = (state = { voteTotal: 0, vote: {}}, action) => {
    let newState = {...state}
    switch(action.type) {
        
        case RECEIVE_VOTES:
            newState = {...newState, voteTotal: action.votes}
            return newState;
        case RECEIVE_VOTE:
            newState = {...newState, ...{vote: action.vote}};
            return newState;
        default:
            return state;
    }
};

export default votesReducer;

