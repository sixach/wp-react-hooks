/**
 * Data module to manage application state for both plugins and WordPress itself.
 * The data module is built upon and shares many of the same core principles of Redux.
 *
 * @see    https://developer.wordpress.org/block-editor/reference-guides/packages/packages-data/
 * @ignore
 */
import { useSelect } from '@wordpress/data';

/**
 * Retrieves the current post object given the post ID and post-type.
 *
 * @function
 * @since      1.12.0
 * @param      {number}     postId      Post ID.
 * @param      {string}     postType    Post-type name (key).
 * @return     {Object}				    Returns the post object.
 * @example
 *
 * const currentPost = useGetCurrentPost( 748, 'page' );
 */
function useGetCurrentPost( postId, postType ) {
	const { currentPost } = useSelect(
		( select ) => {
			const { getEditedEntityRecord } = select( 'core' );

			return {
				currentPost: getEditedEntityRecord( 'postType', postType, postId ),
			};
		},
		[ postId, postType ]
	);

	return currentPost;
}

export default useGetCurrentPost;
