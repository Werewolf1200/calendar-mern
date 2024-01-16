import { createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';

const tempEvent = {
    title: 'Cumpleaños',
    notes: 'Comprar Pastel',
    start: new Date(),
    end: addHours(new Date(), 2),
    bgColor: '#fafafa',
    user: {
        _id: '123',
        name: 'Carlo'
    }
};

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        events: [tempEvent],
        activeEvent: null
    },
    reducers: {
        onOpenModalDate: (state) => {
            state.isDateModalOpen = true;
        },
    },
});

export const { onOpenModalDate, onCloseModalDate } = calendarSlice.actions;