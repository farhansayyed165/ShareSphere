import React, { useState } from 'react';
import Image from '../components/uploadImage';
import { submitPost } from '../api/postApi';
import { useCookies } from 'react-cookie';
import axios from 'axios';

const Submit = () => {
    // fetching cookies 
    const [cookies] = useCookies(['access-token'])
    const token = cookies['access-token']
    const [buttonStyle, setButtonStyle] = useState("black")
    //pass these through a component that manages images for our post 
    const [img, setImg] = useState([]);
    const [images, setImages] = useState([])
    //setting up form data with images array empty for now
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        images: [],
    });




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
        // setButtonStyle("grey")
        const data = uploadImages()
        console.log("data", data)

        setTimeout(() => {
            console.log("timeout")
            console.log("second this")
            console.log("Submit Sent!")
            submitPost(formData, token)
                .then(res => {
                    // setButtonStyle("green")
                    console.log("end with this")
                    console.log(res)
                })
        }, 10000)
        // console.log(res)



    }

    function uploadImages() {
        img.map(element => {
            console.log("this should happen first")
            let imageData = new FormData();
            imageData.append('file', element);
            imageData.append("upload_preset", "o1hlhhqo");
            fetch('https://api.cloudinary.com/v1_1/drqdgsnat/image/upload', {
                method: 'POST',
                body: imageData
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    // console.log("response", data)
                    setFormData(prev => {
                        console.log("setting images");
                        return {
                            ...prev,
                            images: [...prev.images, data.secure_url]
                        };
                    });
                })
                .catch(error => {
                    console.error('Error uploading image:', error);
                });
            console.log("done")
        })
        const data = formData;
        return data
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
                <button type='submit' style={{ color: buttonStyle }}>Submit</button>
                <Image
                    images={img}
                    setImages={setImg}
                />
            </form>
        </div>
    );
}

export default Submit;
