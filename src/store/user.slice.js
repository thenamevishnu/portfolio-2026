const { createSlice } = require("@reduxjs/toolkit");

const userSlice = createSlice({
    name: "pf-user",
    initialState: {
        uid: "",
        email: "",
        name: "",
        picture: ""
    },
    reducers: {
        add_user: (state, action) => {
            state.uid = action.payload.uid;
            state.email = action.payload.email;
            state.name = action.payload.name;
            state.picture = action.payload.picture;
        },
        remove_user: (state) => {
            state.uid = "";
            state.email = "";
            state.name = "";
            state.picture = "";
        }
    }
})

export const { add_user, remove_user } = userSlice.actions;
export const { reducer: userReducer } = userSlice;