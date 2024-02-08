import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../common/api';
import type { OntologyItem } from '../../common/types';

interface State {
    results: OntologyItem[];
    status: string | null;
    resultsFor: string | null;
}

const initialState: State = {
    results: [],
    status: null,
    resultsFor: null,
};

export const getSearchResults = createAsyncThunk(
    'search/updateResults',
    async (text: string, thunkAPI) => {
        const results = await api.get<OntologyItem[]>(`/search?text=${text}`);
        return results ?? [];
    }
);

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        clearSearchResults(state) {
            state.results = [];
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getSearchResults.pending, (state, action) => {
            state.status = 'loading';
        });
        builder.addCase(
            getSearchResults.fulfilled,
            (state, { payload, meta }) => {
                state.status = 'done';
                state.results = payload;
                state.resultsFor = meta.arg;
            }
        );
        builder.addCase(getSearchResults.rejected, (state) => {
            state.status = 'failed';
        });
    },
});

export const { clearSearchResults } = searchSlice.actions;

export default searchSlice.reducer;
