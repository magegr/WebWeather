import { useState } from "react";
import './Header.css'
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';


const Header = ({ setCity }) => {

    const [city, setCityBuscador] = useState("");

    const items = [
        { label: "Catarroja", command: () => setCity("Catarroja") },
        { label: "Madrid", command: () => setCity("Madrid") },
        { label: "Barcelona", command: () => setCity("Barcelona") }
    ];


    //cuando cambia el valor del input donde estamso 'buscando'
    const changeBuscador = (e) => {
        setCityBuscador(e.target.value);
    };
    //una vez tenemos el nombre si pulsamos enter se carga la info en setCity
    const keyDownBuscador = (e) => {
        if (e.key === "Enter") {
            setCity(city);
            setCityBuscador("");
        }
    };

    const start = (
        <InputText
            placeholder="Buscar ubicacion"
            value={city}
            onChange={changeBuscador}
            onKeyDown={keyDownBuscador}
        />
    );

    return (
        <header className="header">
            <nav>
                <Menubar model={items} start={start} className="nav" />
            </nav>
        </header>
    );
};

export default Header;