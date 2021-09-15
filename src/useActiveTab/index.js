/**
 * Utility for libraries from the `Lodash`.
 *
 * @ignore
 */
import { get, nth } from 'lodash';

/**
 * WordPress specific abstraction layer atop React.
 *
 * @see    https://developer.wordpress.org/block-editor/reference-guides/packages/packages-element/
 * @ignore
 */
import { useState } from '@wordpress/element';

/**
 * Maintains and determines the current state of the active tab.
 *
 * @function
 * @since      1.2.2
 * @param 	   {string}    initialTabName    Initial tab element to be selected upon mounting of component.
 * @param 	   {Array}     tabs              Tabs stored from the previous state.
 * @return     {Array}                       Returns a stateful value, and a function to update it.
 * @example
 *
 * const [ activeTab, setActiveTab ] = useActiveTab( initialTabName, tabs );
 */
function useActiveTab( initialTabName, tabs ) {
	const [ activeTab, setActiveTab ] = useState( initialTabName || get( nth( tabs ), 'slug' ) );
	return [ activeTab, setActiveTab ];
}

export default useActiveTab;
