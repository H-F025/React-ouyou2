import type { MoveDirection, TodoItem } from '../types';

interface TodoCardProps {
  todo: TodoItem;
  canMovePrev: boolean;
  canMoveNext: boolean;
  onDelete: (id: string) => void;
  onMove: (id: string, direction: MoveDirection) => void;
  onUpdateText: (id: string, text: string) => void;
}

// カード：全レーン共通。表示と、操作されたことをページに伝える
export default function TodoCard({
  todo,
  canMovePrev,
  canMoveNext,
  onDelete,
  onMove,
  onUpdateText,
}: TodoCardProps) {
  return (
    <div className="task-card">
      {/* 右上の「×」ボタン */}
      <button
        type="button"
        className="delete-btn"
        onClick={() => onDelete(todo.id)}
        aria-label="削除"
      >
        ×
      </button>

      {/* 中央のテキストボックス（常に編集できる） */}
      <input
        type="text"
        className="task-input"
        value={todo.text}
        placeholder="やることを入力"
        aria-label="TODOのテキスト"
        onChange={(e) => onUpdateText(todo.id, e.target.value)}
      />

      {/* 下部の左右矢印 */}
      <div className="move-actions">
        <button
          type="button"
          className="move-btn"
          disabled={!canMovePrev}
          onClick={() => onMove(todo.id, 'prev')}
          aria-label="左へ移動"
        >
          ←
        </button>
        <button
          type="button"
          className="move-btn"
          disabled={!canMoveNext}
          onClick={() => onMove(todo.id, 'next')}
          aria-label="右へ移動"
        >
          →
        </button>
      </div>
    </div>
  );
}