import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addNewAddress, getCustomerAdresses } from "../../lib/api/unsplashService";

export const getAddressesThunk = createAsyncThunk('user/getAddresses', 
  async (data, thunkAPI) => {
    try {
      const  response = await getCustomerAdresses(data.userId);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const addAddressesThunk = createAsyncThunk('user/addAddresses', 
  async (data, thunkAPI) => {
    try {
      const  response = await addNewAddress(data.userId, data.address);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState = {
    address: [
        {
            id: 1,
            title: "Address 1",
            desc: "Üniversiteler Mah. Bilkent Üniversitesi 78. Yurt"
        },{
            id: 2,
            title: "Address 2",
            desc: "Üniversiteler Mah. Bilkent Üniversitesi 78. Yurt"
        },{
            id: 3,
            title: "Address 3",
            desc: "Üniversiteler Mah. Bilkent Üniversitesi 78. Yurt"
        }
    ],
    selectedAddress: {
        id: 1,
    },
    groupAddress: [
        {
            id: 1,
            title: "Group Address 1",
            desc: "Üniversiteler Mah. Bilkent Üniversitesi 78. Yurt"
        },{
            id: 2,
            title: "Group Address 2",
            desc: "Üniversiteler Mah. Bilkent Üniversitesi 78. Yurt"
        },{
            id: 3,
            title: "Group Address 3",
            desc: "Üniversiteler Mah. Bilkent Üniversitesi 78. Yurt"
        }
    ],
    selectedGroupAddress: {
        id: 1,
    }
};

const addressSlice = createSlice({
  name: "order",
  initialState,

  reducers: {
    // ACTIONS
    changeSelectedAddress(state, action) {
        const { id } = action.payload;
        state.selectedAddress.id = id;
    },
    getGroupAddresses(state, action) {
        console.log("get group addresses");
    },
    changeSelectedGroupAddress(state, action) {
        const { id } = action.payload;
        state.selectedGroupAddress.id = id;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAddressesThunk.fulfilled, (state, action) => {
        state.address = action.payload;
        console.log(action.payload);
      })
      .addCase(addAddressesThunk.fulfilled, (state, action) => {
        console.log(action.payload);
      })
  },
});

export const addressActions = addressSlice.actions;
export default addressSlice;
