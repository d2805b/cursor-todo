import React, { useReducer, useEffect } from 'react';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { FilterButtons } from './components/FilterButtons';
import { DarkModeToggle } from './components/DarkModeToggle';
import { todoReducer, initialState } from './reducers/todoReducer';
import { Todo, FilterType, Mood } from './types/todo';

function App() {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  useEffect(() => {
    if (state.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [state.darkMode]);

  const handleAddTodo = (todo: Todo) => {
    dispatch({ type: 'ADD_TODO', payload: todo });
  };

  const handleToggleTodo = (id: string) => {
    dispatch({ type: 'TOGGLE_TODO', payload: id });
  };

  const handleDeleteTodo = (id: string) => {
    dispatch({ type: 'DELETE_TODO', payload: id });
  };

  const handleFilterChange = (filter: FilterType) => {
    dispatch({ type: 'SET_FILTER', payload: filter });
  };

  const handleMoodFilterChange = (mood: Mood | 'all') => {
    dispatch({ type: 'SET_MOOD_FILTER', payload: mood });
  };

  const handleReorderTodos = (todos: Todo[]) => {
    dispatch({ type: 'UPDATE_TODOS_ORDER', payload: todos });
  };

  const handleToggleDarkMode = () => {
    dispatch({ type: 'TOGGLE_DARK_MODE' });
  };

  const filteredTodos = state.todos.filter((todo) => {
    if (state.filter === 'active') return !todo.completed;
    if (state.filter === 'completed') return todo.completed;
    return true;
  }).filter((todo) => {
    if (state.moodFilter === 'all') return true;
    return todo.mood === state.moodFilter;
  });

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          Todoアプリ
        </h1>
        
        <DarkModeToggle
          isDarkMode={state.darkMode}
          onToggle={handleToggleDarkMode}
        />

        <TodoForm onAdd={handleAddTodo} />
        
        <FilterButtons
          currentFilter={state.filter}
          currentMoodFilter={state.moodFilter}
          onFilterChange={handleFilterChange}
          onMoodFilterChange={handleMoodFilterChange}
        />

        <TodoList
          todos={filteredTodos}
          filter={state.filter}
          onToggle={handleToggleTodo}
          onDelete={handleDeleteTodo}
          onReorder={handleReorderTodos}
        />
      </div>
    </div>
  );
}

export default App;
