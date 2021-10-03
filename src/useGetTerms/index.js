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
 * React hook to make deep comparison on the inputs, not reference equality.
 *
 * @see    https://github.com/kentcdodds/use-deep-compare-effect
 * @ignore
 */
import useDeepCompareEffect from 'use-deep-compare-effect';

/**
 * Generate toast messages.
 *
 * @ignore
 */
import useToast from '../useToast';

/**
 * Toggling the value of the state.
 *
 * @ignore
 */
import useToggle from '../useToggle';

/**
 * API connection interface for setting and receiveing API key.
 *
 * @ignore
 */
import { apiClient } from '../utils';

/**
 * Retrieve list of taxonomy terms and maintain refreshing
 * this list when any of the direct arguments changed.
 *
 * @function
 * @since      1.4.1
 * @param      {string}    taxonomy    Taxonomy name.
 * @param      {Object}    args    	   Arguments to be passed to the apiFetch method.
 * @return     {Object} 			   List of terms retrieved from the API along with a list of options to select from.
 * @example
 *
 * const { termsOptions, termsQuery } = useGetTerms( 'categories' );
 */
function useGetTerms( taxonomy, args = {} ) {
	const [ options, setOptions ] = useState( [] );
	const [ query, setQuery ] = useState( '' );
	const [ loading, setLoading ] = useToggle();
	const toast = useToast();

	useDeepCompareEffect( () => {
		setLoading();
		apiClient
			.get( `/wp/v2/${ taxonomy }`, { per_page: -1, post_status: 'publish', ...args } )
			.then( ( data ) => {
				setOptions( map( data, ( term ) => pick( term, [ 'id', 'name', 'parent' ] ) ) );
				setQuery( data );
				setLoading();
			} )
			.catch( () => {
				setQuery( [] );
				setLoading();
				toast( __( 'Error: Couldn’t retrieve taxonomy terms via API.', 'sixa' ), 'error' );
			} );
	}, [ args ] );

	return { isLoading: loading, termsOptions: options, termsQuery: query };
}

export default useGetTerms;
