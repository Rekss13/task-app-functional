import { Draggable } from "react-beautiful-dnd";
import { Container } from "./taskContainer";

const Task = ({ task, index }) => {
    const isDragDisabled = task.id === 'task-1';
    return (
        <Draggable
            draggableId={task.id}
            index={index}
            isDragDisabled={isDragDisabled}
        >
            {(provided, snapshot) => {
                return (
                    <Container
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        isDragging={snapshot.isDragging}
                        isDragDisabled={isDragDisabled}
                        aria-roledescription="Press space bar to lift the task"
                    >
                        {task.content}
                    </Container>
                );
            }}
        </Draggable>
    );
}

export default Task;