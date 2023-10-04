import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md'

const BooksTable = ({ books }) => {
    return (
        <table className="w-11/12 border-separate border-spacing-2">
            <thead>
                <tr>
                    <th className="border border-slate-600 rounded-md">NO.</th>
                    <th className="border border-slate-600 rounded-md">Title</th>
                    <th className="border border-slate-600 rounded-md max-md:hidden">Author</th>
                    <th className="border border-slate-600 rounded-md max-md:hidden">Publish Year</th>
                    <th className="border border-slate-600 rounded-md">Operations</th>
                </tr>
            </thead>
            <tbody>
                {books.map((book, index) => (
                    <tr key={book._id} className="h-8 transform transition-transform duration-300 ease-in-out hover:scale-105 hover:bg-yellow-200 hover:text-black">
                        <td className="border border-slate-700 rounded-md text-center ">
                            {index + 1}
                        </td>
                        <td className="border border-slate-700 rounded-md text-center">
                            {book.title}
                        </td>
                        <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                            {book.author}
                        </td>
                        <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                            {new Date(book.publishYear).toISOString().split('T')[0]}
                        </td>
                        <td className="border border-slate-700 rounded-md text-center">
                            <div className="flex justify-center gap-x-4">
                                <Link to={`/books/details/${book._id}`} >
                                    {/* <BsInfoCircle className="text-2xl text-green-600 transition duration-300 ease-in-out hover:text-green-800"></BsInfoCircle> */}
                                    <BsInfoCircle className="text-2xl text-green-600 transform transition-transform duration-300 ease-in-out hover:text-green-400 hover:scale-110"></BsInfoCircle>

                                </Link>
                                <Link to={`/books/edit/${book._id}`}>
                                    <AiOutlineEdit className="text-2xl text-yellow-600 transform transition-transform duration-300 ease-in-out hover:text-yellow-400 hover:scale-110"></AiOutlineEdit>
                                </Link>
                                <Link to={`/books/delete/${book._id}`}>
                                    <MdOutlineDelete className="text-2xl text-red-600 transform transition-transform duration-300 ease-in-out hover:text-red-400 hover:scale-110"></MdOutlineDelete>
                                </Link>
                            </div>
                        </td>

                    </tr>
                ))}
            </tbody>

        </table>
    )
}

export default BooksTable