import { atom, useAtom, useSetAtom } from 'jotai';

export { useAtom, useSetAtom };

export const columnFiltersAtom = atom<Record<string, string[]>>({});
export const globalFilterAtom = atom<string>('');
