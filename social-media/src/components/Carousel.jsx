import React, { useState, useEffect } from 'react'
import { AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai'

function Carousel({ items, id }) {
    const [slideState, setSlideState] = useState(0);
    const [renderButtons, setRenderButtons] = useState({ previous: false, next: true })
    const slides = items.map((item, i) => {
        return (
            <div className={`${slideState == i ? "current-slide" : "hidden"} max-w-md bg-gray-30 transition-all duration-700 ease-in-out flex justify-center items-center object-cover`} data-carousel-item key={i} slide={i}>
                {items.length >1 && <div className='absolute top-0 right-0 bg-white/75 px-2 py-2 m-2 rounded-full'>
                 <p className=' font-normal text-xs'>{slideState+1}</p>
                </div>}
                <img src={item} alt="" className='max-w-md transition-all duration-700 ease-in-out object-cover items-center m-auto' />
            </div>
        )
    })

    useEffect(() => {
        if(slideState == 0){
            setRenderButtons({ previous: false, next: true })
            return;
        }
        if(slideState ==  items.length - 1){
            setRenderButtons({ previous: true, next: false })
            return;
        }
        else{
            setRenderButtons({ previous: true, next: true })
            return;
        }

    }, [slideState]);

    function changeSlideNext(){
        if(!(slideState==items.length-1)){
            setSlideState(slideState+1)
        }
        else{
            setSlideState(slideState)
        }
    }
    
    function changeSlidePrevious(){
        if(!(slideState==0)){
            setSlideState(slideState-1)
        }
        else{
            setSlideState(slideState)
        }
    }

    return (
        <div className='relative max-w-lg flex items-center justify-center m-auto' data-carousel="slide">
            {/* Carouse-wrapper */}
            <div className='relative max-w-lg bg-black flex items-center overflow-hidden rounded-lg transition-all duration-500 ease-linear' >
                {slides}
                {/* {Slides Control} */}
                {items.length > 1 ? <>

                    <button type='button' className={`${renderButtons.previous ? " " : "hidden"} absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none`} data-carousel-prev onClick={changeSlidePrevious}>
                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white dark:white-800/30 group-hover:bg-white/30 dark:group-hover:bg-white-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                            <AiOutlineArrowLeft></AiOutlineArrowLeft>
                            <span className="sr-only">Previous</span>
                        </span>
                    </button>
                    <button type="button" className={`${renderButtons.next ? " " : "hidden"} absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none`} data-carousel-next onClick={changeSlideNext}>
                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white dark:white-800/30 group-hover:bg-white/30 dark:group-hover:bg-white-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                            <AiOutlineArrowRight></AiOutlineArrowRight>
                            <span className="sr-only">Next</span>
                        </span>
                    </button>
                </> : <></>}
            </div>
        </div>
    )
}

export default Carousel