import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { pingpong } from "../util/pingpong";

const BackendConnection = () => {
  const [status, setStatus] = useState("");

  const testConnection = async () => {
    setStatus("");
    try {
      const res = await pingpong();
      if (res.data !== "pong") throw new Error("Response was not pong.");

      setStatus("Success! Great job!");
    } catch (err) {
      setStatus("Not yet working. Check network tab for what is going on.");
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

export default BackendConnection;
