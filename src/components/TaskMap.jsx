import { memo } from "react";
import Task from "./Task";
import TaskHandle from "./TaskHandle";

const TaskMap = ({ tasks }) => {
    return tasks.map((task, index) => {
        const TaskType = index % 2 === 0 ? TaskHandle : Task;
        return <TaskType key={task.id} task={task} index={index} />;
    });
}

export default memo(TaskMap);