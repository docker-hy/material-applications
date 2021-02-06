import React, { useState } from "react";
import ExerciseButton from "./ExerciseButton";
import { pingpongNginx } from "../../util/pingpong";

const NginxSetup = () => {
  const [status, setStatus] = useState({ message: "", success: false });

  const updateSuccess = (message, success = false) => {
    setStatus({ message, success });
  };

  const testConnection = async () => {
    updateSuccess("");
    try {
      const res = await pingpongNginx();
      if (res.data !== "pong") throw new Error("Response was not pong.");

      updateSuccess("Nice! The exercise is complete!", true);
    } catch (err) {
      updateSuccess(
        `Something is wrong. It is not working correctly. Is pingpong available in ${window.location.origin}/api/ping?`
      );
    }
  };

  return (
    <>
      <ExerciseButton exercise="nginx" success={status.success} onClick={testConnection} />
      <span className="exercise-status">{status.message}</span>
    </>
  );
};

export default NginxSetup;
