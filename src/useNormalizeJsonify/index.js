/**
 * Utility helper methods specific for Sixa projects.
 *
 * @ignore
 */
import { isNonEmptyArray, jsonify } from '@sixa/wp-block-utils';

/**
 * Validate and normalize JSON string to an array.
 *
 * @function
 * @since      1.5.0
 * @param 	   {string}    value    JSON string to be normalized to an array.
 * @return     {Array}			    Constructed JavaScript object from the given JSON string.
 * @example
 *
 * const options = useNormalizeJsonify( '[\u0022Search Engine\u0022,\u0022Social Media\u0022]' );
 *
 * // => Array [ 'Search Engine', 'Social Media' ]
 */
function useNormalizeJsonify( value = '[""]' ) {
	const jsonifyValue = jsonify( value );

	return ! isNonEmptyArray( jsonifyValue ) ? [ '' ] : jsonifyValue;
}

export default useNormalizeJsonify;

/**
 * Allow this hook to be called within a save function as well.
 * This is purely added to avoid `eslint` error since Gutenberg
 * cannot process a React component for the Save output.
 *
 * @ignore
 */
useNormalizeJsonify.save = useNormalizeJsonify;
