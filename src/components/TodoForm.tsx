import React, { useState } from 'react';
import { Todo, Priority, Mood } from '../types/todo';
import { format } from 'date-fns';

interface TodoFormProps {
  onAdd: (todo: Todo) => void;
}

const MOODS: { value: Mood; label: string }[] = [
  { value: '🔥 やる気MAX', label: '🔥 やる気MAX' },
  { value: '😊 普通', label: '😊 普通' },
  { value: '😫 やりたくない', label: '😫 やりたくない' },
  { value: '😴 眠い', label: '😴 眠い' },
  { value: '😡 イライラ', label: '😡 イライラ' },
];

// 入力値のサニタイズ関数
const sanitizeInput = (input: string): string => {
  // HTMLエンティティに変換
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

export const TodoForm: React.FC<TodoFormProps> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState<Priority>('Medium');
  const [mood, setMood] = useState<Mood>('😊 普通');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    // 入力値の長さ制限（例: 100文字）
    const sanitizedTitle = sanitizeInput(title.trim()).substring(0, 100);

    const newTodo: Todo = {
      id: Date.now().toString(),
      title: sanitizedTitle,
      dueDate,
      createdAt: format(new Date(), 'yyyy-MM-dd'),
      priority,
      completed: false,
      mood,
    };

    onAdd(newTodo);
    setTitle('');
    setDueDate('');
    setPriority('Medium');
    setMood('😊 普通');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="新しいタスクを入力..."
          maxLength={100}
          className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                   bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                   bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as Priority)}
          className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                   bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <select
          value={mood}
          onChange={(e) => setMood(e.target.value as Mood)}
          className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                   bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {MOODS.map((m) => (
            <option key={m.value} value={m.value}>
              {m.label}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                   dark:focus:ring-offset-gray-800"
        >
          追加
        </button>
      </div>
    </form>
  );
}; 