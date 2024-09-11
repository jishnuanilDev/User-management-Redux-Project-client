import { createSlice } from '@reduxjs/toolkit'



const INITIAL_STATE = {
    users: [],
    isLoading: false,
    error: false,
    success: false,
    userToEdit:null
}


const adminSlice = createSlice({
    name: 'admin',
    initialState: INITIAL_STATE,
    reducers: {
        fetchUsers(state, action) {
            state.users = action.payload;
        },
        addUserState(state, action) {
            state.users.push(action.payload);
        },
        setUserToEdit(state, action) {
            console.log('actionPayload user Id:',action.payload)
           state.userToEdit = action.payload
        },
        deleteUserState(state, action) {
            console.log('Working 2');
            state.users = state.users.filter(user => user._id !== action.payload);
        },
        // searchState(state, action) {
        //     const { prefix } = action.payload;
        //     if (prefix === '') {
        //         state.users = [...state.users];
        //     } else {
        //         const regex = new RegExp(`^${prefix}`, "i");
        //         state.users = state.users.filter(user => regex.test(user.username));
        //     }
        // }
    }

})

export const {
    fetchUsers,
    addUserState,
    setUserToEdit,
    deleteUserState
} = adminSlice.actions;


export const selectUserToEdit = (state) => state.user.userToEdit;
export const selectUsersFrom = (state)=> state.user.users
export default adminSlice.reducer;