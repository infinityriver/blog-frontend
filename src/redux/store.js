import { configureStore } from "@reduxjs/toolkit";
import { postsReducer } from "./slices/postsReducer";
import { authReducer } from "./slices/authReducer";

const store = configureStore({
    reducer: {
        posts: postsReducer,
        auth: authReducer
    }
})

export default store