import React from 'react';
import { Todo } from '../types/todo';
import { format, parseISO } from 'date-fns';
import { Draggable } from 'react-beautiful-dnd';

interface TodoItemProps {
  todo: Todo;
  index: number;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const getPriorityColor = (priority: Todo['priority']) => {
  switch (priority) {
    case 'High':
      return 'bg-red-500';
    case 'Medium':
      return 'bg-yellow-500';
    case 'Low':
      return 'bg-green-500';
    default:
      return 'bg-gray-500';
  }
};

// 安全にテキストを表示するための関数
const safeText = (text: string): string => {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  index,
  onToggle,
  onDelete,
}) => {
  return (
    <Draggable draggableId={todo.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`flex items-center p-4 mb-2 rounded-lg border
                   ${
                     todo.completed
                       ? 'bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                       : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600'
                   }`}
        >
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo.id)}
            className="w-5 h-5 mr-4 rounded border-gray-300 text-blue-500
                     focus:ring-blue-500 dark:border-gray-600"
          />
          <div className="flex-1">
            <h3
              className={`text-lg font-medium ${
                todo.completed
                  ? 'text-gray-500 dark:text-gray-400 line-through'
                  : 'text-gray-900 dark:text-white'
              }`}
              dangerouslySetInnerHTML={{ __html: safeText(todo.title) }}
            />
            <div className="flex items-center mt-1 text-sm text-gray-500 dark:text-gray-400">
              <span>期限: {todo.dueDate ? format(parseISO(todo.dueDate), 'yyyy/MM/dd') : '未設定'}</span>
              <span className="mx-2">•</span>
              <span>作成: {format(parseISO(todo.createdAt), 'yyyy/MM/dd')}</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span
              className={`px-2 py-1 text-xs font-semibold text-white rounded-full ${getPriorityColor(
                todo.priority
              )}`}
            >
              {todo.priority}
            </span>
            <span className="px-2 py-1 text-xs font-semibold bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-full">
              {todo.mood}
            </span>
            <button
              onClick={() => onDelete(todo.id)}
              className="p-2 text-red-500 hover:text-red-600 dark:text-red-400 
                       dark:hover:text-red-300 focus:outline-none"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </Draggable>
  );
}; 