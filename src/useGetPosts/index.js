/**
 * Utility helper methods specific for Sixa projects.
 *
 * @ignore
 */
import { selectOptions } from '@sixa/wp-block-utils';

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
 * Retrieve list of post-type posts and maintain refreshing
 * this list when any of the direct arguments changed.
 *
 * @function
 * @since      1.6.2
 * @param      {Object}    args    	   Arguments to be passed to the apiFetch method.
 * @param      {string}    clientId    The block’s client id.
 * @param      {string}    postType    Post type name.
 * @return     {Object} 			   List of posts retrieved from the API along with a list of options to select from.
 * @example
 *
 * const { postsOptions, postsQuery } = useGetPosts( { order: 'asc' }, clientId, 'posts' );
 */
function useGetPosts( args = {}, clientId, postType ) {
	const [ options, setOptions ] = useState( [] );
	const [ query, setQuery ] = useState( [] );
	const [ loading, setLoading ] = useToggle( true );
	const toast = useToast();

	useDeepCompareEffect( () => {
		apiClient
			.get( `/wp/v2/${ postType }`, { per_page: -1, post_status: 'publish', ...args } )
			.then( ( data ) => {
				setOptions( selectOptions( data, { id: 'value', 'title.rendered': 'label' }, [] ) );
				setQuery( data );
			} )
			.catch( () => {
				setQuery( [] );
				toast( __( 'Error: Couldn’t retrieve posts via API.', 'sixa' ), 'error' );
			} )
			.finally( setLoading );
	}, [ args, clientId, postType ] );

	return { isLoading: loading, postsOptions: options, postsQuery: query };
}

export default useGetPosts;
