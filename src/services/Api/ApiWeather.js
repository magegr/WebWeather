import Header from '../../componentes/Header/Header';
import Calendar from '../../componentes/Calendar/GenerateCalendar';
import { useEffect, useState } from "react";
import './ApiWeather.css'
import MapaTiempo from '../../componentes/Mapa/mapa';
const Api = () => {

    const Key = process.env.REACT_APP_API_KEY;


    const [city, setCity] = useState("Catarroja");
    const [data, setData] = useState(null);
    const [dataSemana, setDataSemana] = useState([]);
    const [loading, setLoading] = useState(true);
    const [texto, setTexto] = useState("");
    const [coordenadas, setCoordenadas] = useState([]);

    const textos = {
        lluvia: "Lleva un paraguas, se esperan precipitaciones",
        sol: "Se espera un cielo despejado y soleado",
        nublado: "El cielo estará nublado y puede que llueva , no olvides el paraguas",
    };



    useEffect(() => {
        const obtenerDatos = async () => {
            try {
                const respuesta = await fetch(`https://api.weatherbit.io/v2.0/current?city=${city},ES&key=${Key}&units=M&lang=es`);
                const datos = await respuesta.json();
                setData(datos.data[0]);

                setCoordenadas([datos.data[0].lat, datos.data[0].lon]);

                const respuestaSemana = await fetch(
                    `https://api.weatherbit.io/v2.0/forecast/daily?city=${city},ES&key=${Key}&days=16&units=M&lang=es`
                );
                const datoSemana = await respuestaSemana.json();
                setDataSemana(datoSemana.data);



                if (datos.data[0].weather.description.includes("Lluvia")) {
                    setTexto(textos.lluvia);
                }
                if (datos.data[0].weather.description.includes("soleado") || datos.data[0].weather.description.includes("despejado")) {
                    setTexto(textos.sol);
                }
                if (datos.data[0].weather.description.includes("nuboso") || datos.data[0].weather.description.includes("nubes")) {
                    setTexto(textos.nublado);
                }



                setLoading(false);
            } catch (error) {
                console.error("Error al obtener datos:", error);
            }
        };
        obtenerDatos();
    }, [city]);

    if (loading) {
        return (<p>Cargando ....</p>)
    }

    return (
        <>
            <header>
                <Header setCity={setCity} />
                <p className='city'>{city}</p>
            </header>
            <main className="card">
                <section className="principal" >
                    <h3>El tiempo actual</h3>
                    <div className="temp">
                        <img src={`https://www.weatherbit.io/static/img/icons/${data.weather.icon}.png`} alt={data.weather.description} />
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
                <section>
                    <MapaTiempo coordenadas={coordenadas} />
                </section>
                <section className='calendarSection'>
                    <Calendar dataSemana={dataSemana} />
                </section>
            </main>
        </>
    );

}

export default Api;