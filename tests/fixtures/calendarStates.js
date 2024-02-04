export const events = [
    {
        id: '1',
        title: 'Cumpleaños de Carlo',
        notes: 'Comprar Pastel',
        start: new Date('2022-20-21 13:00:00:00'),
        end: new Date('2022-20-21 15:00:00:00')
    },
    {
        id: '2',
        title: 'Examén Informatica',
        notes: 'Estudiar Matemáticas',
        start: new Date('2022-20-21 13:00:00:00'),
        end: new Date('2022-20-21 15:00:00:00')
    }
];

export const initialState = {
        isLoadingEvents: true,
        events: [],
        activeEvent: null
    }
export const calendarWithEventState = {
        isLoadingEvents: false,
        events: [...events],
        activeEvent: null
    }
export const calendarWithActiveEventState = {
        isLoadingEvents: false,
        events: [...events],
        activeEvent: { ...events[0]}
    }