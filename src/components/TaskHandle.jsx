import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import { Container } from "./taskContainer";

const Handle = styled.div`
    width: 20px;
    height: 20px;
    min-width: 20px;
    background-color: orange;
    border-radius: 4px;
    margin-right: 8px;
`;

const TaskHandle = ({ task, index }) => {
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
                        ref={provided.innerRef}
                        isDragging={snapshot.isDragging}
                        isDragDisabled={isDragDisabled}
                        aria-roledescription="Press space bar to lift the task"
                    >
                        <Handle {...provided.dragHandleProps} />
                        {task.content}
                    </Container>
                );
            }}
        </Draggable>
    );
}

export default TaskHandle;