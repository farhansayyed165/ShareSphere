import React, { useState } from 'react'
import { AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai'

function Carousel({ items }) {
    const [slideState, setSlideState] = useState(0);
    const [renderButtons, setRenderButtons] = useState({ previous: false, next: true })
    const slides = items.map((item, i) => {
        return (
            <div className={`${slideState == i ? "" : "hidden"} duration-700 ease-in-out`} data-carousel-item key={i} onChange={checkIndex}>
                <img src={item} alt="" className='absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 max-w-xs' />
            </div>
        )
    })

    function changeSlide(change) {
        if (change == 0) {
            setSlideState(prev => {
                const state = prev == 0 ? prev : prev - 1;
                return state
            })
            // console.log(slideState)
        }
        if (change == 1) {
            setSlideState(prev => {
                const state = prev == items.length - 1 ? prev : prev + 1
                return state
            })
            // console.log(slideState)
        }
        ("checkIndex fired")
        if(slideState == 0){
            setRenderButtons({ previous: false, next: true })
        }
        if(slideState-1 ==  items.length - 1){
            setRenderButtons({ previous: true, next: false })
        }
        else{
            setRenderButtons({ previous: true, next: true })
            // console.log(renderButtons)
        }
    }

    console.log(slideState)
    console.log(renderButtons)
    function checkIndex() {
    }
    return (
        <div className='relative max-w-xs' data-carousel="slide">
            {/* Carouse-wrapper */}
            <div className='relative h-56 overflow-hidden rounded-lg md:h-96' >
                {slides}
                {/* {Slides Control} */}
                {items.length > 1 ? <>

                    <button type='button' className={`${renderButtons.previous ? " " : "hidden"} absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none`} data-carousel-prev onClick={() => { changeSlide(0) }}>
                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white dark:white-800/30 group-hover:bg-white/30 dark:group-hover:bg-white-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                            <AiOutlineArrowLeft></AiOutlineArrowLeft>
                            <span className="sr-only">Previous</span>
                        </span>
                    </button>
                    <button type="button" className={`${renderButtons.next ? " " : "hidden"} absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none`} data-carousel-next onClick={() => { changeSlide(1) }}>
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