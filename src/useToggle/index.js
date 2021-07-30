/**
 * WordPress specific abstraction layer atop React.
 *
 * @see    https://developer.wordpress.org/block-editor/reference-guides/packages/packages-element/
 * @ignore
 */
import { useState, useCallback } from '@wordpress/element';

/**
 * This hook takes a parameter with value true or false and toggles that value to opposite.
 *
 * @function
 * @since      1.0.0
 * @param  	   {boolean}    initialState    Post content.
 * @return     {Array}                      Returns a stateful value, and a function to update it.
 * @example
 *
 * const [ isEditing, setIsEditing ] = useToggle();
 */
function useToggle( initialState = false ) {
	// Initialize the state
	const [ state, setState ] = useState( Boolean( initialState ) );

	// Define and memorize toggler function in case we pass down the component,
	// This function change the boolean value to it's opposite value
	const toggle = useCallback( () => setState( ( currentState ) => ! currentState ), [] );

	return [ Boolean( state ), toggle ];
}

export default useToggle;
