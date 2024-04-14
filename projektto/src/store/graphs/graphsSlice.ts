import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TDatabase } from '../../types/database';


type TGraphs = {
  graphs: TDatabase[]
}

const initialState: TGraphs = {
  graphs: [],
};

export const graphsSlice = createSlice({
  name: 'graphs',
  initialState,
  reducers: {
    saveView: (state, action: PayloadAction<{ database: TDatabase }>) => {
      const { database } = action.payload;
      state.graphs.push(database);
    },
    deleteView: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;
      state.graphs = state.graphs.filter(el => el.id !== id);
    },
    updateView: (state, action: PayloadAction<{ id: string, database: TDatabase }>) => {
      const { id, database } = action.payload;
      state.graphs = state.graphs.map(el => {
        if (el.id === id) {
          return database;
        }
        return el;
      });
    },
  },
});

export const { saveView, deleteView, updateView } = graphsSlice.actions;

export default graphsSlice.reducer;