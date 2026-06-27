import { NextRequest } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { isAuthenticated, createAuthResponse } from '@/lib/admin-auth';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest) {
  // Check authentication
  if (!isAuthenticated(request)) {
    return createAuthResponse();
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const folder = formData.get('folder') as string || 'uget';

    if (!file) {
      return Response.json({ error: 'No file provided' }, { status: 400 });
    }

    // Check if Cloudinary is configured
    if (!process.env.CLOUDINARY_CLOUD_NAME) {
      return Response.json(
        { error: 'Cloudinary not configured. Please add CLOUDINARY credentials to environment variables.' },
        { status: 500 }
      );
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Build transformation string for URL (applied after upload, not during)
    let transformationStr: string;

    if (folder === 'members') {
      transformationStr = 'c_fill,g_face,h_500,w_500/q_auto:good/f_auto';
    } else if (folder === 'news') {
      transformationStr = 'c_fill,g_auto,h_600,w_1200/q_auto:good/f_auto';
    } else {
      transformationStr = 'c_limit,h_800,w_800/q_auto:good/f_auto';
    }

    // Upload raw file — no transformation in upload options (causes invalid signature)
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: folder,
          resource_type: 'auto',
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      uploadStream.end(buffer);
    });

    const uploadResult = result as any;

    // Build transformed URL manually using public_id
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const transformedUrl = `https://res.cloudinary.com/${cloudName}/image/upload/${transformationStr}/${uploadResult.public_id}`;

    return Response.json({
      success: true,
      url: transformedUrl,
      publicId: uploadResult.public_id,
    });
  } catch (error: any) {
    console.error('Upload error:', error);
    return Response.json(
      { error: error.message || 'Upload failed' },
      { status: 500 }
    );
  }
}
