/**
 * Utility for libraries from the `Lodash`.
 *
 * @ignore
 */
import { isNumber, map, pickBy } from 'lodash';

/**
 * WordPress specific abstraction layer atop React.
 *
 * @see    https://developer.wordpress.org/block-editor/reference-guides/packages/packages-element/
 * @ignore
 */
import { useState } from '@wordpress/element';

/**
 * React hook to make deep comparison on the inputs, not reference equality.
 *
 * @see    https://github.com/kentcdodds/use-deep-compare-effect
 * @ignore
 */
import useDeepCompareEffect from 'use-deep-compare-effect';

/**
 * Generates CSS class names for activated viewports.
 *
 * @ignore
 */
const getColumnsProps = ( { prefix = 'sixa-columns-', columns, gap } ) => ( {
	className: map(
		pickBy( columns, ( column ) => isNumber( column ) ),
		( number, viewport ) => prefix + `${ number }-${ viewport }`
	),
	style: {
		'--columns-gap': gap,
	},
} );

/**
 * This hook maintains the state of each Columns viewport
 * and returns a list of Columns (breakpoint) CSS class names
 * along with inline CSS style for the gap range defined viewport-wide.
 *
 * @function
 * @since      1.8.0
 * @param  	   {Object}    props    An object of breakpoints for columns and viewport-wide gap (gutter) value.
 * @return     {Object}             Returns an object of CSS class names and inline style object.
 * @example
 *
 * const { className, style } = useColumnsProps( { columns: { widescreen: 4, laptop: 4, tablet: 2, mobile: 1 }, gap: '0px' } );
 *
 * // className => Array  [ 'sixa-columns-5-widescreen', 'sixa-columns-4-laptop', 'sixa-columns-2-tablet', 'sixa-columns-1-mobile' ]
 * // style 	=> Object { '--columns-gap': '20px' }
 */
function useColumnsProps( props ) {
	const [ columnsProps, setColumnsProps ] = useState( () => getColumnsProps( props ) );

	useDeepCompareEffect( () => {
		setColumnsProps( getColumnsProps( props ) );
	}, [ props ] );

	return columnsProps;
}

export default useColumnsProps;

/**
 * Call within a save function to get the class names for the block wrapper.
 *
 * @ignore
 */
useColumnsProps.save = getColumnsProps;
