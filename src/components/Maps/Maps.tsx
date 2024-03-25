import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

export const Maps: React.FC = () => {
  const mapCenter = { lat: -23.751114112391136, lng: -53.31192424729619 }; // Set initial map center
  const zoom = 15; // Set initial zoom level
  const markerPosition = { lat: -23.751114112391136, lng: -53.31192424729619 }; // Set marker position

  return (
    <LoadScript googleMapsApiKey={"AIzaSyBlomcmYRydoSVgPwpqb617rXyuyVzfk8c"}>
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "600px" }}
        center={mapCenter}
        zoom={zoom}
      >
        <Marker position={markerPosition} />
      </GoogleMap>
    </LoadScript>
  );
};

export default Maps;
