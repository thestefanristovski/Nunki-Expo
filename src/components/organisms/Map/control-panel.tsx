import * as React from 'react';
import area from '@turf/area';
import centroid from '@turf/centroid'
import bbox from '@turf/bbox'
import distance from '@turf/distance'
import styled from "styled-components/native";


const PanelContainer = styled.View`
  color: white;
  textAlign: center;
`

function ControlPanel(props) {
  const polygon = props.polygon;
  const circleCenter = polygon && centroid(polygon)
  const circleBBox = polygon && bbox(polygon)

  const getDiameter = (bbx) => {
    const point1 = {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [bbx[0], bbx[1]]
      }
    };

    const point2 = {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [bbx[2], bbx[3]]
      }
    };

    const units = "kilometers";

    // const points = {
    //   "type": "FeatureCollection",
    //   "features": [point1, point2]
    // };

    return distance(point1, point2, units)
  }
  return (
    <PanelContainer>
      {polygon ? polygon && (
        <p>
          CENTER: ({circleCenter.geometry.coordinates.map(x => x.toFixed(3)).join(',')})    |    DIAMETER (km): {getDiameter(circleBBox).toFixed(2)}
        </p>    
      ) : <p>DRAW A CIRCLE</p>}
    </PanelContainer>
  );
}


export default React.memo(ControlPanel);
