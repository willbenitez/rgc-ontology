import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface Relative {
    sourceConceptId: number;
    sourceDisplayName: string;
    relativeType: 'CHILD' | 'PARENT';
    relativeConceptId: number | null;
}

interface State {
    relatives: Relative[];
}

const initialState: State = {
    relatives: [],
};

const relativesSlice = createSlice({
    name: 'relatives',
    initialState,
    reducers: {
        addRelative(state, action: PayloadAction<Relative>) {
            state.relatives.push(action.payload);
        },
        clearRelatives(state) {
            state.relatives = [];
        },
    },
});

export const { addRelative, clearRelatives } = relativesSlice.actions;

export default relativesSlice.reducer;
