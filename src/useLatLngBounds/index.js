/**
 * Utility for libraries from the `Lodash`.
 *
 * @ignore
 */
import nth from 'lodash/nth';

/**
 * WordPress specific abstraction layer atop React.
 *
 * @see    https://developer.wordpress.org/block-editor/reference-guides/packages/packages-element/
 * @ignore
 */
import { useEffect, useState } from '@wordpress/element';

/**
 * Transform a description of a location into geographical coordinates.
 *
 * @see    https://www.npmjs.com/package/react-geocode
 * @ignore
 */
import Geocode from 'react-geocode';

/**
 * Function to be called when component is mounted.
 *
 * @ignore
 */
import useDidMount from '../useDidMount';

/**
 * Get latitude & longitude from address.
 *
 * @function
 * @since      1.2.2
 * @param 	   {string}          address    Address.
 * @param      {string}          apiKey     GoogleMaps API key.
 * @param      {string}          locale 	Region and language code of the parsed address.
 * @return     {Object|string}				latitude & longitude object or error message.
 * @example
 *
 * const latLng = useLatLngBounds( 'Skyland Istanbul, Sarıyer, Turkey', 'H7ZH7p3dHa24...', 'en );
 */
function useLatLngBounds( address = '', apiKey = '', locale = 'en' ) {
	const [ latLng, setLatLng ] = useState( { lat: 0, lng: 0 } );

	useDidMount( () => {
		Geocode.setLanguage( locale );
		Geocode.setRegion( locale );
	} );

	useEffect( () => {
		Geocode.setApiKey( apiKey );
		Geocode.fromAddress( address )
			.then( ( { results, status } ) => {
				if ( 'OK' === status ) {
					const {
						geometry: { location },
					} = nth( results );
					setLatLng( location || {} );
				}
			} )
			.catch( ( { message } ) => {
				setLatLng( message.toString() );
			} );
	}, [ address, apiKey ] );

	return latLng;
}

export default useLatLngBounds;
