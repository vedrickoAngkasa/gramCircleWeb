// CircularImage.tsx

import React from 'react';
import Image from 'next/image';

const CircularImage: React.FC<{ src: string; alt: string; size?: number, border?: string }> = ({
    src,
    alt,
    size,
    border,
}) => {
    const imageSize = size || 50;

    return (
        <div className={`rounded-full overflow-hidden border border-${border}`}>
            <Image
                src={src}
                alt={alt}
                width={imageSize}
                height={imageSize}
                className="rounded-full"
            />
        </div>
    );
};

export default CircularImage;
