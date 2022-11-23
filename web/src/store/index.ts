import {
  Action,
  AnyAction,
  configureStore,
  ThunkAction,
  ThunkDispatch,
} from '@reduxjs/toolkit';
import logger from 'redux-logger';
import fileAttachments from './fileAttachment/fileAttachmentSlice';

const store = configureStore({
  reducer: {
    employees: fileAttachments.reducer
    // user: userSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, Action>;
export type MapDispatch = ThunkDispatch<RootState, void, AnyAction>;
