import React from "react";

import AmIRunning from "./AmIRunning";
import BackendConnection from "./BackendConnection";
import NginxSetup from "./NginxSetup";
import RedisSetup from "./RedisSetup";
import PostgresConnection from "./PostgresConnection";
import Exercise from "./Exercise";

const ExerciseList = () => (
  <div className="exercise-list">
    <h3>Part 1</h3>
    <Exercise exerciseNumber="1.12" ExerciseComponent={<AmIRunning />} />
    <Exercise exerciseNumber="1.14" ExerciseComponent={<BackendConnection />} />
    <h3>Part 2</h3>
    <Exercise exerciseNumber="2.4" ExerciseComponent={<RedisSetup />} />
    <Exercise exerciseNumber="2.6" ExerciseComponent={<PostgresConnection />} />
    <Exercise exerciseNumber="2.8" ExerciseComponent={<NginxSetup />} />
  </div>
);

export default ExerciseList;
