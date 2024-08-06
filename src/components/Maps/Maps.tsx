import React, { useEffect } from "react";
import "ol/ol.css";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { fromLonLat, toLonLat } from "ol/proj";
import { Feature } from "ol";
import { Point } from "ol/geom";
import { Style, Icon } from "ol/style";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import { click } from "ol/events/condition";
import Select from "ol/interaction/Select";

const Maps: React.FC = () => {
  useEffect(() => {
    const coordinates = [-23.775032292461756, -53.08216998960385];
    const mapCenter = fromLonLat(coordinates); // Convert to map projection

    const marker = new Feature({
      geometry: new Point(mapCenter),
    });

    marker.setStyle(
      new Style({
        image: new Icon({
          src: "https://openlayers.org/en/v4.6.5/examples/data/icon.png",
          anchor: [0.5, 1],
        }),
      }),
    );

    const vectorSource = new VectorSource({
      features: [marker],
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource,
    });

    const map = new Map({
      target: "map",
      controls: [],
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        vectorLayer,
      ],
      view: new View({
        center: mapCenter,
        zoom: 13,
      }),
    });

    // Add click event listener to the marker
    const selectClick = new Select({
      condition: click,
      layers: [vectorLayer],
    });

    selectClick.on("select", (event) => {
      if (event.selected.length > 0) {
        const [lon, lat] = coordinates;
        const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`;
        window.open(googleMapsUrl, "_blank");
      }
    });

    map.addInteraction(selectClick);

    // Clean up the map instance when the component unmounts
    return () => {
      map.setTarget(undefined);
    };
  }, []);

  return (
    <div className="h-96 w-full overflow-hidden rounded-lg border-2  border-[#c6a482]">
      <div
        id="map"
        className="rounded"
        style={{ width: "100%", height: "100%" }}
      ></div>
    </div>
  );
};

export default Maps;
