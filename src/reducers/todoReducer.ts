import { TodoState, TodoAction, Todo } from '../types/todo';

// ローカルストレージからデータを安全に取得する関数
const getLocalStorageItem = (key: string, defaultValue: any): any => {
  try {
    const item = localStorage.getItem(key);
    if (item === null) return defaultValue;
    
    // JSONデータの検証
    const parsedItem = JSON.parse(item);
    
    // todosの場合は配列であることを確認
    if (key === 'todos' && !Array.isArray(parsedItem)) {
      console.error('Invalid todos data in localStorage');
      return defaultValue;
    }
    
    return parsedItem;
  } catch (error) {
    console.error(`Error reading ${key} from localStorage:`, error);
    return defaultValue;
  }
};

// ローカルストレージにデータを安全に保存する関数
const setLocalStorageItem = (key: string, value: any): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error writing ${key} to localStorage:`, error);
  }
};

export const initialState: TodoState = {
  todos: getLocalStorageItem('todos', []),
  filter: 'all',
  darkMode: getLocalStorageItem('darkMode', false) === true,
  moodFilter: 'all',
};

export const todoReducer = (state: TodoState, action: TodoAction): TodoState => {
  let newState: TodoState;

  switch (action.type) {
    case 'ADD_TODO':
      newState = {
        ...state,
        todos: [...state.todos, action.payload],
      };
      break;

    case 'DELETE_TODO':
      newState = {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
      break;

    case 'TOGGLE_TODO':
      newState = {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };
      break;

    case 'UPDATE_TODOS_ORDER':
      newState = {
        ...state,
        todos: action.payload,
      };
      break;

    case 'SET_FILTER':
      newState = {
        ...state,
        filter: action.payload,
      };
      break;

    case 'SET_MOOD_FILTER':
      newState = {
        ...state,
        moodFilter: action.payload,
      };
      break;

    case 'TOGGLE_DARK_MODE':
      newState = {
        ...state,
        darkMode: !state.darkMode,
      };
      break;

    default:
      return state;
  }

  // ローカルストレージに保存
  setLocalStorageItem('todos', newState.todos);
  setLocalStorageItem('darkMode', newState.darkMode);

  return newState;
}; 