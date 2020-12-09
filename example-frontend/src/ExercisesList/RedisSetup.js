import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { pingpongRedis } from "../util/pingpong";

const RedisSetup = () => {
  const [status, setStatus] = useState("");

  const testConnection = async () => {
    setStatus("");
    try {
      const res = await pingpongRedis();
      if (res.data !== "pong") throw new Error("Response was not pong.");

      setStatus("Nice! The exercise is complete!");
    } catch (err) {
      setStatus(
        `Unable to get pong. Check API logs if there is a problem with redis connection! If that works check network tab.`
      );
    }
  };

  return (
    <>
      <Button variant="contained" onClick={testConnection}>
        Press to Test!
      </Button>
      <span className="exercise-status">{status}</span>
    </>
  );
};

export default RedisSetup;
