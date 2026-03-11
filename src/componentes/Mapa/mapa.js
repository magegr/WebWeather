import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"; //libreria principal de leaflet
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

L.Marker.prototype.options.icon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow
})

const MapaTiempo = ({coordenadas}) => {
  return (
    <MapContainer //crea el mapa
      key={coordenadas.toString()} //para que react piense que es un nuevo componente 'le estamos modificando el dni' asi lo vuekve a generar y lo pasamos a string
      center={coordenadas} //define donde se va a situar
      zoom={12}
      style={{ height: "270px", width: "100%" }}
    >

      <TileLayer //carga las imagenes del mapa
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" //s -> servidor z-> zoom x e y -> horizontal vertical 
      />

       <Marker position={coordenadas}>
        <Popup>
          Estas aquí
        </Popup>
      </Marker>

    </MapContainer>
  );

}
export default MapaTiempo;