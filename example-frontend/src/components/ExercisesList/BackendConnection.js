import React, { useState } from "react";
import { pingpong } from "../../util/pingpong";
import ExerciseButton from "./ExerciseButton";

const BackendConnection = () => {
  const [status, setStatus] = useState({ message: "", success: false });

  const updateSuccess = (message, success = false) => {
    setStatus({ message, success });
  };

  const testConnection = async () => {
    updateSuccess("");
    try {
      const res = await pingpong();
      if (res.data !== "pong") throw new Error("Response was not pong.");

      updateSuccess("Success! Great job!", true);
    } catch (err) {
      updateSuccess("Not yet working. Check network tab for what is going on.");
    }
  };

  return (
    <>
      <ExerciseButton exercise="backend" success={status.success} onClick={testConnection} />
      <span className="exercise-status">{status.message}</span>
    </>
  );
};

export default BackendConnection;
