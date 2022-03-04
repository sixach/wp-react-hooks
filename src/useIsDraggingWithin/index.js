/**
 * WordPress specific abstraction layer atop React.
 *
 * @see    https://developer.wordpress.org/block-editor/reference-guides/packages/packages-element/
 * @ignore
 */
import { useState } from '@wordpress/element';

/**
 * Function to be called when component is mounted.
 *
 * @ignore
 */
import useDidMount from '../useDidMount';

/**
 * This hook determines whether an element is being dragged within another (ref) target element.
 *
 * @function
 * @since      1.13.0
 * @param  	   {Object}     elementRef    Function to be called when component is updated.
 * @return     {boolean}				  Is dragging within the target element.
 * @example
 *
 * const listItemRef = useRef( null );
 * const isDraggingWithin = useIsDraggingWithin( listItemRef );
 */
function useIsDraggingWithin( elementRef ) {
	const [ isDraggingWithin, setIsDraggingWithin ] = useState( false );

	useDidMount( () => {
		const { ownerDocument } = elementRef.current;

		// Check the first time when the dragging starts.
		const handleDragStart = ( event ) => {
			handleDragEnter( event );
		};

		// Set to false whenever the user cancel the drag event by either releasing the mouse or press Escape.
		const handleDragEnd = () => {
			setIsDraggingWithin( false );
		};

		// Check if the current target is inside the item element.
		const handleDragEnter = ( event ) => {
			if ( elementRef.current.contains( event.target ) ) {
				setIsDraggingWithin( true );
			} else {
				setIsDraggingWithin( false );
			}
		};

		// Bind these events to the document to catch all drag events.
		// Ideally, we can also use `event.relatedTarget`, but that doesn't seem to be working in Safari.
		ownerDocument.addEventListener( 'dragstart', handleDragStart );
		ownerDocument.addEventListener( 'dragend', handleDragEnd );
		ownerDocument.addEventListener( 'dragenter', handleDragEnter );

		return () => {
			ownerDocument.removeEventListener( 'dragstart', handleDragStart );
			ownerDocument.removeEventListener( 'dragend', handleDragEnd );
			ownerDocument.removeEventListener( 'dragenter', handleDragEnter );
		};
	} );

	return isDraggingWithin;
}

export default useIsDraggingWithin;
