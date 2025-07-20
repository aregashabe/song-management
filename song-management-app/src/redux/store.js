import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import musicReducer from './musicSlice';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    music: musicReducer, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware), // Configure middleware including saga
});

sagaMiddleware.run(rootSaga);

export default store;
