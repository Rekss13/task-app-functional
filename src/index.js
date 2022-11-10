import React from 'react';
import ReactDOM from 'react-dom/client';
import '@atlaskit/css-reset'
import styled from 'styled-components';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import initialData from './initial-data';
import Column from './column';

const Container = styled.div`
    display: flex;
`;

class InnerList extends React.PureComponent {
    render() {
        const { column, taskMap, isDropDisabled, index } = this.props;
        const tasks = column.taskIds.map(taskId => taskMap[taskId]);
        return <Column
            column={column}
            tasks={tasks}
            isDropDisabled={isDropDisabled}
            index={index}
        />
    }
}

class App extends React.Component {
    state = initialData;

    onDragStart = (start, provided) => {
        document.body.style.color = 'darkgray';
        document.body.style.transition = 'background-color 0.2s ease';

        provided.announce(
            `You have lifted the task in position ${start.source.index + 1}`
        );

        const homeIndex = this.state.columnOrder.indexOf(start.source.droppableId);
        this.setState({ homeIndex });
    }

    onDragUpdate = (update, provided) => {
        const { destination } = update;
        const opacity = destination
            ? destination.index / Object.keys(this.state.tasks).length
            : 0;
        document.body.style.backgroundColor = `rgba(153, 141, 217, ${opacity})`;

        const message = destination
            ? `You have moved the task to position ${destination.index + 1}`
            : `You are currently not over a droppable area`;
        provided.announce(message);
    }

    onDragEnd = (result, provided) => {
        document.body.style.color = 'inherit';
        document.body.style.backgroundColor = 'inherit';

        this.setState({ homeIndex: null });

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
            const newColumnOrder = Array.from(this.state.columnOrder);
            newColumnOrder.splice(source.index, 1);
            newColumnOrder.splice(destination.index, 0, draggableId);

            const newState = {
                ...this.state,
                columnOrder: newColumnOrder
            };

            this.setState(newState);
            return;
        }

        const start = this.state.columns[source.droppableId];
        const finish = this.state.columns[destination.droppableId];

        if (start === finish) {
            const newTaskIds = Array.from(start.taskIds);
            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, draggableId);

            const newColumn = {
                ...start,
                taskIds: newTaskIds
            };

            const newState = {
                ...this.state,
                columns: {
                    ...this.state.columns,
                    [newColumn.id]: newColumn
                }
            }

            this.setState(newState);
            return;
        }

        const startTaskIds = Array.from(start.taskIds);
        startTaskIds.splice(source.index, 1);
        const newStart = {
            ...start,
            taskIds: startTaskIds
        };

        const finishTaskIds = Array.from(finish.taskIds);
        finishTaskIds.splice(destination.index, 0, draggableId);
        const newFinish = {
            ...finish,
            taskIds: finishTaskIds
        };

        const newState = {
            ...this.state,
            columns: {
                ...this.state.columns,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish
            }
        };
        this.setState(newState);
    };

    render() {
        return (
            <DragDropContext
                onDragStart={this.onDragStart}
                onDragUpdate={this.onDragUpdate}
                onDragEnd={this.onDragEnd}
            >
                <Droppable
                    droppableId='all-columns'
                    direction='horizontal'
                    type='column'
                >
                    {provided => (
                        <Container
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {this.state.columnOrder.map((columnId, index) => {
                                const column = this.state.columns[columnId];

                                return <InnerList
                                    key={column.id}
                                    column={column}
                                    taskMap={this.state.tasks}
                                    isDropDisabled={index < this.state.homeIndex}
                                    index={index}
                                />
                            })}
                            {provided.placeholder}
                        </Container>
                    )}
                </Droppable>
            </DragDropContext>
        );
    }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
