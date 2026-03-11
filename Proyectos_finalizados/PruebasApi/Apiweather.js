import { useEffect, useState } from "react";
import './Weather.css';

export default function ApiWeather() {
   
    const Key='fbf58466b30e4b908b0d8b68e9643d00';
    
    const [City, setCity] = useState("Catarroja");
    const [texto, setTexto] = useState("");
    const [mapa, setMapa] = useState("");
    const [diasCalendario, setDiasCalendario] = useState([]);
    const [mesesCalendario,setMesesCalendario]= useState([]);
    const hoy = new Date();
    const [mesSeleccionado, setMesSeleccionado] = useState(hoy.getMonth());

    const textos = {
        lluvia: "Lleva un paraguas, se esperan precipitaciones",
        sol: "Se espera un cielo despejado y soleado",
        nublado: "El cielo estará bastante nublado",
    };

    const mapas= {
        Catarroja:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12331.784132403292!2d-0.414044095245054!3d39.402726976441215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd604c281cde90e3%3A0xc07903b4053cd6c!2s46470%20Catarroja%2C%20Valencia!5e0!3m2!1ses!2ses!4v1772637226761!5m2!1ses!2ses",
        Madrid : "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d194347.47826828313!2d-3.8443473332189027!3d40.43809861093787!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd422997800a3c81%3A0xc436dec1618c2269!2sMadrid!5e0!3m2!1ses!2ses!4v1772710961264!5m2!1ses!2ses",
        Valencia:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d197294.6626863791!2d-0.673353591496467!3d39.4076343509142!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd604f4cf0efb06f%3A0xb4a351011f7f1d39!2sValencia!5e0!3m2!1ses!2ses!4v1772712166477!5m2!1ses!2ses"
    }
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    
    function generarCalendario(mes) {

        const hoy = new Date();
        const año = hoy.getFullYear();
    

        let primerDia = new Date(año, mes, 1).getDay();

        primerDia = primerDia === 0 ? 6 : primerDia - 1;

        const diasMes = new Date(año, mes + 1, 0).getDate();

        const dias = [];

        // espacios vacíos antes del primer día
        for (let i = 0; i < primerDia; i++) {
            dias.push(null);
        }

        // días del mes
        for (let i = 1; i <= diasMes; i++) {
            dias.push(i);
        }

        return dias;
    }
    useEffect(() => {
        const dias = generarCalendario(mesSeleccionado);
        setDiasCalendario(dias);
    }, [mesSeleccionado]);


    const nombresMeses = [
        "Enero","Febrero","Marzo","Abril","Mayo","Junio",
        "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"
    ];

    useEffect(() => {
    setMesesCalendario(nombresMeses);
    });

    useEffect(() => {
    const obtenerDatos = async () => {
        try {
        const respuesta = await fetch(`https://api.weatherbit.io/v2.0/current?city=${City},ES&key=${Key}&units=M&lang=es`);
        const datos = await respuesta.json();
        setData(datos.data[0]);

        if (datos.data[0].weather.description.includes("Lluvia")) {
            setTexto(textos.lluvia);
        } 
        if (datos.data[0].weather.description.includes("soleado") || datos.data[0].weather.description.includes("despejado")) {
            setTexto(textos.sol);
        } 
        if (datos.data[0].weather.description.includes("nuboso") || datos.data[0].weather.description.includes("nubes")) {
            setTexto(textos.nublado);
        } 
    
        setMapa(mapas[City]);

        setLoading(false);
        } catch (error) {
        console.error("Error al obtener datos:", error);
        }
    };
        obtenerDatos();
    }, [City]);

    if(loading){
        return (<p>Cargando ....</p>)
    }
    return (<>
      <header>
        <nav className="varNav">
          <ul>
            <li><button onClick={() => setCity("Catarroja")}>Catarroja</button></li>
            <li><button onClick={() => setCity("Madrid")}>Madrid</button></li>
            <li><button onClick={() => setCity("Valencia")}>Valencia</button></li>
          </ul>
        </nav>
        <p>{City}</p>
      </header>
      <main className="card">
          <section className="principal" >
                <h3>El tiempo actual</h3>
                <div className="temp">
                    <img src={`https://www.weatherbit.io/static/img/icons/${data.weather.icon}.png`} alt={data.weather.description}/>
                    <p>{data.temp}°C</p>
                </div>
                <div className="infoDech">
                    <p><strong>{data.weather.description}</strong></p>
                    <p>Sensación termica de <b>{data.app_temp}</b></p>
                </div>
                <div className="infoIzq">
                    <p>{texto}</p>
                </div>
                <div className="infoGen">
                    <p>Calidad del aire <br /><strong>{data.aqi}</strong></p>
                    <p>Presión <br /><strong>{data.pres}</strong></p>
                    <p>Humedad <br /><strong>{data.rh}</strong></p>
                    <p>Punto de rocío<br /><strong>{data.dewpt}</strong></p>
                </div>
            </section>
            <section className="mapa">
                <iframe src={mapa} width="400" height="300" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </section>
            
            <section className="meses">
                <ul> 
                    {mesesCalendario.map((mes, index) => (
                    <li key={index}>
                        <button onClick={() => setMesSeleccionado(index)} >
                            <strong>{mes}</strong>
                        </button> 
                    </li>
                    ))}
                </ul> 
            </section>

            <section className="calendario">
                <ul id="semana"> 
                    <li>Lunes</li> 
                    <li>Martes</li> 
                    <li>Miércoles</li> 
                    <li>Jueves</li> 
                    <li>Viernes</li> 
                    <li>Sábado</li> 
                    <li>Domingo</li> 
                </ul>
                <ul className="dias">
                    {diasCalendario.map((dia, index) => (
                    <li key={index}>
                        {dia}
                    </li>
                    ))}
                </ul>
          </section>
      </main>
    </>
  );
}