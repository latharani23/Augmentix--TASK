import React from 'react';
import TodoItem from './TodoItem'; // Importing TodoItem component
import './TodoList.css';

const TodoList = ({ tasks, toggleComplete, deleteTask, editTask }) => {
  return (
    <div className="todo-list">
      <ul>
        {tasks.map(task => (
          <TodoItem
            key={task.id}
            task={task}
            toggleComplete={toggleComplete}
            onEdit={() => editTask(task.id)}
            onDelete={() => deleteTask(task.id)}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
