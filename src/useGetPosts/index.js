/**
 * Utility helper methods specific for Sixa projects.
 *
 * @ignore
 */
import { selectOptions } from '@sixach/wp-block-utils';

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
 * API connection interface for setting and receiveing API key.
 *
 * @ignore
 */
import { apiClient } from '../utils';

/**
 * Retrieve list of post-type posts and maintain refreshing
 * this list when any of the direct arguments changed.
 *
 * @function
 * @since      1.2.0
 * @param      {Object}      args    	 Arguments to be passed to the apiFetch method.
 * @param      {string}      clientId    The block’s client id.
 * @param      {string}      postType    Post type name.
 * @param      {Function}    toast    	 Creates a notification toast.
 * @return     {Object} 			  	 List of posts retrieved from the API along with a list of options to select from.
 * @example
 *
 * const { postsOptions, postsQuery } = useGetPosts( { order: 'asc' }, clientId, 'posts', toast );
 */
function useGetPosts( args, clientId, postType, toast ) {
	const [ options, setOptions ] = useState( [] );
	const [ query, setQuery ] = useState( '' );

	useDeepCompareEffect( () => {
		apiClient
			.get( postType, args )
			.then( ( data ) => {
				setOptions( selectOptions( data, { id: 'value', 'title.rendered': 'label' }, [] ) );
				setQuery( data );
			} )
			.catch( () => {
				setQuery( [] );
				toast( __( 'Error: Couldn’t retrieve posts via API.', 'sixa' ), 'error' );
			} );
	}, [ args, clientId ] );

	return { postsOptions: options, postsQuery: query };
}

export default useGetPosts;
