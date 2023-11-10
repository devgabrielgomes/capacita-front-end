import React, { useMemo } from 'react';
import "./Contatos.css";
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-regular-svg-icons'
import { faMobileScreen } from '@fortawesome/free-solid-svg-icons'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
    width: '700px',
    height: '500px',
};

const center = {
    lat: 38.01624212584839,
    lng: -7.8754634051894845
};
const Contatos = () => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: import.meta.env.VITE_MAPS_KEY
    })

    const [map, setMap] = React.useState(null)

    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])


    return isLoaded ? (
        <Container className='contatos-info'>

            <Row>
                <Col md={4}>
                    <h1>Contatos</h1>
                    <h4><FontAwesomeIcon icon={faEnvelope} /> Email</h4>
                    <span>lbruno@ipbeja.pt</span>
                    <br></br>
                    <br></br>
                    <h4><FontAwesomeIcon icon={faMobileScreen} /> Telefone</h4>
                    <span>284 XXX XXX</span>
                    <br></br>
                    <span>964 XXX XXX</span>
                </Col>
                <Col>
                    <h2>Localização</h2>
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={center}
                        onLoad={onLoad}
                        onUnmount={onUnmount}
                        options={{
                            mapTypeId: 'satellite',
                            zoom: 19
                        }}
                    >
                    </GoogleMap>
                </Col>
            </Row>
        </Container >
    ) : <></>
}

export default Contatos