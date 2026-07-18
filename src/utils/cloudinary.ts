import { Platform } from 'react-native';
import axios from 'axios';

// Unsigned upload credentials for Cloudinary
// In a real production application, these can be set in a config file or loaded dynamically.
export const CLOUDINARY_CLOUD_NAME = 'zyoximg';
export const CLOUDINARY_UPLOAD_PRESET = 'zyox_v';

export interface CloudinaryUploadResponse {
  secure_url: string;
  public_id: string;
}

/**
 * Uploads a local file to Cloudinary and returns the secure URL of the uploaded asset.
 * @param fileUri Local URI of the file
 * @param fileName Name of the file
 * @param fileType MIME type of the file
 */
export const uploadImageToCloudinary = async (
  fileUri: string,
  fileName: string,
  fileType: string,
): Promise<string> => {
  const formData = new FormData();

  // Format URI properly depending on the platform
  const cleanUri = Platform.OS === 'ios' ? fileUri.replace('file://', '') : fileUri;

  formData.append('file', {
    uri: cleanUri,
    type: fileType || 'image/jpeg',
    name: fileName || 'upload.jpg',
  } as any);

  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

  try {
    const response = await axios.post<CloudinaryUploadResponse>(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return response.data.secure_url;
  } catch (error: any) {
    console.error('Cloudinary image upload error:', error);
    if (error.response) {
      console.error('Cloudinary error response:', error.response.data);
    }
    const errMsg = error.response?.data?.error?.message || error.message || 'Unknown error';
    throw new Error(`Failed to upload image to Cloudinary: ${errMsg}`);
  }
};
