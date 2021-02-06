import React, { useState } from "react";
import ExerciseButton from "./ExerciseButton";
import PostgresMessageList from "./PostgresMessageList";

import { pingpongPostgres } from "../../util/pingpong";

const PostgresConnection = () => {
  const [status, setStatus] = useState({ message: "", success: false });

  const updateSuccess = (message, success = false) => {
    setStatus({ message, success });
  };

  const testConnection = async () => {
    updateSuccess("");
    try {
      const res = await pingpongPostgres();
      if (res.data !== "pong") throw new Error("Response was not pong.")

      updateSuccess("Working! Messages below also work.", true);
    } catch (err) {
      updateSuccess("Not yet working. Check network tab to see what is going on.");
    }
  };

  return (
    <>
      <ExerciseButton exercise="postgres" success={status.success} onClick={testConnection} />
      <span className="exercise-status">{status.message}</span>
      <PostgresMessageList />
    </>
  );
};

export default PostgresConnection;
