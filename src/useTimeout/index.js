/**
 * WordPress specific abstraction layer atop React.
 *
 * @see    https://developer.wordpress.org/block-editor/reference-guides/packages/packages-element/
 * @ignore
 */
import { useCallback, useEffect, useRef, useState } from '@wordpress/element';

/**
 * A setTimeout hook that calls a callback after a timeout duration.
 *
 * @function
 * @since      1.1.0
 * @param  	   {Function}    callback      	   The callback to be invoked after timeout.
 * @param  	   {number}      timeoutDelayMs    Amount of time in ms after which to invoke.
 * @return     {Object}						   Current state of the timer and methods to start and stop the timer.
 * @example
 *
 * const [ isBusy, toggleIsBusy ] = useToggle( true );
 * const { start } = useTimeout( toggleIsBusy, 2000 );
 * start();
 */
function useTimeout( callback, timeoutDelayMs ) {
	const [ isTimeoutActive, setIsTimeoutActive ] = useState( false );
	const savedRefCallback = useRef();

	useEffect( () => {
		savedRefCallback.current = callback;
	}, [ callback ] );

	const timeoutCallback = () => {
		savedRefCallback.current && savedRefCallback.current();
		clear();
	};

	const clear = useCallback( () => {
		setIsTimeoutActive( false );
	}, [] );

	const start = useCallback( () => {
		setIsTimeoutActive( true );
	}, [] );

	useEffect( () => {
		if ( isTimeoutActive ) {
			const timeout = window.setTimeout( timeoutCallback, timeoutDelayMs );

			return () => {
				window.clearTimeout( timeout );
			};
		}
	}, [ isTimeoutActive, timeoutDelayMs ] );

	return { isActive: isTimeoutActive, start, stop: clear };
}

useTimeout.defaultProps = {
	callback: () => any,
	timeoutDelayMs: 1000,
};

export default useTimeout;
