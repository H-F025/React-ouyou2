export type Status = 'todo' | 'progress' | 'done';

export interface TodoItem {
  id: string;
  text: string;
  status: Status;
}

export type MoveDirection = 'prev' | 'next';

export const COLUMNS: { key: Status; title: string }[] = [
  { key: 'todo', title: 'ToDo' },
  { key: 'progress', title: 'In Progress' },
  { key: 'done', title: 'Done' },
];