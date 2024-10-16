import { createSlice } from "@reduxjs/toolkit";

const pizzaSlice = createSlice({
    
    name: "pizza",
    initialState: {
        name: "",
        size: "",
        toppings: [],
        filter: "All",
        message: "",
        error: "",
    },

    reducers: {
        setName: (state, action) => {
            state.name = action.payload
        },
        setSize: (state, action) => {
            state.size = action.payload
        },
        addTopping: (state, action) => {
            state.toppings.push(action.payload)
        },
        removeTopping: (state, action) => {
            state.toppings = state.toppings.filter(topping => topping !== action.payload)
        },
        setFilter: (state, action) => {
            state.filter = action.payload
        },
        setMessage: (state, action) => {
            state.message = action.payload
        },
        setError: (state, action) => {
            state.error = action.payload
        },
    }
})

export const { setName, setSize, setToppings, setFilter } = pizzaSlice.actions;
export default pizzaSlice.reducer;