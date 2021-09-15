/**
 * Utility to make WordPress REST API requests. It's a wrapper around `window.fetch`.
 *
 * @see    https://github.com/WordPress/gutenberg/blob/trunk/packages/api-fetch/README.md
 * @ignore
 */
import apiFetch from '@wordpress/api-fetch';

/**
 * This packages includes a library of generic WordPress components to be used for
 * creating common UI elements shared between screens and features of the WordPress dashboard.
 *
 * @see    https://developer.wordpress.org/block-editor/reference-guides/packages/packages-components/
 * @ignore
 */
import { addQueryArgs } from '@wordpress/url';

/**
 * Retrieves posts and terms via API.
 *
 * @ignore
 * @since      1.2.2
 * @param      {string}     endpoint    API endpoint.
 * @param      {Object}     args    	Arguments to be passed along with the request.
 * @return     {Promise}    			A promise representing the request processed via the registered middlewares.
 */
function get( endpoint, args = {} ) {
	return apiFetch( { method: 'GET', path: addQueryArgs( endpoint, args ) } );
}

export default { get };
