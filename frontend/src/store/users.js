import jwtFetch from "./jwt";

const RECEIVE_USERS = 'users/RECEIVE_USERS';

const receiveUsers = users => ({
    type: RECEIVE_USERS,
    users
});

export const getUsers = state => {
    return state?.users ? Object.values(state.users) : [];
};

export const fetchUsers = () => async(dispatch) => {
    // try{
    //     const res = await jwtFetch(`/api/`)
    // }
};
