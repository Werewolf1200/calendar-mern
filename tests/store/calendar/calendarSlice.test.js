import { calendarSlice, onAddNewEvent, onDeleteEvent, onLoadEvents, onLogoutCalendar, onSetActiveEvent, onUpdateEvent } from "../../../src/store/calendar/calendarSlice";
import { calendarWithEventState, initialState, events, calendarWithActiveEventState } from "../../fixtures/calendarStates";

describe('Pruebas en Calendar Slice', () => {

    test('Debe de regresar el estado inicial por defecto', () => {

        const state = calendarSlice.getInitialState();
        expect(state).toEqual(initialState)

    });
    
    test('onSetActiveEvent Debe agregar el evento', () => {

        const state = calendarSlice.reducer(calendarWithEventState, onSetActiveEvent(events[0]));
        expect(state.activeEvent).toEqual(events[0]);

    });

    test('onAddNewEvent Debe de agregar el evento', () => {

        const newEvent = {
            id: '3',
            title: 'Terminar Curso',
            notes: 'Hacer Testing',
            start: new Date('2022-20-21 13:00:00:00'),
            end: new Date('2022-20-21 15:00:00:00')
        };

        const state = calendarSlice.reducer(calendarWithEventState, onAddNewEvent(newEvent));
        expect(state.events).toEqual([...events, newEvent]);
        
    });

    test('onUpdateEvent Debe de actualizar el evento', () => {

        const updatedEvent = {
            id: '1',
            title: 'Evento Actualizado',
            notes: ' Testing',
            start: new Date('2022-20-21 13:00:00:00'),
            end: new Date('2022-20-21 15:00:00:00')
        };

        const state = calendarSlice.reducer(calendarWithEventState, onUpdateEvent(updatedEvent));
        expect(state.events).toContain(updatedEvent);

    });

    test('onDeleteEvent Debe de borrar el evento activo', () => {

        const state = calendarSlice.reducer(calendarWithActiveEventState, onDeleteEvent());

        expect(state.activeEvent).toBe(null);
        expect(state.events).not.toEqual(events[0]);

    });

    test('onLoadEvents Debe de borrar el evento activo', () => {

        const state = calendarSlice.reducer(initialState, onLoadEvents( events ));

        expect(state.isLoadingEvents).toBeFalsy();
        expect(state.events).toEqual(events);

        const newState = calendarSlice.reducer(state, onLoadEvents(events));
        expect(state.events.length).toBe(events.length);


    });

    test('onLoadEvents Debe de limiar el estado', () => {

        const state = calendarSlice.reducer(calendarWithActiveEventState, onLogoutCalendar());

        expect(state).toEqual( initialState );

    });

});