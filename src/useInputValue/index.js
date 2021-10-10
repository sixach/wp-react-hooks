/**
 * WordPress specific abstraction layer atop React.
 *
 * @see    https://developer.wordpress.org/block-editor/reference-guides/packages/packages-element/
 * @ignore
 */
import { useCallback, useState } from '@wordpress/element';

/**
 * This hook takes an initial value for an input field
 * and updates it when the `onChange` event raises.
 *
 * @function
 * @since      1.1.0
 * @param  	   {string}    initialValue    Initial value of the field.
 * @return     {Array}					   Returns a stateful value, and a function to update it.
 * @example
 *
 * const [ value, setValue ] = useInputValue( 'Hello' );
 * <TextControl onChange={ setValue } value={ value } />
 */
function useInputValue( initialValue = '' ) {
	const [ value, setValue ] = useState( initialValue );
	const onChange = useCallback( ( event ) => {
		setValue( event?.currentTarget?.value || event );
	}, [] );

	return [ value, onChange ];
}

export default useInputValue;
