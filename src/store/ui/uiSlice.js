import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        isDateModalOpen : false
    },
    reducers: {
        onOpenModalDate: (state) => {
            state.isDateModalOpen = true;
        },
        onCloseModalDate: (state) => {
            state.isDateModalOpen = false;
        },
    },
});

export const { onOpenModalDate, onCloseModalDate } = uiSlice.actions;