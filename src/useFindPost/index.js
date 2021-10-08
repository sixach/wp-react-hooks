/**
 * Utility for libraries from the `Lodash`.
 *
 * @ignore
 */
import { find, parseInt } from 'lodash';

/**
 * WordPress specific abstraction layer atop React.
 *
 * @see    https://developer.wordpress.org/block-editor/reference-guides/packages/packages-element/
 * @ignore
 */
import { useEffect, useState } from '@wordpress/element';

/**
 * Finds the selected post object based on the given post id
 * and maintains the state of change when it happens.
 *
 * @function
 * @since      1.5.0
 * @param      {number}         postId        Selected post id.
 * @param      {Array}          postsQuery    List of posts retrieved from the API query.
 * @return     {null|Object}                  Post object.
 * @example
 *
 * const post = useFindPost( postsQuery, postId );
 */
function useFindPost( postId, postsQuery ) {
	const [ post, setPost ] = useState( null );

	useEffect( () => {
		setPost( find( postsQuery, [ 'id', parseInt( postId ) ] ) );
	}, [ postsQuery, postId ] );

	return post;
}

export default useFindPost;
