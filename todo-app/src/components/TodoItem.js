import React from 'react';
import './TodoItem.css';

const TodoItem = ({ task, toggleComplete, onEdit, onDelete }) => {
  
  return (
    <li className={`todo-item ${task.completed ? 'completed' : ''}`}>
      <div>
        <span className="todo-title">{task.title}</span>
        <span className="todo-due-date">{task.dueDate}</span>
        <span className="todo-due-time">{task.dueTime}</span>
        <span className={`todo-priority priority-${task.priority.toLowerCase()}`}>
          {task.priority}
        </span>
        {task.reminder && (
          <span className="todo-reminder">
            Reminder: {new Date(task.reminder).toLocaleString()}
          </span>
        )}
      </div>
      <div>
        <button onClick={() => toggleComplete(task.id)}>
          {task.completed ? 'Undo' : 'Complete'}
        </button>
        <button onClick={() => onEdit(task.id)}>Edit</button>
        <button onClick={() => onDelete(task.id)}>Delete</button>
      </div>
    </li>
  );
};

export default TodoItem;
