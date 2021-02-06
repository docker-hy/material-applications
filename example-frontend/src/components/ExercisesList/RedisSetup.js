import React, { useState } from "react";
import ExerciseButton from "./ExerciseButton";
import { pingpongRedis } from "../../util/pingpong";

const RedisSetup = () => {
  const [status, setStatus] = useState({ message: "", success: false });

  const updateSuccess = (message, success = false) => {
    setStatus({ message, success });
  };

  const testConnection = async () => {
    updateSuccess("");
    try {
      const res = await pingpongRedis();
      if (res.data !== "pong") throw new Error("Response was not pong.");

      updateSuccess("Nice! The exercise is complete!", true);
    } catch (err) {
      updateSuccess(
        `Unable to get pong. Check API logs if there is a problem with redis connection! If that works check network tab.`
      );
    }
  };

  return (
    <>
      <ExerciseButton exercise="redis" success={status.success} onClick={testConnection} />
      <span className="exercise-status">{status.message}</span>
    </>
  );
};

export default RedisSetup;
