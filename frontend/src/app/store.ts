import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import articleReducer from '../components/article/articleSlice';
import authReducer from '../components/auth/authSlice';
// import commentReducer from '../features/comment/commentSlice';


export const store = configureStore({
  reducer: {
    article: articleReducer,
    auth: authReducer,
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


export type AppDispatch = typeof store.dispatch;
