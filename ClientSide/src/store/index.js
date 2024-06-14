import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "./slice/getUserSlice";

const store = configureStore({
    reducer: {
        api: apiSlice
    }
})

export default store;

