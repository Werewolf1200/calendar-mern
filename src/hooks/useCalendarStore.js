import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onSetActiveEvent, onUpdateEvent, onDeleteEvent, onLoadEvents } from "../store/calendar/calendarSlice";
import calendarApi from "../api/calendarApi";
import { convertToDateEvents } from "../helpers";

export const useCalendarStore = () => {

  const dispatch = useDispatch();

  const { events, activeEvent } = useSelector(state => state.calendar);

  const { user } = useSelector(state => state.auth);
  
  const setActiveEvent = (calendarEvent) => {
    dispatch( onSetActiveEvent(calendarEvent))
  }

  const startSavingEvent = async (calendarEvent) => {
    if (calendarEvent._id) {
      dispatch( onUpdateEvent({...calendarEvent}))
    } else {
      //Crear
      const { data } = await calendarApi.post('/events', calendarEvent);
      console.log({data})
      dispatch( onAddNewEvent({ ...calendarEvent, id: data.evento.id, user }) );
    }
  }

  const startDeleteEvent = () => {
      dispatch(onDeleteEvent());
  }
  
  const startLoadingEvents = async () => {
    
    try {
      
      const { data } = await calendarApi.get('/events');
      const events = convertToDateEvents(data.eventos);
      
      dispatch(onLoadEvents(events));
      
    } catch (error) {
      console.log(error)
    }
  }

    return {
        // Propiedades
      activeEvent,
      events,
      hasEventSelected: !!activeEvent,
        
      // Métodos
      setActiveEvent,
      startSavingEvent,
      startDeleteEvent,
      startLoadingEvents
  }
}
