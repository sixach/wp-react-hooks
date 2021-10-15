/**
 * Utility for libraries from the `Lodash`.
 *
 * @ignore
 */
import { identity, map, pickBy } from 'lodash';

/**
 * WordPress specific abstraction layer atop React.
 *
 * @see    https://developer.wordpress.org/block-editor/reference-guides/packages/packages-element/
 * @ignore
 */
import { useState } from '@wordpress/element';

/**
 * Function to be called when component is updated.
 *
 * @ignore
 */
import useDidUpdate from '../useDidUpdate';

/**
 * Generates CSS class names for activated viewports.
 *
 * @ignore
 */
const getVisibilityClassNames = ( { prefix = 'sixa-hide-', ...viewports } ) =>
	map(
		pickBy( viewports, ( viewport ) => identity( viewport ) ),
		( state, viewport ) => prefix + viewport
	);

/**
 * This hook maintains the state of each visibility viewport
 * and returns a list of visibility (breakpoint) CSS class names.
 *
 * @function
 * @since      1.6.0
 * @param  	   {Object}    viewports    An object of breakpoints with their state of visibility being defined.
 * @return     {Array}                  Returns a list of visibility CSS class names.
 * @example
 *
 * const classNames = useVisibilityClassNames( { laptop: true, tablet: true, mobile: false } );
 *
 * // => Array [ 'sixa-hide-laptop', 'sixa-hide-tablet' ]
 */
function useVisibilityClassNames( viewports ) {
	const [ classNames, setClassNames ] = useState( () => getVisibilityClassNames( viewports ) );

	useDidUpdate( () => {
		setClassNames( getVisibilityClassNames( viewports ) );
	}, [ viewports ] );

	return classNames;
}

export default useVisibilityClassNames;

/**
 * Call within a save function to get the class names for the block wrapper.
 *
 * @ignore
 */
useVisibilityClassNames.save = getVisibilityClassNames;
