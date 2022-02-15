/**
 * Retrieve the block support value for a feature, if defined.
 *
 * @see    https://developer.wordpress.org/block-editor/reference-guides/packages/packages-blocks/
 * @ignore
 */
import { getBlockSupport } from '@wordpress/blocks';

/**
 * WordPress specific abstraction layer atop React.
 *
 * @see    https://developer.wordpress.org/block-editor/reference-guides/packages/packages-element/
 * @ignore
 */
import { useMemo } from '@wordpress/element';

/**
 * Retrives the block support value for the "Layout" settings to be used in the preview.
 *
 * @function
 * @since       1.11.0
 * @param       {string}    blockTypeOrName    The name for a block is a unique string that identifies a block.
 * @return      {Object} 			           Block level "Layout" settings object.
 * @example
 *
 * const { default } = useGetBlockLayout( 'core/social-links' );
 *
 * // { 'type': 'flex' }
 */
function useGetBlockLayout( blockTypeOrName ) {
	const layoutBlockSupportConfig = useMemo( () => getBlockSupport( blockTypeOrName, '__experimentalLayout' ) || {}, [ blockTypeOrName ] );
	return layoutBlockSupportConfig;
}

export default useGetBlockLayout;
