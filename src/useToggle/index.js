/**
 * WordPress specific abstraction layer atop React.
 *
 * @see    https://developer.wordpress.org/block-editor/reference-guides/packages/packages-element/
 * @ignore
 */
import { useReducer } from '@wordpress/element';

/**
 * Reducer dispatch that takes a parameter with value true or false and toggles that value to opposite.
 *
 * @ignore
 */
const defaultToggleFunction = ( value ) => ! Boolean( value );

/**
 * This hook takes a parameter with value and allows for quickly toggling the value.
 *
 * @function
 * @since      1.1.0
 * @param  	   {any|boolean}    initialValue      Initial value of the toggle.
 * @param  	   {Function}       toggleFunction    A toggle function. This allows for non boolean toggles.
 * @return     {Array}                        	  Returns a stateful value, and a function to update it.
 * @example
 *
 * const [ value1, toggleValue1 ] = useToggle();
 * const [ value2, toggleValue2 ] = useToggle( true );
 * const [ value3, toggleValue3 ] = useToggle( 'start', customToggleFunction );
 */
function useToggle( initialValue, toggleFunction ) {
	return useReducer( toggleFunction || defaultToggleFunction, initialValue );
}

useToggle.defaultProps = {
	initialValue: false,
	toggleFunction: defaultToggleFunction,
};

export default useToggle;
