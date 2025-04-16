import React from 'react';
import { FilterType, Mood } from '../types/todo';

interface FilterButtonsProps {
  currentFilter: FilterType;
  currentMoodFilter: Mood | 'all';
  onFilterChange: (filter: FilterType) => void;
  onMoodFilterChange: (mood: Mood | 'all') => void;
}

const MOODS: { value: Mood | 'all'; label: string }[] = [
  { value: 'all', label: 'すべての気分' },
  { value: '🔥 やる気MAX', label: '🔥 やる気MAX' },
  { value: '😊 普通', label: '😊 普通' },
  { value: '😫 やりたくない', label: '😫 やりたくない' },
  { value: '😴 眠い', label: '😴 眠い' },
  { value: '😡 イライラ', label: '😡 イライラ' },
];

export const FilterButtons: React.FC<FilterButtonsProps> = ({
  currentFilter,
  currentMoodFilter,
  onFilterChange,
  onMoodFilterChange,
}) => {
  const filters: { label: string; value: FilterType }[] = [
    { label: 'すべて', value: 'all' },
    { label: '未完了', value: 'active' },
    { label: '完了済み', value: 'completed' },
  ];

  return (
    <div className="space-y-4 mb-6">
      <div className="flex justify-center space-x-2">
        {filters.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => onFilterChange(value)}
            className={`px-4 py-2 rounded-lg transition-colors
                     ${
                       currentFilter === value
                         ? 'bg-blue-500 text-white'
                         : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                     }`}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="flex justify-center space-x-2">
        {MOODS.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => onMoodFilterChange(value)}
            className={`px-4 py-2 rounded-lg transition-colors
                     ${
                       currentMoodFilter === value
                         ? 'bg-purple-500 text-white'
                         : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                     }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}; 