import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const mapPositions: [number, number] = [
  -23.773336311809338, -53.086316985647294,
];

export const Maps: React.FC = () => {
  const markerPosition = { lat: mapPositions[0], lng: mapPositions[1] }; // Set initial map center
  const zoom = 15; // Set initial zoom level

  return (
    <LoadScript googleMapsApiKey={"AIzaSyBlomcmYRydoSVgPwpqb617rXyuyVzfk8c"}>
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "600px" }}
        center={markerPosition}
        zoom={zoom}
      >
        <Marker position={markerPosition} />
      </GoogleMap>
    </LoadScript>
  );
};

export default Maps;
