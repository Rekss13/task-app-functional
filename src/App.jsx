import { useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import ColumnList from './components/ColumnList';

const App = ({ data }) => {
    const [state, setState] = useState(data);
    const [homeIndex, setHomeIndex] = useState(null);

    const onDragStart = (start, provided) => {
        document.body.style.color = 'darkgray';
        document.body.style.transition = 'background-color 0.2s ease';

        provided.announce(
            `You have lifted the task in position ${start.source.index + 1}`
        );

        setHomeIndex(state.columnOrder.indexOf(start.source.droppableId));
    }

    const onDragUpdate = (update, provided) => {
        const { destination } = update;
        const opacity = destination
            ? destination.index / Object.keys(state.tasks).length
            : 0;
        document.body.style.backgroundColor = `rgba(153, 141, 217, ${opacity})`;

        const message = destination
            ? `You have moved the task to position ${destination.index + 1}`
            : `You are currently not over a droppable area`;
        provided.announce(message);
    }

    const onDragEnd = (result, provided) => {
        document.body.style.color = 'inherit';
        document.body.style.backgroundColor = 'inherit';

        setHomeIndex(null);

        const { destination, source, draggableId, type } = result;

        const message = destination
            ? `You have maved the task from position
                ${source.index + 1} to ${destination.index + 1}`
            : `The  task has been returned ro its starting position of
                ${source.index + 1}`;
        provided.announce(message);

        if (!destination) return;

        if (destination.droppableId === source.droppableId
            && destination.index === source.index) return;

        if (type === 'column') {
            const newColumnOrder = Array.from(state.columnOrder);
            newColumnOrder.splice(source.index, 1);
            newColumnOrder.splice(destination.index, 0, draggableId);

            setState({ ...state, columnOrder: newColumnOrder });
            return;
        }

        const start = state.columns[source.droppableId];
        const finish = state.columns[destination.droppableId];

        if (start === finish) {
            const newTaskIds = Array.from(start.taskIds);
            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, draggableId);

            const newColumn = { ...start, taskIds: newTaskIds };

            const newState = {
                ...state,
                columns: { ...state.columns, [newColumn.id]: newColumn }
            }

            setState(newState);
            return;
        }

        const startTaskIds = Array.from(start.taskIds);
        startTaskIds.splice(source.index, 1);
        const newStart = { ...start, taskIds: startTaskIds };

        const finishTaskIds = Array.from(finish.taskIds);
        finishTaskIds.splice(destination.index, 0, draggableId);
        const newFinish = { ...finish, taskIds: finishTaskIds };

        const newState = {
            ...state,
            columns: {
                ...state.columns,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish
            }
        };
        setState(newState);
    };

    return (
        <DragDropContext onDragStart={onDragStart} onDragUpdate={onDragUpdate} onDragEnd={onDragEnd}>
            <Droppable droppableId='all-columns' direction='horizontal' type='column'>
                {provided => (
                    <div {...provided.droppableProps} ref={provided.innerRef} style={{display: 'flex'}}>
                        {state.columnOrder.map((columnId, index) => {
                            const column = state.columns[columnId];

                            return <ColumnList
                                key={column.id}
                                column={column}
                                taskMap={state.tasks}
                                isDropDisabled={index < homeIndex}
                                index={index}
                            />
                        })}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
}

export default App;