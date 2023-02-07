import React, { useEffect, useState } from "react";
import { Form } from "../components";
import axios from "axios";

export const CreateCharacterPage = () => {
  const [state, setState] = useState<any[]>([]);
  useEffect(() => {
    (async () => {
      const data = await axios.get("http://localhost:3000/api/characters");

      setState(data.data.data);
      console.log(data.data.data);
    })();
  }, []);
  return (
    <>
      {
        /*<Form />*/
        state.map(item => (
          <h3>{item.name}</h3>
        ))
      }
    </>
  );
};
