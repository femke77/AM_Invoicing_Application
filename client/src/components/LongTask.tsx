import { useEffect } from "react";
import { useLongTask } from "../hooks/useLongTask";

const LongTaskSim = () => {
  const { startTask, taskStatus, data } = useLongTask();
  console.log("taskStatus", taskStatus, "data", data);


  useEffect(() => {
    if (taskStatus) {
      console.log(taskStatus);
    }
  }, [taskStatus]);
  return (
    <>

      <button onClick={startTask}>Click to simulate a long task</button>
      {data && <div>{data.message}</div>}
      {taskStatus && <div>The task is:{taskStatus}</div>}

    </>
  );
};

export default LongTaskSim;