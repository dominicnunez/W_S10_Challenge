import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { historyState, filterState } from "../state/selectors";
import { fetchOrderHistory } from "../state/thunk";
import { setFilter } from "../state/slice";

export default function OrderList() {
  const dispatch = useDispatch();
  const orders = useSelector(historyState);
  const filter = useSelector(filterState);

  useEffect(() => {
    dispatch(fetchOrderHistory());
  }, [dispatch]);

  const filteredOrders =
    filter == "All" ? orders : orders.filter((order) => order.size == filter);

  const handleFilterChange = (size) => {
    dispatch(setFilter(size));
  };

  return (
    <div id="orderList">
      <h2>Pizza Orders</h2>
      <ol>
        {filteredOrders.map((order, index) => {
          // console.log({"current order map": order})
          const toppings = order.toppings || []; // Use an empty array if toppings is undefined
          const toppingCount = toppings?.length || 0;
          // const toppingText = toppingCount ==  1 ? "1 topping" : `${toppingCount} toppings`
          const toppingText =
            toppingCount === 0
              ? "no toppings"
              : toppingCount === 1
              ? "1 topping"
              : `${toppingCount} toppings`;

          return (
            <li key={index}>
              <div>
                {order.customer} ordered a size {order.size} with {toppingText}
              </div>
            </li>
          );
        })}
      </ol>
      <div id="sizeFilters">
        Filter by size:
        {["All", "S", "M", "L"].map((size) => {
          const className = `button-filter${size === filter ? " active" : ""}`;
          return (
            <button
              data-testid={`filterBtn${size}`}
              className={className}
              key={size}
              onClick={() => handleFilterChange(size)}
            >
              {size}
            </button>
          );
        })}
      </div>
    </div>
  );
}
