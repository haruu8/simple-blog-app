import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import articleReducer from '../features/article/articleSlice';
// import commentReducer from '../features/comment/commentSlice';


export const store = configureStore({
  reducer: {
    article: articleReducer,
    // comment: commentReducer,
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;


export type AppDispatch = typeof store.dispatch