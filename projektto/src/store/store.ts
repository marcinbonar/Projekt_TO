import { configureStore } from '@reduxjs/toolkit';
import graphReducer from './graph/graphSlice';
import graphsReducer from './graphs/graphsSlice';

export const store = configureStore({
  reducer: {
    graph: graphReducer,
    graphs: graphsReducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch