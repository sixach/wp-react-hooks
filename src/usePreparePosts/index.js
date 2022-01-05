/**
 * Utility for libraries from the `Lodash`.
 *
 * @ignore
 */
import { slice, forEach, find } from 'lodash';

/**
 * Utility helper methods specific for Sixa projects.
 *
 * @ignore
 */
import { isNonEmptyArray } from '@sixa/wp-block-utils';

/**
 * WordPress specific abstraction layer atop React.
 *
 * @see    https://github.com/WordPress/gutenberg/tree/HEAD/packages/element/README.md
 * @ignore
 */
import { useMemo } from '@wordpress/element';

/**
 * Determines whether the current WordPress query has posts to loop over,
 * and slices the query according to the maximum limit determined.
 *
 * @function
 * @since       1.2.0
 * @param       {Array}     ids      Handpicked post ids.
 * @param       {number}    limit    Maximum number of posts to show.
 * @param       {Array}     query    List of posts retrieved from the API query.
 * @return      {Object} 			 Sliced query, maximum number of available posts, and whether there are posts to loop over.
 * @example
 *
 * const { havePosts, maxLimit, slicedQuery } = usePreparePosts( [2], 3, [ { id: 1, title: 'Post A' }, { id: 2, title: 'Post B' } ] );
 */
function usePreparePosts( ids = [], limit = 3, query ) {
	const filterExisting = ( values, collection ) => {
		const existing = [];
		forEach( values, ( value ) => {
			const match = find( collection, [ 'id', value ] );
			if ( Boolean( match ) ) {
				existing.push( match );
			}
		} );
		return existing;
	};
	const { havePosts, maxLimit, slicedQuery } = useMemo(
		() => ( {
			havePosts: isNonEmptyArray( query ),
			maxLimit: query?.length,
			slicedQuery: isNonEmptyArray( ids ) && isNonEmptyArray( query ) ? filterExisting( ids, query ) : slice( query, 0, limit ),
		} ),
		[ ids, limit, query ]
	);

	return { havePosts, maxLimit, slicedQuery };
}

export default usePreparePosts;
