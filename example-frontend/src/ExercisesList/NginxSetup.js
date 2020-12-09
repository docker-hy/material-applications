import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { pingpongNginx } from "../util/pingpong";

const NginxSetup = () => {
  const [status, setStatus] = useState("");

  const testConnection = async () => {
    setStatus("");
    try {
      const res = await pingpongNginx();
      if (res.data !== "pong") throw new Error("Response was not pong.");

      setStatus("Nice! The exercise is complete!");
    } catch (err) {
      setStatus(
        `Something is wrong. It is not working correctly. Is pingpong available in ${window.location.origin}/api/ping?`
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

export default NginxSetup;
