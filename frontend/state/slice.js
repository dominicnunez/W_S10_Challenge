import { createSlice } from "@reduxjs/toolkit";
import { fetchOrderHistory, submitOrder } from "./thunk";

const setValue = (state, action, key) => {
  state[key] = action.payload;
};

const pizzaSlice = createSlice({
  name: "pizzas",
  initialState: {
    name: "",
    size: "",
    toppings: [],
    pending: false,
    filter: "All",
    message: "",
    error: null,
    history: [],
  },

  reducers: {
    setName: (state, action) => setValue(state, action, "name"),
    setSize: (state, action) => setValue(state, action, "size"),

    addTopping: (state, action) => {
      state.toppings.push(action.payload);
    },
    removeTopping: (state, action) => {
      state.toppings = state.toppings.filter(
        (topping) => topping !== action.payload
      );
    },

    setFilter: (state, action) => setValue(state, action, "filter"),
  },

  extraReducers: (builder) => {
    const handleAsyncStatus = (state, action, type) => {
      switch (type) {
        case "pending":
          state.pending = true;
          break;
        case "fulfilled":
          state.pending = false;
          state.error = null;
          break;
        case "rejected":
          state.pending = false;
          state.error = action.error.message;
          break;
      }
    };

    builder
      .addCase(fetchOrderHistory.pending, (state) =>
        handleAsyncStatus(state, null, "pending")
      )
      .addCase(fetchOrderHistory.fulfilled, (state, action) => {
        handleAsyncStatus(state, action, "fulfilled");
        state.history = action.payload;
      })
      .addCase(fetchOrderHistory.rejected, (state, action) =>
        handleAsyncStatus(state, action, "rejected")
      )

      .addCase(submitOrder.pending, (state) =>
        handleAsyncStatus(state, null, "pending")
      )
      .addCase(submitOrder.fulfilled, (state, action) => {
        handleAsyncStatus(state, action, "fulfilled");
        state.message = action.payload;
      })
      .addCase(submitOrder.rejected, (state, action) =>
        handleAsyncStatus(state, action, "rejected")
      );
  },
});

export const { setName, setSize, addTopping, removeTopping, setFilter } =
  pizzaSlice.actions;
export default pizzaSlice.reducer;
