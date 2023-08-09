import React, { useState } from 'react';
import Image from '../components/uploadImage';
import { submitPost } from '../api/postApi';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const Submit = ({ close }) => {
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

    // this function will call the send a request to our backend 
    // and redirect the user to Home page for now
    function handleSubmit(e) {
        e.preventDefault();
        // calling the function 
        uploadImages()
            .then((form) => {
                console.log("this is form data before submitting", formData, "\n", form)
                submitPost(form, token)
                    .then((response) => {
                        console.log("end with this", response)
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
        setFormData(prev => ({ ...prev, images: images }))
        const form = {
            ...formData,
            images
        }
        console.log("done pushing images in formData ", formData)
        return Promise.resolve(form)
    }


    return (
        <div className='w-full absolute z-50 h-full bg-black/70 overflow-scroll'>
            <div className='flex items-center justify-center mt-3 w-full '>
                <div className='w-3/4 md:w-1/2  bg-white border-2 border-slate-400 p-8 shadow-md'>
                    <h2>Create Post</h2>
                    <hr className="h-px mb-5 mt-2 bg-gray-200 border-0 dark:bg-gray-700 rounded"></hr>
                    <form onSubmit={handleSubmit}  >
                        <input
                            type="text"
                            name='title'
                            placeholder='Title'
                            onChange={handleChange}
                            value={formData.title}
                            className='w-full border-gray-400 p-2 border-2 rounded mb-4 '
                        />
                        <textarea
                            id='content'
                            type="text"
                            name='content'
                            placeholder='Body'
                            rows={4}
                            onChange={handleChange}
                            value={formData.content}
                            className='border-2 border-gray-400 w-full rounded resize-none p-2 mb-3'

                        />
                        <Image
                            images={img}
                            setImages={setImg}
                        />
                        <div className='flex w-full justify-end'>
                            <button type='button' onClick={close} className='p-2 px-3 mx-5 border-2 rounded bg-red-500 text-white focus:bg-red-600 hover:bg-red-600 transition-all duration-200 ease-in-out'>Cancel</button>
                            <button type='submit' style={{ color: buttonStyle }} className='text-white p-2 px-3 border-2 rounded bg-blue-400 focus:bg-blue-600 hover:bg-blue-600  transition-all duration-200 ease-in-out'><span className='text-white'>Submit</span></button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Submit;
