import React from "react";
import { useSelector } from "react-redux";
import { pendingState, errorState, nameState, sizeState, toppingsState } from "../state/selectors.js";

const initialFormState = {
  // suggested
  fullName: "",
  size: "",
  1: false,
  2: false,
  3: false,
  4: false,
  5: false,
};

export default function PizzaForm() {
  const pending = useSelector(pendingState);
  const error = useSelector(errorState);
  const name = useSelector(nameState);
  const size = useSelector(sizeState);
  const toppings = useSelector(toppingsState);

  return (
    <form>
      <h2>Pizza Form</h2>
      {pending && <div className="pending">Order in progress...</div>}
      {error && <div className='failure'>`${error}`</div>}

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
            // value={name}
          />
        </div>
      </div>

      <div className="input-group">
        <div>
          <label htmlFor="size">Size</label>
          <br />
          <select data-testid="sizeSelect" id="size" name="size">
            <option value="">----Choose size----</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
          </select>
        </div>
      </div>

      <div className="input-group">
        <label>
          <input data-testid="checkPepperoni" name="1" type="checkbox" />
          Pepperoni
          <br />
        </label>
        <label>
          <input data-testid="checkGreenpeppers" name="2" type="checkbox" />
          Green Peppers
          <br />
        </label>
        <label>
          <input data-testid="checkPineapple" name="3" type="checkbox" />
          Pineapple
          <br />
        </label>
        <label>
          <input data-testid="checkMushrooms" name="4" type="checkbox" />
          Mushrooms
          <br />
        </label>
        <label>
          <input data-testid="checkHam" name="5" type="checkbox" />
          Ham
          <br />
        </label>
      </div>
      <input data-testid="submit" type="submit" />
    </form>
  );
}
