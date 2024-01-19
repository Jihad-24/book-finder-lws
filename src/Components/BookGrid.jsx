/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import bookNpg from "../assets/Images/book.png";
import start from "../assets/Images/star.svg";
import Cart from "./Icons/Cart";
import LoveLine from "./Icons/LoveLine";
import LoveFill from "./Icons/loveFill";

const fixedbooks = [
    {
        id: 1,
        bookName: "JavaScript and Jquery",
        author: "Jon Duckett",
        price: "$62",
        rating: 4,
        imageSrc: bookNpg,
        publishedYear: 2015
    },
    {
        id: 2,
        bookName: "Web Development Essentials",
        author: "Jane Smith",
        price: "$45",
        rating: 5,
        imageSrc: bookNpg,
        publishedYear: 2020
    },
    {
        id: 3,
        bookName: "React in Action",
        author: "John Doe",
        price: "$75",
        rating: 4,
        imageSrc: bookNpg,
        publishedYear: 2018
    },
    {
        id: 4,
        bookName: "Node.js Basics",
        author: "Alice Johnson",
        price: "$55",
        rating: 3,
        imageSrc: bookNpg,
        publishedYear: 2017
    },
    {
        id: 5,
        bookName: "HTML5 and CSS3 Mastery",
        author: "Bob Williams",
        price: "$60",
        rating: 5,
        imageSrc: bookNpg,
        publishedYear: 2019
    },
    {
        id: 6,
        bookName: "Python Programming",
        author: "Eva Brown",
        price: "$68",
        rating: 4,
        imageSrc: bookNpg,
        publishedYear: 2016
    },
    {
        id: 7,
        bookName: "Data Science Fundamentals",
        author: "Michael Davis",
        price: "$80",
        rating: 5,
        imageSrc: bookNpg,
        publishedYear: 2022
    },
    {
        id: 8,
        bookName: "Angular for Beginners",
        author: "Sophie Miller",
        price: "$55",
        rating: 4,
        imageSrc: bookNpg,
        publishedYear: 2021
    },
    {
        id: 9,
        bookName: "UI/UX Design Principles",
        author: "Chris Taylor",
        price: "$70",
        rating: 5,
        imageSrc: bookNpg,
        publishedYear: 2019
    },
    {
        id: 10,
        bookName: "Mobile App Development",
        author: "David Clark",
        price: "$65",
        rating: 3,
        imageSrc: bookNpg,
        publishedYear: 2018
    }
];


const BookGrid = ({ filter }) => {
    const [books, setBooks] = useState(fixedbooks);

    const [favorites, setFavorites] = useState([]);

    const handleToggleFavorite = (id) => {
        if (favorites.includes(id)) {
            setFavorites(favorites.filter((bookId) => bookId !== id));
        } else {
            setFavorites([...favorites, id]);
        }
    };

    useEffect(() => {
        const debounceFilter = setTimeout(() => {
            let filteredBooks = fixedbooks.filter((book) =>
                book.bookName.toLowerCase().includes(filter?.keyword.toLowerCase())
            );

            if (filter.sortBy === 'name_asc') {
                filteredBooks = filteredBooks.sort((a, b) => a.bookName.localeCompare(b.bookName));
            } else if (filter.sortBy === 'name_desc') {
                filteredBooks = filteredBooks.sort((a, b) => b.bookName.localeCompare(a.bookName));
            } else if (filter.sortBy === 'year_asc') {
                filteredBooks = filteredBooks.sort((a, b) => a.publishedYear - b.publishedYear);
            } else if (filter.sortBy === 'year_desc') {
                filteredBooks = filteredBooks.sort((a, b) => b.publishedYear - a.publishedYear);
            }

            setBooks(filteredBooks);
        }, 600);

        return () => clearTimeout(debounceFilter);
    }, [filter]);

    const isFavorite = (id) => favorites.includes(id);

    return (
        <div
            className="container mx-auto grid grid-cols-1 gap-8 max-w-7xl md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
            {
                books.map((book) => (
                    <div className="space-y-3" key={book.id}>
                        <div
                            className="flex items-center justify-center rounded-md border border-[#324251]/30 bg-white p-4"
                        >
                            <img className="max-w-[144px]" src={book.imageSrc} alt={book.bookName} />
                        </div>
                        <div className="space-y-3">
                            <h4 className="text-lg font-bold lg:text-xl">{book.bookName}</h4>
                            <p className="text-xs lg:text-sm">By: <span>{book.author}</span></p>
                            <p className="text-xs lg:text-sm">Published Year: <span>{book.publishedYear}</span></p>
                            <div className="flex items-center justify-between">
                                <h4 className="text-lg font-bold lg:text-xl">{book.price}</h4>
                                <div className="flex items-center space-x-1">
                                    {Array.from({ length: book.rating }, (_, index) => (
                                        <img key={index} src={start} alt={`Star ${index + 1}`} />
                                    ))}
                                    <span className="text-xs lg:text-sm">({book.rating} Star)</span>
                                </div>
                            </div>


                            <div className="flex items-center gap-3 text-xs lg:text-sm">
                                <button
                                    className="flex min-w-[132px] items-center justify-center gap-1 rounded-md bg-[#1C4336] py-1.5 text-white transition-all hover:opacity-80 lg:py-1.5"
                                >
                                    <Cart />

                                    Add to Cart
                                </button>
                                <button
                                    onClick={() => handleToggleFavorite(book.id)}
                                    className={`flex min-w-[132px] items-center justify-center gap-1 rounded-md ${isFavorite(book.id) ? "bg-[#DC2954]/[14%] text-[#DC2954] hover:bg-[#DC2954]/[24%]" : "bg-[#1C4336]/[14%] text-[#1C4336] hover:bg-[#1C4336]/[24%]"} py-1.5 transition-all lg:py-1.5`}
                                >
                                    {isFavorite(book.id) ? <LoveFill /> : <LoveLine />}
                                    Favourite
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default BookGrid;