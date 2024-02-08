import { createSlice } from '@reduxjs/toolkit';

interface State {
    loading: boolean;
}

const initialState: State = {
    loading: false,
};

const loadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        setLoading(state) {
            state.loading = true;
        },
        clearLoading(state) {
            state.loading = false;
        },
    },
});

export const { setLoading, clearLoading } = loadingSlice.actions;

export default loadingSlice.reducer;
