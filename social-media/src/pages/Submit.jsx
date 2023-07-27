import React, { useState } from 'react';
import Image from '../components/uploadImage';
import { submitPost } from '../api/postApi';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const Submit = () => {
    // fetching cookies 
    const navigate = useNavigate()
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
        images:[],
    });




    function handleChange(e) {
        // basic function to handle changes in title and content
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    // this function will call the send a request to our backend 
    // and redirect the user to Home page for now
    function handleSubmit(e) {
        e.preventDefault();
        // calling the function 
         uploadImages()
         .then((form)=>{
             console.log("this is form data before submitting", formData, "\n",form)
             submitPost(form, token)
             .then((response)=>{
                 console.log("end with this",response)
                 navigate(`/posts/${response._id}`)
             })
            })
    }
    

    //this function will loop through the images uploaded by user,
    // upload them to cloudinary
    // and then store the url into our state -> formData
    async function uploadImages() {
        //initializing empty array
        const images = []
        console.log("this should happen first")
        // using for loop after trying .map and forEach
        for (let i = 0; i < img.length; i++) {
            console.log("in loop")
            let image = img[i];
            let imageData = new FormData();
            imageData.append('file', image);
            imageData.append("upload_preset", "o1hlhhqo");
            const response = await fetch(
                'https://api.cloudinary.com/v1_1/drqdgsnat/image/upload', {
                    method: 'POST',
                body: imageData
            })
            const data = await response.json()
            console.log(data.secure_url)
            //storing the url in our array
            console.log("pushing images");
            images.push(data.secure_url)
            
        }
        console.log("done uploading images") //for debugging
        console.log(images)

        // this setFormData does not work 
        setFormData(prev=>({...prev, images:images}))
        const form = {
            ...formData,
            images
        }
        console.log("done pushing images in formData ",formData)
        return Promise.resolve(form)
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
