import React, { useState } from 'react';
import Image from '../components/uploadImage';
import { submitPost } from '../api/postApi';
import { useCookies } from 'react-cookie';
import axios from 'axios';

const Submit = () => {
    // fetching cookies 
    const [cookies] = useCookies(['access-token'])
    const token = cookies['access-token']
    //pass these through a component that manages images for our post 
    const [img, setImg] = useState([]);
    const [images,setImages] = useState([])
    //setting up form data with images array empty for now
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        images: [],
    });

    console.log(images)



    function handleChange(e) {
        // basic function to handle changes in title and content
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    }
    
    function handleSubmit(e) {
        
        e.preventDefault();
        setFormData(prev => ({
            ...prev,
            images
        }))
        console.log(formData)
        submitPost(formData, token)
            .then(res => console.log(res))
    }

    function uploadImages() {
        img.forEach(element => {
            let imageData = new FormData();
            imageData.append('file', element);
            imageData.append("upload_preset", "o1hlhhqo");
            axios.post('https://api.cloudinary.com/v1_1/drqdgsnat/image/upload', imageData)
            .then(res=>{
                console.log(res)
                setImages(prev=>{
                    return [...prev, res.data.secure_url]
                })
                
            })
        })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name='title'
                    placeholder='Title'
                    onChange={handleChange}
                    value={formData.title}
                />
                <input
                    type="text"
                    name='content'
                    placeholder='content'
                    onChange={handleChange}
                    value={formData.content}
                />
                <br />
                <button type='button' onClick={uploadImages}>Upload Images</button>
                <button type='submit'>Submit</button>
                <Image
                    images={img}
                    setImages={setImg}
                />
            </form>
        </div>
    );
}

export default Submit;
