import { useCallback, useState } from "react";
/**
  This function change the boolean value to it's opposite value
*
* */
export const useToggle = (initialState: boolean = false): [boolean, () => void] => {
  // Initialize the state
  const [state, setState] = useState<boolean>(initialState);
  // Define and memorize toggler function in case we pass down the component,
  const toggle = useCallback((): void => setState(state => !state), []);
  return [state, toggle];
};
