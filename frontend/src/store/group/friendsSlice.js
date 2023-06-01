import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllFriends } from "../../lib/api/unsplashService";

export const getFriendsThunk = createAsyncThunk('user/getFriends', 
  async (data, thunkAPI) => {
    try {
      const  response = await getAllFriends(data.userId);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState = {
    friends:[]
};

const friendsSlice = createSlice({
  name: "friends",
  initialState,

  reducers: {
    getFriends(state, action) {
        const { id } = action.payload;
        console.log("get groups", id);
    },

    // GROUP CART ACTIONS

  },
  extraReducers: (builder) => {
    builder
      .addCase(getFriendsThunk.fulfilled, (state, action) => {
        state.friends = action.payload;
        console.log(action.payload);
      });
  },
});

export const friendsActions = friendsSlice.actions;
export default friendsSlice;
