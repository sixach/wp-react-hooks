/**
 * Utility for libraries from the `Lodash`.
 *
 * @ignore
 */
import { head, last, split } from 'lodash';

/**
 * WordPress specific abstraction layer atop React.
 *
 * @see    https://developer.wordpress.org/block-editor/reference-guides/packages/packages-element/
 * @ignore
 */
import { useMemo } from '@wordpress/element';

/**
 * Separates post-type name from its REST-API base key.
 *
 * @ignore
 */
const getPostTypeNameRestBase = ( postType ) => {
	const postTypeRestBase = split( postType, '|' );
	return {
		postTypeKey: head( postTypeRestBase ),
		restBaseKey: last( postTypeRestBase ),
	};
};

/**
 * This hook maintains the state of post-type name and
 * REST-API base key extraction from the given string value.
 *
 * @function
 * @since      1.9.0
 * @param      {string}    postType    Post type name and rest-base key.
 * @return     {Object}    			   Object of post-type name and REST-API base key.
 * @example
 *
 * const { postTypeKey, restBaseKey } = usePostTypeNameRestBase( 'post|posts' );
 */
function usePostTypeNameRestBase( postType ) {
	const { postTypeKey, restBaseKey } = useMemo( () => getPostTypeNameRestBase( postType ), [ postType ] );
	return { postTypeKey, restBaseKey };
}

export default usePostTypeNameRestBase;

/**
 * Allow this hook to be called within a save function as well.
 * This is purely added to avoid `eslint` error since Gutenberg
 * cannot process a React component for the Save output.
 *
 * @ignore
 */
usePostTypeNameRestBase.save = getPostTypeNameRestBase;
