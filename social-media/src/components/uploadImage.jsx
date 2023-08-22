import React, { useEffect, useState, useRef } from 'react';
import Carousel from './Carousel';
import {BsFillImageFill} from 'react-icons/bs'

const Image = ({ images, setImages, imageLink }) => {
    const inputField = useRef(null)
    const [imageUrl, setImageUrl] = useState(imageLink ? imageLink : []);
    function ChangeUrl(e){
        const arr = [...images, ...e.target.files]
        setImages(arr)
        return arr
    }
    function onImageChange(e) {
        const data = ChangeUrl(e)
        const newImageUrls = [];
        data.forEach((image) => {
            newImageUrls.push(URL.createObjectURL(image))
        })
        
        setImageUrl(prev => ([...prev, ...newImageUrls]));

    }
    function handleClick(e){
        e.preventDefault()
        inputField.current.click()
    }
    return (
            <div className='mb-4'>
                <button onClick={handleClick} className=' border-2 border-slate-600 rounded p-2'><BsFillImageFill/></button>
                <input type="file" multiple onChange={onImageChange} className='hidden' ref={inputField}/>
                <div className='flex'>
                    <Carousel items={imageUrl} edit={true}></Carousel>
                </div>
            </div>
    );
}

export default Image;
