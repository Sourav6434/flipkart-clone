import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

const initialState  ={
    isLoading: false,
    data: null,
    isError: false
}

// Action
export const fetchUserDetails = createAsyncThunk("fetchUserDetails", async (id) => {

    const response = await fetch(`http://localhost:4000/api/user/userdetails/${id}`);
    return (await response.json()) 
})


const apiSlice = createSlice({
    name: "fetchapi",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(fetchUserDetails
            .pending, (state) => {
                state.isLoading = true;
            });
        builder.addCase(fetchUserDetails
            .fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            });
        builder.addCase(fetchUserDetails
            .rejected, (state, action) => {
                state.isError = true;
                console.log("Error: ", action.payload);
            });
    }
})

export default apiSlice.reducer;