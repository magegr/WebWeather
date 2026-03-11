import './GenerateCalendar.css'
import FullCalendar from '@fullcalendar/react'
import esLocale from '@fullcalendar/core/locales/es'
import dayGridPlugin from '@fullcalendar/daygrid'

const Calendar = ({ dataSemana }) => {

  const eventos = dataSemana.map((dia) => ({

    start: dia.datetime,
    extendedProps: { //para guardar datos que el fullCalendar no reconoce , por defecto esta el title
      max: dia.app_max_temp,
      min: dia.app_min_temp,
      icon: dia.weather.icon
    }

  }));

  const renderEventContent = (eventInfo) => { //oparametro que le pasa fullCalendar
    const { max, min, icon } = eventInfo.event.extendedProps //Como la ruta

    return (
      <div>
        <img
          src={`https://www.weatherbit.io/static/img/icons/${icon}.png`}
          alt="weather"
          style={{ width: "35px" }}
        />
        <div>{max}° / {min}°</div>
      </div>
    )
  }

  return (
    <div style={{ width: "100%", padding: "20px" }}>
      <FullCalendar
        className='container'
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        height="auto"
        locale={esLocale}//para ponerlo en castellano
        dayHeaderFormat={{ weekday: 'long' }}//si no se pone esto sale lun mart
        events={eventos}
        eventContent={renderEventContent}
      />
    </div>
  );
}

export default Calendar;