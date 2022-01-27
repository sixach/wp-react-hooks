/**
 * Blob utilities for WordPress.
 *
 * @see    https://developer.wordpress.org/block-editor/reference-guides/packages/packages-blob/
 * @ignore
 */
import { isBlobURL, getBlobTypeByURL } from '@wordpress/blob';

/**
 * Data module to manage application state for both plugins and WordPress itself.
 * The data module is built upon and shares many of the same core principles of Redux.
 *
 * @see    https://developer.wordpress.org/block-editor/reference-guides/packages/packages-data/
 * @ignore
 */
import { useSelect } from '@wordpress/data';

/**
 * WordPress specific abstraction layer atop React.
 *
 * @see    https://developer.wordpress.org/block-editor/reference-guides/packages/packages-element/
 * @ignore
 */
import { useEffect, useState } from '@wordpress/element';

/**
 * Helper constants.
 *
 * @ignore
 */
import Constants from '../utils/constants';

/**
 * Retrieve media MIME type based on given attachment id.
 *
 * @function
 * @since      1.10.0
 * @param  	   {number}    id    Attachment ID.
 * @return     {string}    		 Retrieve media type associated with the given attachment ID known as MIME type.
 * @example
 *
 * const backgroundType = useGetMediaType( id );
 */
function useGetMediaType( id ) {
	const [ mediaType, setMediaType ] = useState( '' );
	const media = useSelect(
		( select ) => {
			const { getMedia } = select( 'core' );
			return getMedia( id );
		},
		[ id ]
	);

	useEffect( () => {
		if ( ! media || ! media?.url ) {
			setMediaType( '' );
		}

		if ( isBlobURL( media?.url ) ) {
			media.type = getBlobTypeByURL( media.url );
		}

		let _mediaType;
		// for media selections originated from a file upload.
		if ( media?.media_type ) {
			if ( media.media_type === Constants.IMAGE_MEDIA_TYPE ) {
				_mediaType = Constants.IMAGE_MEDIA_TYPE;
			} else {
				// only images and videos are accepted so if the media_type is not an image we can assume it is a video.
				// Videos contain the media type of 'file' in the object returned from the rest api.
				_mediaType = Constants.VIDEO_MEDIA_TYPE;
			}
		} else {
			_mediaType = media?.type;
		}

		setMediaType( _mediaType );
	}, [ media ] );

	return mediaType;
}

export default useGetMediaType;
