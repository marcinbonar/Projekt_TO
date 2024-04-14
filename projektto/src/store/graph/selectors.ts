import { RootState } from '../store';

export const getTables = (state: RootState) => state.graph.tables;
export const getCurrentGraph = (state: RootState) => state.graph