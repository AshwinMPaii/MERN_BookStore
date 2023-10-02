import { useState, useEffect } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const ShowBook = () => {
    const [book, setBook] = useState({});
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        setLoading(true)
        axios
            .get(`http://localhost:5555/books/${id}`)
            .then((response) => {
                setBook(response.data)
                // console.log(book)
                setLoading(false)
            })
            .catch((error) => {
                console.log(error);
                setLoading(false)
            })
    }, [])
    return (
        <div className="flex flex-col p-4 bg-black text-white w-screen h-screen">
            {/* <div className="flex w-full justify-center"> */}
            <BackButton />
            <h1 className="text-2xl font-bold mb-4">Book Details</h1>
            {/* </div> */}

            {loading ? (<Spinner />) :
                (
                    <div className="bg-white rounded-lg shadow-md p-6 w-2/5">
                        <div className="mb-2">
                            <span className="text-gray-600 font-semibold">lack</span>
                            <span className='text-black font-serif'>{book._id}</span>
                        </div>
                        <div className="mb-2">
                            <span className="text-gray-600 font-semibold">Title:</span>
                            <span className='text-black font-serif'>{book.title}</span>
                        </div>
                        <div className="mb-2">
                            <span className="text-gray-600 font-semibold">Author: </span>
                            <span className='text-black font-serif'>{book.author}</span>
                        </div>
                        <div className="mb-2">
                            <span className="text-gray-600 font-semibold">Publisher Year: </span>
                            <span className='text-black font-serif'>{book.publishYear}</span>
                        </div>
                        <div className="mb-2">
                            <span className="text-gray-600 font-semibold">Created Time: </span>
                            <span className='text-black font-serif'>{new Date(book.createdAt).toString()}</span>
                        </div>
                        <div className="mb-2">
                            <span className="text-gray-600 font-semibold">Updated Time: </span>
                            <span className='text-black font-serif'>{new Date(book.updatedAt).toString()}</span>
                        </div>
                    </div>
                )
            }
        </div>

    )
}

export default ShowBook