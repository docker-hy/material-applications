import React, { useState } from "react";
import { Button } from "@material-ui/core";
import PostgresMessageList from "./PostgresMessageList";

import { pingpongPostgres } from "../util/pingpong";

const PostgresConnection = () => {
  const [status, setStatus] = useState("");

  const testConnection = async () => {
    setStatus("");
    try {
      const res = await pingpongPostgres();
      if (res.data !== "pong") throw new Error("Response was not pong.")

      setStatus("Working! Messages below also work.");
    } catch (err) {
      setStatus("Not yet working. Check network tab to see what is going on.");
    }
  };

  return (
    <>
      <Button variant="contained" onClick={testConnection}>
        Press to Test!
      </Button>
      <span className="exercise-status">{status}</span>
      <PostgresMessageList />
    </>
  );
};

export default PostgresConnection;
