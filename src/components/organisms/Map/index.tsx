// @ts-nocheck
import * as React from 'react';
import {useState, useRef, useCallback, useContext} from 'react';
import MapGL from 'react-map-gl';
import {Editor, DrawCircleFromCenterMode, EditingMode} from 'react-map-gl-draw';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
// @ts-ignore
import styled from "styled-components/native";

import ControlPanel from './control-panel';
import {getFeatureStyle, getEditHandleStyle} from './style';
import MainButton from "../../atoms/MainButton";
import TextButton from "../../atoms/TextButton";
import { Link } from 'react-router-dom';
import {queryParamsContext} from "../../../state/queryParams";

const TOKEN = 'pk.eyJ1IjoiemluZWJmYWRpbGkiLCJhIjoiY2t3amYwNHBpMWhqMDJ4bnN0ZGx0OGpwaiJ9.TSa7TFyuKEt2cBxu4eUZag'; // Set your mapbox token here

const MapContainer = styled.View`
  padding: 40px;
  border-radius: 20px;
  background-color: #191932;
  align-items: center;
  margin-top: 30px;
`

const ButtonContainer = styled.View`
  margin-top: 20px;
  margin-bottom: 20px;
  justify-content: left;
  display: inline-block;
  width: 100%;
`

const ButtonFrame = styled.View`
  display: inline-block;
  margin-right: 20px;
`

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonDraw: {
    top: '3%',
    left: '2%',
    position: 'absolute',
    backgroundColor: 'rgb(37, 36, 93)',
    padding: 16,
    zIndex: 4,
    borderRadius: 10,
  },
  buttonDelete: {
    top: '12%',
    left: '2%',
    position: 'absolute',
    backgroundColor: 'rgb(37, 36, 93)',
    padding: 16,
    zIndex: 4,
    borderRadius: 10,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 12,
  },
});

interface Props {
  onSelectLocation: (mapSelected: boolean) => void;
}

const Map = (props: Props) => {

  const context = useContext(queryParamsContext)

  const [viewport, setViewport] = useState({
    longitude: 2.3522,
    latitude: 48.8566,
    zoom: 12,
  });
  const [mode, setMode] = useState(null);
  const [selectedFeatureIndex, setSelectedFeatureIndex] = useState(null);
  const editorRef = useRef(null);
  const [radius, setRadius] = useState(context.parameters.radius)
  const [latitude, setLatitude] = useState(context.parameters.lat)
  const [longitude, setLongitude] = useState(context.parameters.long)

  const [featuresI, setFeatures] = useState(context.parameters.mapFeature)

  const onSelect = useCallback(options => {
    setSelectedFeatureIndex(options && options.selectedFeatureIndex);
  }, []);

  const onDelete = useCallback(() => {
    // @ts-ignore
    if (selectedFeatureIndex !== null && selectedFeatureIndex >= 0) {
      // @ts-ignore
      editorRef.current.deleteFeatures(selectedFeatureIndex);
    }
  }, [selectedFeatureIndex]);

  const onUpdate = useCallback(({editType, data}) => {
    if (editType === 'addFeature') {
      const edMode = new EditingMode()
      // @ts-ignore
      setMode(edMode);
      // add to initial feature
      setFeatures(data);
    }
  }, []);

  const drawTools = (
    <>
      <TouchableOpacity style={styles.buttonDraw} onPress={() => setMode(new DrawCircleFromCenterMode())}>
        <Text style={styles.title}>Draw</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonDelete} onPress={onDelete}>
        <Text style={styles.title}>Delete</Text>
      </TouchableOpacity>
    </>
  );

  let features = editorRef.current && editorRef.current.getFeatures();
  //features = editorRef.current && editorRef.current.addFeatures(initial_features);


  const selectedFeature =
    features && (features[selectedFeatureIndex] || features[features.length - 1]);

  const onAdd = () => {
    let p = {...context.parameters}
    p.lat = latitude
    p.long = longitude
    p.radius = radius
    p.mapFeature = featuresI
    context.updateParams(p)
    props.onSelectLocation(true)
  }

  const onCancel = () => {
    let p = {...context.parameters}
    p.lat = ''
    p.long = ''
    p.radius = ''
    context.updateParams(p)
    props.onSelectLocation(false)
  }

  console.log(featuresI)
  console.log(latitude)
  console.log(longitude)
  console.log(radius)
  console.log(context)

  return (
    <MapContainer>
      <ControlPanel polygon={selectedFeature} selectRadius={setRadius} selectLatitude={setLatitude} selectLongitude={setLongitude}/>
      <View style={{alignSelf: 'center', width: "100%", borderRadius: 20, overflow: 'hidden'}}>
      <MapGL
        {...viewport}
        width="100%"
        height="80vh"
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxApiAccessToken={TOKEN}
        onViewportChange={setViewport}
      >
      <Editor
        ref={editorRef}
        style={{width: '100%', height: '100%'}}
        clickRadius={12}
        mode={mode}
        onSelect={onSelect}
        onUpdate={onUpdate}
        editHandleShape={'circle'}
        featureStyle={getFeatureStyle}
        editHandleStyle={getEditHandleStyle}
        features={featuresI}
      />
      {drawTools}
      </MapGL>
      </View>
      <ButtonContainer>
        <ButtonFrame >
            <MainButton title={"Add"} onPress={onAdd}/>
        </ButtonFrame>
        <ButtonFrame>
          <TextButton title={"Cancel"} onPress={onCancel}/>
        </ButtonFrame>
      </ButtonContainer>
    </MapContainer>
  );
}


export default Map;
