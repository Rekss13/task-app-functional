const initialData = {
    task: {
        'task-1': { id: 'task-1', content: 'Русское кино' },
        'task-2': { id: 'task-2', content: 'Tu Nu' },
        'task-3': { id: 'task-3', content: 'ABC Lounge' },
        'task-4': { id: 'task-4', content: 'Вести 24' },
    },
    columns: {
        'column-1': {
            id: 'column-1',
            title: 'To do',
            taskIds: ['task-1', 'task-2', 'task-3', 'task-4']
        }
    },
    columnOrder: ['column-1'],
    info: {}
};

export default initialData;