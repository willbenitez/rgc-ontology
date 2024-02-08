import { configureStore } from '@reduxjs/toolkit';
import searchReducer from '../slices/searchSlice';
import relativesReducer from '../slices/relativesSlice';
import loadingReducer from '../slices/loadingSlice';

const store = configureStore({
    reducer: {
        // Define a top-level state field named `todos`, handled by `todosReducer`
        search: searchReducer,
        relatives: relativesReducer,
        loading: loadingReducer,
    },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
