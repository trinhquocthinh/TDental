import type { ImageLoader } from 'next/image';

const imageLoader: ImageLoader = ({ src }) => {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

  if (src.startsWith('http')) {
    return src;
  }

  return `${basePath}${src}`;
};

export default imageLoader;
