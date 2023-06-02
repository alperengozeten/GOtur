import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addFoodToGroupPurchase, addFoodToSinglePurchase, deleteFoodFromGroupPurchase, deleteFoodFromSinglePurchase, getProductUnpaidGroupPurchase, getProductUnpaidSinglePurchase, getUnpaidGroupPurchase, getUnpaidSinglePurchase } from "../../lib/api/unsplashService";

export const getProductsUnpaidSinglePurchaseThunk = createAsyncThunk('purchase/getProductsUnpaidSingle', 
  async (data, thunkAPI) => {
    try {
      const  response = await getProductUnpaidSinglePurchase(data.userId);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getUnpaidSinglePurchaseThunk = createAsyncThunk('purchase/getUnpaidSingle', 
  async (data, thunkAPI) => {
    try {
      const  response = await getUnpaidSinglePurchase(data.userId);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getProductsUnpaidGroupPurchaseThunk = createAsyncThunk('purchase/getProductsUnpaidGroup', 
  async (data, thunkAPI) => {
    try {
      const  response = await getProductUnpaidGroupPurchase(data.userId);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getUnpaidGroupPurchaseThunk = createAsyncThunk('purchase/getUnpaidGroup', 
  async (data, thunkAPI) => {
    try {
      const  response = await getUnpaidGroupPurchase(data.userId);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const addFoodToSinglePurchaseThunk = createAsyncThunk('purchase/addFoodSingle', 
  async (data, thunkAPI) => {
    try {
      const  response = await addFoodToSinglePurchase(data.food, data.userId);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const addFoodToGroupPurchaseThunk = createAsyncThunk('purchase/addFoodGroup', 
  async (data, thunkAPI) => {
    try {
      const  response = await addFoodToGroupPurchase(data.food, data.userId);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteFoodFromSinglePurchaseThunk = createAsyncThunk('purchase/deleteFoodSingle', 
  async (data, thunkAPI) => {
    try {
      const  response = await deleteFoodFromSinglePurchase(data.customer_id, data.food_id, data.food_order);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteFoodFromGroupPurchaseThunk = createAsyncThunk('purchase/deleteFoodGroup', 
  async (data, thunkAPI) => {
    try {
      const  response = await deleteFoodFromGroupPurchase(data.group_id, data.food_id, data.food_order);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
const initialState = {
    pastOrders: [
      {
        id: 1,
        items: [
          {
            id: '04',
            title: 'Maxican Green Wave',
            image01: '/static/media/product_4.1.3c8ecc492220a3922731.jpg',
            price: 110,
            quantity: 1,
            totalPrice: 110
          },
          {
            id: '08',
            title: 'Thin Cheese Pizza',
            image01: '/static/media/product_3.2.ebcb16b50e4ef0060a5e.jpg',
            price: 110,
            quantity: 1,
            totalPrice: 110
          },
          {
            id: '05',
            title: 'Cheese Burger',
            image01: '/static/media/product_04.f7c5294d0481fb12cc4c.jpg',
            price: 24,
            quantity: 1,
            totalPrice: 24
          }
        ],
        totalQuantity: 3,
        totalAmount: 244,
        date: "29 May 2023",
        comment: "This was very good!"
      },
      {
        id: 2,
        items: [
          {
            id: '04',
            title: 'Maxican Green Wave',
            image01: '/static/media/product_4.1.3c8ecc492220a3922731.jpg',
            price: 110,
            quantity: 1,
            totalPrice: 110
          },
          {
            id: '08',
            title: 'Thin Cheese Pizza',
            image01: '/static/media/product_3.2.ebcb16b50e4ef0060a5e.jpg',
            price: 110,
            quantity: 1,
            totalPrice: 110
          },
          {
            id: '05',
            title: 'Cheese Burger',
            image01: '/static/media/product_04.f7c5294d0481fb12cc4c.jpg',
            price: 24,
            quantity: 1,
            totalPrice: 24
          }
        ],
        totalQuantity: 3,
        totalAmount: 244,
        date: "29 May 2023",
        comment: ""
      }
    ],
    currentCart: 0,
    unpaidSinglePurchase: JSON.parse(localStorage.getItem("singleCart")),
    unpaidGroupPurchase: JSON.parse(localStorage.getItem("groupCart")),
    itemAdded: 0
};

const orderSlice = createSlice({
  name: "order",
  initialState,

  reducers: {
    // ACTIONS
    getPastOrders(state, action) {
        console.log("get restaurants");
    },
    updateCurrentCart(state, action) {
      const {id} = action.payload;
      state.currentCart = id;
    },
    updateItemAdded(state, action) {
      state.itemAdded = 0;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUnpaidGroupPurchaseThunk.fulfilled, (state, action) => {
        console.log(action.payload);
        state.unpaidGroupPurchase = action.payload;
        localStorage.setItem("groupCart", JSON.stringify(state.unpaidGroupPurchase));
      })
      .addCase(getProductsUnpaidGroupPurchaseThunk.fulfilled, (state, action) => {
        console.log(action.payload);
        state.unpaidGroupPurchase = {...state.unpaidGroupPurchase, products: action.payload};
        localStorage.setItem("groupCart", JSON.stringify(state.unpaidGroupPurchase));
      })
      .addCase(getUnpaidSinglePurchaseThunk.fulfilled, (state, action) => {
        console.log(action.payload);
        state.unpaidSinglePurchase = action.payload;
        localStorage.setItem("singleCart", JSON.stringify(state.unpaidSinglePurchase));
      })
      .addCase(getProductsUnpaidSinglePurchaseThunk.fulfilled, (state, action) => {
        console.log(action.payload);
        state.unpaidSinglePurchase = {...state.unpaidSinglePurchase, products: action.payload};
        localStorage.setItem("singleCart", JSON.stringify(state.unpaidSinglePurchase));
      })
      .addCase(addFoodToGroupPurchaseThunk.fulfilled, (state, action) => {
        console.log(action.payload);
        state.itemAdded = 1;
      })
      .addCase(addFoodToSinglePurchaseThunk.fulfilled, (state, action) => {
        console.log(action.payload);
        state.itemAdded = 1;
      })
      .addCase(deleteFoodFromGroupPurchaseThunk.fulfilled, (state, action) => {
        console.log(action.payload);
        state.itemAdded = 1;
      })
      .addCase(deleteFoodFromSinglePurchaseThunk.fulfilled, (state, action) => {
        console.log(action.payload);
        state.itemAdded = 1;
      })
  },
});

export const orderActions = orderSlice.actions;
export default orderSlice;
