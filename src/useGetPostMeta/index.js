/**
 * Utility for libraries from the `Lodash`.
 *
 * @ignore
 */
import get from 'lodash/get';

/**
 * Data module to manage application state for both plugins and WordPress itself.
 * The data module is built upon and shares many of the same core principles of Redux.
 *
 * @see    https://github.com/WordPress/gutenberg/tree/HEAD/packages/data/README.md
 * @ignore
 */
import { useSelect } from '@wordpress/data';

/**
 * Retrieves a post meta field of the current post.
 *
 * @function
 * @since      1.7.0
 * @param      {string}    metaKey    The meta key to retrieve.
 * @return     {Object}				  An object containing currently viewed post-id and meta field value.
 * @example
 *
 * const { metaValue, postId, postSlug } = useGetPostMeta( 'sixa_blocks_theme_meta' );
 */
function useGetPostMeta( metaKey ) {
	const { postId, postMeta, postSlug } = useSelect( ( select ) => {
		const { getCurrentPostId, getEditedPostAttribute } = select( 'core/editor' );

		return {
			postId: getCurrentPostId(),
			postMeta: getEditedPostAttribute( 'meta' ),
			postSlug: getEditedPostAttribute( 'slug' ),
		};
	} );

	return { metaValue: get( postMeta, metaKey ), postId, postSlug };
}

export default useGetPostMeta;
