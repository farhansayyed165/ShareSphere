import React, { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';

const Image = ({ images, setImages }) => {
    const [imageUrl, setImageUrl] = useState([]);
    useEffect(() => {
        if (images.length < 1) {
            return
        }
        const newImageUrls = [];
        images.forEach((image) => {
            newImageUrls.push(URL.createObjectURL(image))
        })

        setImageUrl(newImageUrls);

    }, [images])

    function onImageChange(e) {
        setImages([...e.target.files]);
    }
    return (
        <>
            <input type="file" multiple onChange={onImageChange} />
            {
                imageUrl.map((img) => {
                    const id  = nanoid()
                    return <img src={img} key={id} />
                })
            }
        </>
    );
}

export default Image;
