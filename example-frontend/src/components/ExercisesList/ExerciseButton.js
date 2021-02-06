import React from "react";
import { Button } from "@material-ui/core";
import DoneIcon from "@material-ui/icons/Done";

const ExerciseButton = ({ onClick, exercise, success = false }) => (
  <Button
    data-exercise={exercise}
    variant="contained"
    style={{ minWidth: "14em" }}
    disabled={success}
    onClick={onClick}
  >
    {success ? <DoneIcon data-ex-success={exercise} /> : "Press to Test!"}
  </Button>
);

export default ExerciseButton;
