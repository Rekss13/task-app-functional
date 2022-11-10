import styled from "styled-components";
import { Droppable, Draggable } from "react-beautiful-dnd";
import TaskMap from "./TaskMap";

const Container = styled.div`
    margin: 8px;
    border: 1px solid lightgrey;
    background-color: 'white';
    border-radius: 2px;
    width: 220px;

    display: flex;
    flex-direction: column;
`;
const Title = styled.h3`
    padding: 8px;
    background-color: ${props => (props.isDraggingOver ? 'darkcyan' : 'white')};
`;
const TaskList = styled.div`
    padding: 8px;
    transition: background-color 0.2s ease;
    background-color: ${props => (props.isDraggingOver ? 'darkcyan' : 'white')};
    flex-grow: 1;
    min-height: 100px;
`;

const Column = ({ column, tasks, isDropDisabled, index }) => {
    return (
        <Draggable
            draggableId={column.id}
            index={index}
        >
            {provided => (
                <Container
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    <Title>{column.title}</Title>
                    <Droppable
                        droppableId={column.id}
                        type='task'
                        isDropDisabled={isDropDisabled}
                    >
                        {(provided, snapshot) => (
                            <TaskList
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                isDraggingOver={snapshot.isDraggingOver}
                            >
                                <TaskMap tasks={tasks} />
                                {provided.placeholder}
                            </TaskList>
                        )}
                    </Droppable>
                </Container>
            )}
        </Draggable>
    );
}

export default Column;