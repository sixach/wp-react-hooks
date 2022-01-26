/* eslint-disable import/named, @wordpress/no-unsafe-wp-apis */

/**
 * React hook that is used to mark the inner-blocks wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see    https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/
 * @ignore
 */
import { useInnerBlocksProps, __experimentalUseInnerBlocksProps } from '@wordpress/block-editor';

/**
 * This module merely adds backward compatibility for the usage of experimental
 * `useInnerBlocksProps` in projects created using WordPress versions prior to 5.9.
 *
 * @name       useInnerBlocksProps
 * @since      1.9.2
 * @example
 *
 * const blockProps = useBlockProps( { className: 'my-class' } );
 * const innerBlocksProps = useInnerBlocksProps(
 *     blockProps,
 *     { allowedBlocks: [ 'core/heading', 'core/paragraph', 'core/image' ] }
 * );
 */

export default __experimentalUseInnerBlocksProps || useInnerBlocksProps;
