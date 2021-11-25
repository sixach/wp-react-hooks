/**
 * Utility for libraries from the `Lodash`.
 *
 * @ignore
 */
import merge from 'lodash/merge';

/**
 * Data module to manage application state for both plugins and WordPress itself.
 * The data module is built upon and shares many of the same core principles of Redux.
 *
 * @see    https://developer.wordpress.org/block-editor/reference-guides/packages/packages-data/
 * @ignore
 */
import { useDispatch } from '@wordpress/data';

/**
 * WordPress specific abstraction layer atop React.
 *
 * @see    https://developer.wordpress.org/block-editor/reference-guides/packages/packages-element/
 * @ignore
 */
import { useCallback } from '@wordpress/element';

/**
 * Updates a post meta field based on the given post ID.
 *
 * @function
 * @since      1.7.0
 * @param      {string}      metaKey      The meta key to retrieve.
 * @param      {string}      metaValue    Metadata value.
 * @param      {number}      postId       Post ID.
 * @param      {string}      postType     Post type key/name.
 * @return     {Function}				  A callback function invoked when the component requires update post-meta data.
 * @example
 *
 * const setMeta = useUpdatePostMeta( 'sixa_blocks_theme_meta', { title: false }, 8, 'post' );
 */
function useUpdatePostMeta( metaKey, metaValue = {}, postId, postType ) {
	const { editEntityRecord } = useDispatch( 'core' );
	const setMeta = useCallback(
		( key, value ) => {
			editEntityRecord( 'postType', postType, postId, {
				meta: { [ metaKey ]: merge( {}, metaValue, { [ key ]: value } ) },
			} );
		},
		[ metaValue ]
	);

	return setMeta;
}

export default useUpdatePostMeta;
