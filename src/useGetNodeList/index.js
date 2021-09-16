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
 * Function to be called when component is mounted.
 *
 * @ignore
 */
import useDidMount from '../useDidMount';

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
 * @since      1.3.0
 * @param      {string}    nodeEndpoint    API node endpoint.
 * @return     {Array}                     List of HTML nodes to be referred to when each post item looped over.
 * @example
 *
 * const nodeList = useGetNodeList( 'sixa-recent-posts-block/v1/nodes' );
 */
function useGetNodeList( nodeEndpoint ) {
	const [ nodeList, setNodeList ] = useState( '' );
	const toast = useToast();

	useDidMount( () => {
		apiClient
			.get( nodeEndpoint )
			.then( ( data ) => {
				setNodeList( data );
			} )
			.catch( () => {
				setNodeList( [] );
				toast( __( 'Error: Couldn’t retrieve HTML node list via API.', 'sixa' ), 'error' );
			} );
	} );

	return nodeList;
}

export default useGetNodeList;
