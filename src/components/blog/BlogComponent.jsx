/* eslint-disable react/prop-types */
import { lazy, Suspense, useState } from 'react';
import {
    IconButton,
} from '@mui/material';

import {
    Favorite,
    BookmarkBorder,
    AccessTime,
    Bookmark,
} from '@mui/icons-material';
import parse from 'html-react-parser';
import moment from 'moment';
import { Link, useNavigate } from 'react-router-dom';
import secureApi from '../../api/secureApi.jsx';
import { toast, ToastContainer } from 'react-toastify';
import useSaveItem from '../../hooks/saveitems/useSaveItem.jsx';

// Lazy load the component
const LazyImage = lazy(() => import('../LazyImage/LazyImage.jsx'));

const BlogComponent = ({ blog }) => {
    const [itemSaved, setItemSaved] = useState(false)
    const [, refetch] = useSaveItem()
    const user = localStorage.getItem('email')
    const navigate = useNavigate();
    // console.log(blog)
    const { id, title, description, favorite, cover_img, created_at } = blog
    // handle saveitem
    const handleSaved = (id) => {
        if (!user) {
            const userConfirmed = window.confirm('You need to log in to save this item. Do you want to log in?');
            if (userConfirmed) {
                // Redirect to login page
                navigate('/login');
            }
            // If user doesn't confirm, do nothing
            return;
        }
        const blogInfo = {
            "blog_id": id,
            "user_email": localStorage.getItem('email'),
            "favorite": "1"
        }
        //sent to the server;
        secureApi.post(`/favorite`, blogInfo)
            .then(res => {
                if (res.success == true) {
                    toast.success(res.message)
                    setItemSaved(true)
                    refetch()
                }
                if (res.success == false) {
                    toast.error(res.message)
                    setItemSaved(true)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
    return (
        // Single Blog Post
        <div className="mb-8">
            <Suspense fallback={<div>Loading...</div>}>
                <LazyImage src={cover_img} alt="Blog Post Image" />
            </Suspense>
            <div className="mt-4">
                <h2 className="text-2xl font-semibold">
                    {title}
                </h2>
                <p className="text-gray-600">Published on {moment(created_at).format('MMMM Do YYYY, h:mm:ss a')}</p>
                <p className="mt-2">
                    {parse(description.slice(0, 500))}
                </p>
                <Link to={`/single-blog/${id}`} className="text-blue-500 hover:underline">
                    Read more...
                </Link>
                <div className="flex items-center mt-4">
                    <IconButton size="small" color="error">
                        <Favorite />
                    </IconButton>
                    <span className="text-gray-600 mr-4">{favorite}</span>

                    {
                        itemSaved == true ?
                            <>
                                <IconButton size="small" onClick={() => handleSaved(id)}>
                                    <Bookmark />
                                </IconButton>
                                <span className="text-gray-600 mr-4">Saved</span>
                            </>
                            :
                            <>
                                <IconButton size="small" onClick={() => handleSaved(id)}>
                                    <BookmarkBorder />
                                </IconButton>
                                <span className="text-gray-600 mr-4">Save</span>
                            </>
                    }

                    <IconButton size="small">
                        <AccessTime />
                    </IconButton>
                    <span className="text-gray-600 mr-4">2 min read</span>
                </div>
            </div>
            <ToastContainer />
        </div>
        // Repeat the structure for additional blog posts
    );
};

export default BlogComponent;
