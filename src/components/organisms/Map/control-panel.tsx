import * as React from 'react';
import area from '@turf/area';
import centroid from '@turf/centroid'
import bbox from '@turf/bbox'
import distance from '@turf/distance'
import styled from "styled-components/native";
import st from "styled-components"


const PanelContainer = styled.View`
  color: white;
  font-family: sans-serif;
  text-align: left;
  width: 100%;
  padding-left: 20px;
`

const StyledP = st.p`
  padding: 0;
  margin: 0;
  margin-bottom: 20px;
  font-size: 12px;
`;

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
      <h3>Draw an area to search in</h3>
      {polygon ? polygon && (
        <StyledP>
          Your Area: center - ({circleCenter.geometry.coordinates.map(x => x.toFixed(3)).join(',')}) | diameter (km) - {getDiameter(circleBBox).toFixed(2)}. Click on the area and press the delete button to start over.
        </StyledP>
      ) : <StyledP>Click on the Draw button to designate a search area. Click on the map to set the center and click again to select the search radius.</StyledP>}
    </PanelContainer>
  );
}


export default React.memo(ControlPanel);
