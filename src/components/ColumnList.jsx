import { memo } from "react";
import Column from "./Column";

const ColumnList = ({ column, taskMap, isDropDisabled, index }) => {
    const tasks = column.taskIds.map(taskId => taskMap[taskId]);
    return <Column
        column={column}
        tasks={tasks}
        isDropDisabled={isDropDisabled}
        index={index}
    />
}

export default memo(ColumnList);