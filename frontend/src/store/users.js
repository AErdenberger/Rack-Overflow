
export const getUsers = state => {
    return state?.users ? Object.values(state.users) : [];
};


