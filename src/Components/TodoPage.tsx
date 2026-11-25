import { useEffect, useState } from 'react';
import { COLUMNS, type MoveDirection, type TodoItem } from '../types';
import Lane from './Lane';

// 最初に保存済みのタスクを読み込む
export default function TodoPage() {
  const [todos, setTodos] = useState<TodoItem[]>([]);

  // ＋ボタンで空のタスクを一番上に追加（文字はカードのテキストボックスで入力する）
  const handleAddTodo = () => {
    setTodos((prev) => [
      { id: crypto.randomUUID(), text: '', status: 'todo' },
      ...prev,
    ]);
  };

  // バツ印で削除
  const handleDelete = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  // 左右の矢印で隣のレーンへ移動（移動先のレーンの一番上に配置）
  const handleMove = (id: string, direction: MoveDirection) => {
    setTodos((prev) => {
      const targetTodo = prev.find((t) => t.id === id);
      if (!targetTodo) return prev;

      const currentIndex = COLUMNS.findIndex((c) => c.key === targetTodo.status);
      const nextIndex = direction === 'prev' ? currentIndex - 1 : currentIndex + 1;

      if (nextIndex < 0 || nextIndex >= COLUMNS.length) return prev;

      const updatedTodo: TodoItem = {
        ...targetTodo,
        status: COLUMNS[nextIndex].key,
      };

      const restTodos = prev.filter((t) => t.id !== id);
      return [updatedTodo, ...restTodos];
    });
  };

  // テキストの更新（テキストボックスに1文字入力するたびに呼ばれる）
  const handleUpdateText = (id: string, text: string) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, text } : todo))
    );
  };

  return (
    <div className="app-wrap">
      <h1 className="page-title">TODO List</h1>

      <div className="board">
        {COLUMNS.map((col, colIndex) => (
          <Lane
            key={col.key}
            title={col.title}
            todos={todos.filter((t) => t.status === col.key)}
            canMovePrev={colIndex > 0}
            canMoveNext={colIndex < COLUMNS.length - 1}
            // ToDoレーンだけ「＋」ボタンを出す（onAdd を渡したレーンにだけ表示される）
            onAdd={col.key === 'todo' ? handleAddTodo : undefined}
            onDelete={handleDelete}
            onMove={handleMove}
            onUpdateText={handleUpdateText}
          />
        ))}
      </div>
    </div>
  );
}