import React from "react";
import { Button } from "@material-ui/core";
import DoneIcon from "@material-ui/icons/Done";

const ExerciseButton = ({ onClick, success = false }) => (
  <Button
    variant="contained"
    style={{ minWidth: "14em" }}
    disabled={success}
    onClick={onClick}
  >
    {success ? <DoneIcon /> : "Press to Test!"}
  </Button>
);

export default ExerciseButton;
