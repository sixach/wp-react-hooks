/**
 * Data module to manage application state for both plugins and WordPress itself.
 * The data module is built upon and shares many of the same core principles of Redux.
 *
 * @see    https://github.com/WordPress/gutenberg/tree/HEAD/packages/data/README.md
 * @ignore
 */
import { useDispatch } from '@wordpress/data';

/**
 * Generates custom (notification) toast messages.
 *
 * @function
 * @since       1.2.1
 * @return      {Function}    A function that could be called to initiate toast messages.
 * @example
 *
 * const toast = useToast();
 * toast( 'Text to display as a toast message!' );
 */
function useToast() {
	const { createNotice } = useDispatch( 'core/notices' );
	const toast = ( text, args, type = 'error' ) => createNotice( type, text, { isDismissible: true, type: 'snackbar', ...args } );

	return toast;
}

export default useToast;
