import React, { useEffect, useRef, useState } from 'react';

const ImageCollection = () => {
    const canvasRefs = useRef([]);

    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await fetch('http://localhost:8080/static/json/JSON_DATA.json');
                const data = await response.json();
                let img_id = 0;
                data.images.map((img, index) => {
                    img.id = img_id++;
                    img.image_url = 'http://localhost:8080' + img.image_url;

                });
                setImages(data.images);
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };

        fetchImages();
    }, []);

    const saveImage = (image) => {
        const canvas = canvasRefs.current[image.id];
        const link = document.createElement('a');
        link.download = `image_${image.id}.png`;
        link.href = canvas.toDataURL();
        link.click();
    };

    return (
        <div>
            {images.map((image) => (
                <div key={image.id}>
                    <canvas crossOrigin="anonymous" ref={(el) => (canvasRefs.current[image.id] = el)} />
                    <button onClick={() => saveImage(image)}>Save Image</button>
                    {image && (
                        <img
                            src={image.image_url}
                            alt={`ig ${image.id}`}
                            style={{ display: 'none' }}
                            onLoad={() => {
                                const canvas = canvasRefs.current[image.id];
                                const context = canvas.getContext('2d');
                                const img = new Image();
                                img.src = image.image_url;
                                img.onload = () => {
                                    img.crossOrigin = "anonymous";
                                    canvas.width = img.width;
                                    canvas.height = img.height;
                                    context.drawImage(img, 0, 0);
                                };

                            }}
                        />
                    )}
                </div>
            ))}
        </div>
    );
};

export default ImageCollection;