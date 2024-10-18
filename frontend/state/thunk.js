import { createAsyncThunk } from "@reduxjs/toolkit";

const URL = "http://localhost:9009/api/pizza";

const handleResponse = async (response) => {
  if (!response.ok) {
    // console.log(response)
    // debugger
    const errorData = await response.json();
    const errorMessage = errorData.message || "Failed to fetch pizzas";
    throw new Error(errorMessage);
  }
  // console.log(response)
//   debugger
  return await response;
};

export const fetchOrderHistory = createAsyncThunk(
  "pizzas/fetchOrderHistory",
  async () => {
    const response = await fetch(`${URL}/history`);
    await handleResponse(response);
    return await response.json();
  }
);

export const submitOrder = createAsyncThunk(
  "pizzas/submitOrder",
  async (order) => {
    const response = await fetch(`${URL}/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });

    await handleResponse(response);
  }
);
