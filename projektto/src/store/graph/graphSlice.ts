import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DatabaseType, TDatabase, TEdge } from '../../types/database';
import { Node } from 'reactflow';
import { TElement } from '../../types/node';

type GraphState = TDatabase

export const initialState: GraphState = {
  id: '',
  name: 'Graph',
  type: DatabaseType.RELATIONAL,
  tables: [],
  edges: [],
};

export const graphSlice = createSlice({
  name: 'graph',
  initialState,
  reducers: {
    setGraph: (state, action: PayloadAction<TDatabase>) => {
      const { id, name, type, tables } = action.payload;
      state.id = id;
      state.name = name;
      state.type = type;
      state.tables = tables;
    },
    addNewGraphElement: (state, action: PayloadAction<Node>) => {
      state.tables = [...state.tables, action.payload];
    },
    onNodeChanges: (state, action: PayloadAction<Node[]>) => {
      state.tables = action.payload;
    },
    addTableElement: (state, action: PayloadAction<{ id: string, element: TElement }>) => {
      const { id, element } = action.payload;
      state.tables = state.tables.map(el => {
        if (el.id === id) {
          el.data.elements.push(element);
        }
        return el;
      });
    },
    deleteTableElement: (state, action: PayloadAction<{ id: string, elementId: string }>) => {
      const { id, elementId } = action.payload;
      state.tables = state.tables.map(el => {
        if (el.id === id) {
          el.data.elements = el.data?.elements?.filter((el: any) => el.id !== elementId);
        }
        return el;
      });
    },
    deleteTable: (state, action: PayloadAction<{ tableId: string }>) => {
      const { tableId } = action.payload;
      state.tables = state.tables.filter(el => el.id !== tableId);
    },
    updateTableName: (state, action: PayloadAction<{ tableId: string; newName: string }>) => {
      const { tableId, newName } = action.payload;
      state.tables = state.tables.map(table => {
        if (table.id === tableId) {
          table.data.label = newName;
        }
        return table;
      });
    },
    onEdgeChange: (state, action: PayloadAction<TEdge[]>) => {
      state.edges = action.payload;
    },
    onChangeGraphType: (state, action: PayloadAction<{type: DatabaseType}>) => {
      state.type = action.payload.type;
    },
  },

});

export const {
  addNewGraphElement,
  onNodeChanges,
  addTableElement,
  deleteTableElement,
  deleteTable,
  updateTableName,
  setGraph,
  onEdgeChange,
  onChangeGraphType
} = graphSlice.actions;

export default graphSlice.reducer;