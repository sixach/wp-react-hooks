/**
 * Data module to manage application state for both plugins and WordPress itself.
 * The data module is built upon and shares many of the same core principles of Redux.
 *
 * @see    https://developer.wordpress.org/block-editor/reference-guides/packages/packages-data/
 * @ignore
 */
import { useSelect } from '@wordpress/data';

/**
 * HTML entity utilities for WordPress.
 *
 * @see    https://developer.wordpress.org/block-editor/reference-guides/packages/packages-html-entities/
 * @ignore
 */
import { decodeEntities } from '@wordpress/html-entities';

/**
 * Retrieves the current site data or object.
 *
 * @function
 * @since      1.12.0
 * @param      {Array}     dependencies    An array of optional dependencies to refresh the hook output.
 * @return     {Object}				       Returns site data and title within an object.
 * @example
 *
 * const { siteTitle } = useGetSiteData();
 */
function useGetSiteData( dependencies = [] ) {
	const { siteData, siteTitle } = useSelect( ( select ) => {
		const { getEntityRecord } = select( 'core' );
		const data = getEntityRecord( 'root', '__unstableBase' );

		return {
			siteData: data,
			siteTitle: decodeEntities( data?.name ),
		};
	}, dependencies );

	return { siteData, siteTitle };
}

export default useGetSiteData;
