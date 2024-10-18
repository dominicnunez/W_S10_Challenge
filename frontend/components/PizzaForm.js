import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormHandlers } from "../hooks/hooks.js";
import { fetchOrderHistory, submitOrder } from "../state/thunk.js";
import {
  pendingState,
  errorState,
  nameState,
  sizeState,
  toppingsState,
} from "../state/selectors.js";
import { setName, setSize, addTopping, removeTopping, clearToppings } from "../state/slice.js";

export default function PizzaForm() {
  const dispatch = useDispatch();
  const pending = useSelector(pendingState);
  const error = useSelector(errorState);
  const name = useSelector(nameState);
  const size = useSelector(sizeState);
  const toppings = useSelector(toppingsState);

  const fieldActions = {
    fullName: setName,
    size: setSize,
  };

  const { handleInputChange, handleCheckboxChange } = useFormHandlers(
    fieldActions,
    addTopping,
    removeTopping
  );

  const resetForm = () => {
    dispatch(setName(""))
    dispatch(setSize(""))
    dispatch(clearToppings())
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const order = {
      fullName: name,
      size,
      toppings
    };
    
    dispatch(submitOrder(order))
      .then((result) => {
        if (result.type === 'pizzas/submitOrder/fulfilled'){
          dispatch(fetchOrderHistory())
          resetForm()
        }
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Pizza Form</h2>
      {pending && <div className="pending">Order in progress...</div>}
      {error && <div className="failure">Order failed: {error}</div>}

      <div className="input-group">
        <div>
          <label htmlFor="fullName">Full Name</label>
          <br />
          <input
            data-testid="fullNameInput"
            id="fullName"
            name="fullName"
            placeholder="Type full name"
            type="text"
            value={name}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="input-group">
        <div>
          <label htmlFor="size">Size</label>
          <br />
          <select
            data-testid="sizeSelect"
            id="size"
            name="size"
            value={size}
            onChange={handleInputChange}
          >
            <option value="">----Choose size----</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
          </select>
        </div>
      </div>

      <div className="input-group">
        <label>
          <input
            data-testid="checkPepperoni"
            name="Pepperoni"
            value="1"
            type="checkbox"
            checked={toppings.includes("1")}
            onChange={handleCheckboxChange}
          />
          Pepperoni
          <br />
        </label>
        <label>
          <input
            data-testid="checkGreenpeppers"
            name="Green Peppers"
            value="2"
            type="checkbox"
            checked={toppings.includes("2")}
            onChange={handleCheckboxChange}
          />
          Green Peppers
          <br />
        </label>
        <label>
          <input
            data-testid="checkPineapple"
            name="Pineapple"
            value="3"
            type="checkbox"
            checked={toppings.includes("3")}
            onChange={handleCheckboxChange}
          />
          Pineapple
          <br />
        </label>
        <label>
          <input
            data-testid="checkMushrooms"
            name="Mushrooms"
            value="4"
            type="checkbox"
            checked={toppings.includes("4")}
            onChange={handleCheckboxChange}
          />
          Mushrooms
          <br />
        </label>
        <label>
          <input
            data-testid="checkHam"
            name="Ham"
            value="5"
            type="checkbox"
            checked={toppings.includes("5")}
            onChange={handleCheckboxChange}
          />
          Ham
          <br />
        </label>
      </div>
      <input data-testid="submit" type="submit" />
    </form>
  );
}
