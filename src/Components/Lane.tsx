import type { MoveDirection, TodoItem } from '../types';
import TodoCard from './TodoCard';

interface LaneProps {
  title: string;
  todos: TodoItem[];
  canMovePrev: boolean;
  canMoveNext: boolean;
  onDelete: (id: string) => void;
  onMove: (id: string, direction: MoveDirection) => void;
  onUpdateText: (id: string, text: string) => void;
  onAdd?: () => void;
}

// レーン：ToDo / In Progress / Done 共通。受け取ったタスクを並べるだけ
export default function Lane({
  title,
  todos,
  canMovePrev,
  canMoveNext,
  onAdd,
  onDelete,
  onMove,
  onUpdateText,
}: LaneProps) {
  return (
    <section className="column">
      <div className="column-header">
        <h2>
          {title}({todos.length}件)
        </h2>
      </div>

      <div className="column-body">
        <div className="task-list">
          {todos.map((todo) => (
            <TodoCard
              key={todo.id}
              todo={todo}
              canMovePrev={canMovePrev}
              canMoveNext={canMoveNext}
              onDelete={onDelete}
              onMove={onMove}
              onUpdateText={onUpdateText}
            />
          ))}
        </div>

        {onAdd && (
          <div className="add-btn-wrap">
            <button
              type="button"
              className="add-btn"
              onClick={onAdd}
              aria-label="タスクを追加"
            >
              ＋
            </button>
          </div>
        )}
      </div>
    </section>
  );
}