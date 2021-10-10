/**
 * WordPress specific abstraction layer atop React.
 *
 * @see    https://developer.wordpress.org/block-editor/reference-guides/packages/packages-element/
 * @ignore
 */
import { useEffect, useRef } from '@wordpress/element';

/**
 * This hook mimicks the `componentDidUpdate` hook for React.
 * Fires a callback on component update, and can take in a list of
 * conditions to fire callback when one of the conditions changes.
 *
 * @function
 * @since      1.1.0
 * @param  	   {Function}    callback      Function to be called when component is updated.
 * @param  	   {Array}       conditions    The list of variables which trigger update when they are changed.
 * @return     {void}
 * @example
 *
 * useDidUpdate( () => {
 *     console.log( 'Updated!' );
 * }, [ var1, var2 ] );
 */
function useDidUpdate( callback, conditions = [] ) {
	const hasMountedRef = useRef( false );

	useEffect( () => {
		if ( hasMountedRef.current ) {
			callback();
		} else {
			hasMountedRef.current = true;
		}
	}, conditions );
}

export default useDidUpdate;
