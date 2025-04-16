export type Priority = 'High' | 'Medium' | 'Low';

export type Mood = '🔥 やる気MAX' | '😊 普通' | '😫 やりたくない' | '😴 眠い' | '😡 イライラ';

export interface Todo {
  id: string;
  title: string;
  dueDate: string;
  createdAt: string;
  priority: Priority;
  completed: boolean;
  mood: Mood;
}

export type FilterType = 'all' | 'active' | 'completed';

export interface TodoState {
  todos: Todo[];
  filter: FilterType;
  darkMode: boolean;
  moodFilter: Mood | 'all';
}

export type TodoAction =
  | { type: 'ADD_TODO'; payload: Todo }
  | { type: 'DELETE_TODO'; payload: string }
  | { type: 'TOGGLE_TODO'; payload: string }
  | { type: 'UPDATE_TODOS_ORDER'; payload: Todo[] }
  | { type: 'SET_FILTER'; payload: FilterType }
  | { type: 'SET_MOOD_FILTER'; payload: Mood | 'all' }
  | { type: 'TOGGLE_DARK_MODE' }; 