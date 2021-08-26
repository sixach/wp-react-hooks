/**
 * Utility for libraries from the `Lodash`.
 *
 * @ignore
 */
import { map, pick } from 'lodash';

/**
 * Retrieves the translation of text.
 *
 * @see    https://developer.wordpress.org/block-editor/packages/packages-i18n/
 * @ignore
 */
import { __ } from '@wordpress/i18n';

/**
 * WordPress specific abstraction layer atop React.
 *
 * @see    https://github.com/WordPress/gutenberg/tree/HEAD/packages/element/README.md
 * @ignore
 */
import { useState } from '@wordpress/element';

/**
 * Helper React hooks specific for Sixa projects.
 *
 * @ignore
 */
import useDidMount from '../useDidMount';

/**
 * API connection interface for setting and receiveing API key.
 *
 * @ignore
 */
import { apiClient } from '../utils';

/**
 * Retrieve list of taxonomy terms only invoked
 * immediately after the Edit component is mounted.
 *
 * @function
 * @since      1.2.0
 * @param      {string}      taxonomy    Taxonomy name.
 * @param      {Function}    toast    	 Creates a notification toast.
 * @return     {Object} 			  	 List of terms retrieved from the API along with a list of options to select from.
 * @example
 *
 * const { termsOptions, termsQuery } = useGetTerms( 'categories', toast );
 */
function useGetTerms( taxonomy, toast ) {
	const [ options, setOptions ] = useState( [] );
	const [ query, setQuery ] = useState( '' );

	useDidMount( () => {
		apiClient
			.get( taxonomy )
			.then( ( data ) => {
				setOptions( map( data, ( term ) => pick( term, [ 'id', 'name', 'parent' ] ) ) );
				setQuery( data );
			} )
			.catch( () => {
				setQuery( [] );
				toast( __( 'Error: Couldn’t retrieve taxonomy terms via API.', 'sixa' ), 'error' );
			} );
	} );

	return { termsOptions: options, termsQuery: query };
}

export default useGetTerms;
