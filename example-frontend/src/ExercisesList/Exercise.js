import React from "react";

const Exercise = ({ exerciseNumber, ExerciseComponent }) => (
  <div>
    <span> Exercise {exerciseNumber}: </span>
    {ExerciseComponent}
    <hr />
  </div>
);

export default Exercise;
