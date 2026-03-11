import{ useState, useEffect } from "react";

export default function ApiWeather() {
  
  // let mapa = [
  //   '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12331.784132403292!2d-0.414044095245054!3d39.402726976441215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd604c281cde90e3%3A0xc07903b4053cd6c!2s46470%20Catarroja%2C%20Valencia!5e0!3m2!1ses!2ses!4v1772637226761!5m2!1ses!2ses" width="400" height="300" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'
  // ]

  const [City, setCity] = useState("Catarroja");//para cambiar la ciudad al hacer click
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://api.weatherbit.io/v2.0/current/?city=${City},ES&key=fbf58466b30e4b908b0d8b68e9643d00&units=M&lang=es`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error de api");
        }
        return response.json(); 
      })
      .then((json) => {
        setData(json.data);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, [City]); 
  
  if (!data) {
  return (<p>Cargando ....</p>)
  }
  if (error) return <p>Error: {error}</p>; 

  return (
    
    <>
      <header>
        <nav>
          <ul>
            <li><button onClick={() => setCity("Madrid")}>Madrid</button></li>
            <li><button onClick={() => setCity("Valencia")}>Valencia</button></li>
          </ul>
        </nav>
        <h2></h2>
      </header>
      <main>
          <section>
            <h3>El tiempo actual en {City}</h3>
            <div>
              {data[0].ob_time}
            </div>
            <div>
              <img src={`https://www.weatherbit.io/static/img/icons/${data[0].weather.icon}.png`} alt={data[0].weather.description}/>
              <p>{data[0].temp}</p>
            </div>
            <div>
              <p>{data[0].weather.description}</p>
              <p>Sensación termica de {data[0].app_temp}</p>
            </div>
            <div>
              <p>El cielo esta {data[0].weather.description}</p>
             </div>
             <div>
              <p>Calidad del aire {data[0].aqi}</p>
              <p>Presión {data[0].pres}</p>
              <p>Humedad {data[0].rh}</p>
              <p>Punto de rocío {data[0].dewpt}</p>
            </div>
          </section>
          <section>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12331.784132403292!2d-0.414044095245054!3d39.402726976441215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd604c281cde90e3%3A0xc07903b4053cd6c!2s46470%20Catarroja%2C%20Valencia!5e0!3m2!1ses!2ses!4v1772637226761!5m2!1ses!2ses" width="400" height="300" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          </section>
          <section>
            <div></div>
            <div></div>
            <div></div>
            <div>{data[0].app_max_temp}</div>
          </section>
      </main>
    </>
  );
}

