/* eslint-disable react/prop-types */
import { lazy, Suspense } from 'react';
import {
    IconButton,
} from '@mui/material';

import {
    Favorite,
    BookmarkBorder,
    AccessTime,
} from '@mui/icons-material';
import parse from 'html-react-parser';
import moment from 'moment';
import { Link } from 'react-router-dom';

// Lazy load the component
const LazyImage = lazy(() => import('../LazyImage/LazyImage.jsx'));

const BlogComponent = ({ blog }) => {
    // console.log(blog)
    const { id, title, description, favorite, cover_img, created_at } = blog
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
                    {parse(description.slice(0,500))}
                </p>
                <Link to={`/single-blog/${id}`} className="text-blue-500 hover:underline">
                    Read more...
                </Link>
                <div className="flex items-center mt-4">
                    <IconButton size="small" color="error">
                        <Favorite />
                    </IconButton>
                    <span className="text-gray-600 mr-4">{favorite}</span>
                    <IconButton size="small">
                        <BookmarkBorder />
                    </IconButton>
                    <span className="text-gray-600 mr-4">Save</span>
                    <IconButton size="small">
                        <AccessTime />
                    </IconButton>
                    <span className="text-gray-600 mr-4">5 min read</span>
                </div>
            </div>
        </div>
        // Repeat the structure for additional blog posts
    );
};

export default BlogComponent;
