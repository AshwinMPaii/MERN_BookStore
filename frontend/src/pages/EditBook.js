import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'
import axios from 'axios'
import { useSnackbar } from 'notistack'


const EditBook = () => {
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        publishYear: ''
    })
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { id } = useParams();
    const { enqueueSnackbar } = useSnackbar()

    useEffect(() => {
        setLoading(true)
        axios
            .get(`http://localhost:5555/books/${id}`)
            .then((response) => {
                const rawDate = new Date(response.data.publishYear);
                const formattedDate = rawDate.toISOString().split('T')[0];
                setFormData({
                    title: response.data.title,
                    author: response.data.author,
                    publishYear: formattedDate
                })
                setLoading(false)
            })
            .catch((error) => {
                console.log(error);
                setLoading(false)
            })
    }, [id])

    const handleChange = (e) => {
        // console.log(e);
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleEdit = (e) => {
        e.preventDefault();
        setLoading(true);
        axios
            .put(`http://localhost:5555/books/${id}`, formData)
            .then(() => {
                setLoading(false);
                enqueueSnackbar("Book edited Successfully", { variant: 'success' })
                navigate('/')
            })
            .catch((error) => {
                setLoading(false);
                enqueueSnackbar("Error", { variable: 'error' })
                console.log(error);
            })
    }
    return (
        <div className='bg-black w-screen h-screen'>
            <div className='pt-4 pl-4'>
                <BackButton />
            </div>
            <div className='flex flex-col items-center'>

                <h1>Edit Book</h1>
                {loading ? <Spinner /> : (
                    <form onSubmit={handleEdit} className="max-w-md mx-auto p-4 bg-white rounded shadow-md">
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
                            Update
                        </button>
                    </form>

                )}
            </div>
        </div>
    )
}

export default EditBook