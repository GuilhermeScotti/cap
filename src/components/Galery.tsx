import React from "react";

interface GalleryProps {
  images: string[];
}

const Gallery: React.FC<GalleryProps> = (props) => {
  const { images } = props;

  if (images.length === 0) {
    return <div>No images to display</div>;
  }

  return (
    <div className="gallery-screenshot">
      {images.map((image, index) => (
        <img key={index} src={image} className="screenshot" />
      ))}
    </div>
  );
};

export default Gallery;
