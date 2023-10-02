import React from 'react'
import { Link } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';

const BackButton = ({ destination = '/' }) => {
    return (
        <div className="flex">
            <Link to={destination}
                className='bg-sky-800 text-white hover:bg-sky-400 transform transition-transform hover:scale-110'>
                <BsArrowLeft className="text-2xl" />
            </Link>
        </div>
    )
}

export default BackButton