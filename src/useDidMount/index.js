/**
 * Utility for libraries from the `Lodash`.
 *
 * @ignore
 */
import isFunction from 'lodash/isFunction';

/**
 * WordPress specific abstraction layer atop React.
 *
 * @see    https://developer.wordpress.org/block-editor/reference-guides/packages/packages-element/
 * @ignore
 */
import { useEffect } from '@wordpress/element';

/**
 * This hook mimicks the `componentDidMount` hook for React.
 *
 * @function
 * @since      1.0.0
 * @param  	   {Function}    callback    Function to be called when component is mounted.
 * @return     {void}
 * @example
 *
 * useDidMount( () => {
 *     console.log( 'Mounted!' );
 * } );
 */
function useDidMount( callback ) {
	useEffect( () => {
		if ( isFunction( callback ) ) {
			callback();
		}
	}, [] );
}

export default useDidMount;
