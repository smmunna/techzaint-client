import { useNavigate, useParams } from "react-router-dom";
import useSingleBlogHooks from "../../../hooks/blogs/useSingleBlogHooks";
import { Container, TextField, Button, MenuItem, Select, InputLabel, Input } from "@mui/material";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import secureApi from "../../../api/secureApi";

const EditBlog = () => {
    const { id } = useParams();
    const { singleBlogData, isLoading } = useSingleBlogHooks(id);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        cover_img: 'https://via.placeholder.com/800x400',
    });

    useEffect(() => {
        // Set form data with values from singleBlogData when it is available
        if (!isLoading && singleBlogData) {
            setFormData({
                title: singleBlogData.title || '',
                description: singleBlogData.description || '',
                category: singleBlogData.category || '',
                cover_img: singleBlogData.cover_img || 'https://via.placeholder.com/800x400',
            });
        }
    }, [isLoading, singleBlogData]);

    const handleChange = (e) => {
        const { name, value, type } = e.target;

        if (type === 'file') {
            // Handle file input separately if needed
            const file = e.target.files[0];

            if (file) {
                convertFileToBase64(file)
                    .then((base64) => {
                        setFormData((prevData) => ({
                            ...prevData,
                            [name]: base64,
                        }));
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            }
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleDescriptionChange = (value) => {
        setFormData((prevData) => ({
            ...prevData,
            description: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Log the form data to the console
        console.log('Form Data:', formData);
        // You can send the form data to the backend here for saving to the database
        // ...
        secureApi.put(`/edit-blog?id=${id}`, formData)
            .then((response) => {
                // Handle the successful response from the backend
                if (response) {
                    toast.success('Updated successfully..')
                    setTimeout(() => {
                        navigate('/dashboard/blog-list')
                    }, 1500)
                }

                // You can perform additional actions after a successful update
            })
            .catch((error) => {
                // Handle errors that occurred during the request
                console.error('Error updating blog:', error);
            });
    };

    const convertFileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = () => {
                resolve(reader.result);
            };

            reader.onerror = (error) => {
                reject(error);
            };

            reader.readAsDataURL(file);
        });
    };

    return (
        <div className="py-5">
            <div className="container mx-auto lg:flex">
                <div className="w-full mb-7 lg:mb-0 lg:w-2/3">
                    <Container>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                fullWidth
                                label="Title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                variant="outlined"
                                margin="normal"
                            />
                            <TextField
                                fullWidth
                                label="Description"
                                name="description"
                                multiline
                                rows={4}
                                value={formData.description}
                                onChange={(e) => handleDescriptionChange(e.target.value)}
                                variant="outlined"
                                margin="normal"
                            />
                            <InputLabel htmlFor="category">Category</InputLabel>
                            <Select
                                fullWidth
                                label="Category"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                variant="outlined"
                                margin="normal"
                            >
                                {/* Replace the dummy options with your actual categories */}
                                <MenuItem value={formData.category}>{formData.category}</MenuItem>
                                <MenuItem value="Technology">Technology</MenuItem>
                                <MenuItem value="Software Development">Software Development</MenuItem>
                                <MenuItem value="Programming">Programming</MenuItem>
                                <MenuItem value="Networking">Networking</MenuItem>
                                <MenuItem value="Database">Database</MenuItem>
                            </Select>
                            {/* Add file input if needed */}
                            <InputLabel htmlFor="category">Image (optional) </InputLabel>
                            <Input type="file" name="cover_img" onChange={handleChange} fullWidth sx={{ marginTop: '20px' }} />
                            <Button type="submit" variant="contained" color="primary" sx={{ marginTop: '20px' }}>
                                Submit
                            </Button>
                        </form>
                    </Container>
                </div>
            </div>
        </div>
    );
};

export default EditBlog;
