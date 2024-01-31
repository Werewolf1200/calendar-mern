import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onSetActiveEvent, onUpdateEvent, onDeleteEvent, onLoadEvents } from "../store/calendar/calendarSlice";
import calendarApi from "../api/calendarApi";
import { convertToDateEvents } from "../helpers";
import Swal from "sweetalert2";

export const useCalendarStore = () => {

  const dispatch = useDispatch();

  const { events, activeEvent } = useSelector(state => state.calendar);

  const { user } = useSelector(state => state.auth);
  
  const setActiveEvent = (calendarEvent) => {
    dispatch( onSetActiveEvent(calendarEvent))
  }

  const startSavingEvent = async (calendarEvent) => {
    
    try {
      
      if (calendarEvent.id) {

      // Actualizar
      await calendarApi.put(`/events/${ calendarEvent.id }`, calendarEvent)
      dispatch(onUpdateEvent({ ...calendarEvent, user }));
      return;
    } 
      //Crear
      const { data } = await calendarApi.post('/events', calendarEvent);
      console.log({data})
      dispatch(onAddNewEvent({ ...calendarEvent, id: data.evento.id, user }));
      
    } catch (error) {
      console.log(error);
      Swal.fire('Error al guardar', error.response.data.msg, 'error');
    }
    
  }

  const startDeleteEvent = async () => {

    try {
      
      await calendarApi.delete(`/events/${activeEvent.id}`);

      dispatch(onDeleteEvent());
      
    } catch (error) {
      console.log(error);
      Swal.fire('Error al eliminar', error.response.data.msg, 'error');
    }
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
