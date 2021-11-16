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
 * @see    https://developer.wordpress.org/block-editor/reference-guides/packages/packages-element/
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
 * API connection interface for setting and receiveing API key.
 *
 * @ignore
 */
import { apiClient } from '../utils';

/**
 * Retrieve list of HTML nodes genearted for each post item.
 *
 * @function
 * @since      1.6.2
 * @param      {string}    endpoint    API node endpoint.
 * @param      {Object}    args    	   Arguments to be passed to the apiFetch method.
 * @return     {Array}                 List of HTML nodes to be referred to when each post item looped over.
 * @example
 *
 * const nodeList = useGetNodeList( 'sixa-recent-posts-block/v1/nodes' );
 */
function useGetNodeList( endpoint, args = {} ) {
	const [ nodeList, setNodeList ] = useState( '' );
	const toast = useToast();

	useDeepCompareEffect( () => {
		apiClient
			.get( endpoint, args )
			.then( ( data ) => {
				setNodeList( data );
			} )
			.catch( () => {
				setNodeList( [] );
				toast( __( 'Error: Couldn’t retrieve HTML node list via API.', 'sixa' ), 'error' );
			} );
	}, [ args, endpoint ] );

	return nodeList;
}

export default useGetNodeList;
