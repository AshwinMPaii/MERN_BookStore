import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'
import axios from 'axios'

const CreateBook = () => {
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        publishYear: ''
    })
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        // console.log(e);
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        axios
            .post(`http://localhost:5555/books`, formData)
            .then(() => {
                setLoading(false);
                navigate('/')
            })
            .catch((error) => {
                setLoading(false);
                console.log(error);
            })
    }
    return (
        <div className='bg-black w-screen h-screen'>
            <div className='pt-4 pl-4'>
                <BackButton />
            </div>
            <div className='flex flex-col items-center'>

                <h1>Create Book</h1>
                {loading ? <Spinner /> : (
                    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white rounded shadow-md">
                        <div className="mb-4">
                            <label htmlFor="title" className="block text-gray-700 font-semibold">Title:</label>
                            <input
                                type="text"
                                name="title"
                                id="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="w-full py-2 px-3 border border-gray-300 rounded focus:outline-none focus:border-blue-400"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="author" className="block text-gray-700 font-semibold">Author:</label>
                            <input
                                type="text"
                                name="author"
                                id="author"
                                value={formData.author}
                                onChange={handleChange}
                                className="w-full py-2 px-3 border border-gray-300 rounded focus:outline-none focus:border-blue-400"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="publishYear" className="block text-gray-700 font-semibold">Publish Year:</label>
                            <input
                                type="date"
                                name="publishYear"
                                id="publishYear"
                                value={formData.publishYear}
                                onChange={handleChange}
                                className="w-full py-2 px-3 border border-gray-300 rounded focus:outline-none focus:border-blue-400"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:bg-blue-600"
                        >
                            Create
                        </button>
                    </form>

                )}
            </div>
        </div>
    )
}

export default CreateBook