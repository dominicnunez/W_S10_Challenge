import { useCallback } from "react";
import { useDispatch } from "react-redux";

/**
 * Custom hook for handling form input changes (text, select, checkbox)
 * @param {Object} fieldActions - An object mapping field names to their respective set action
 * @param {Function} addAction - Optional Redux action for adding checkbox values (optional for checkbox)
 * @param {Function} removeAction - Optional Redux action for removing checkbox values (optional for checkbox)
 * @returns {Object} - Input change handler functions for text/select and checkboxes
 */

export function useFormHandlers(fieldActions, addAction = null, removeAction = null) {
  const dispatch = useDispatch();

  const handleInputChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      const action = fieldActions[name];
      if (action) {
        dispatch(action(value));
      }
    },
    [dispatch, fieldActions]
  );

  const handleCheckboxChange = useCallback(
    (e) => {
      const { value, checked } = e.target;

      if (checked && addAction) {
        dispatch(addAction(value)); // Use numeric ID for adding
      } else if (!checked && removeAction) {
        dispatch(removeAction(value)); // Use numeric ID for removing
      }
    },
    [dispatch, addAction, removeAction]
  );

  return { handleInputChange, handleCheckboxChange };
}
