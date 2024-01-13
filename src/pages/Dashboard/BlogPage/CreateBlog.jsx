import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { ToastContainer, toast } from 'react-toastify';
import { FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import secureApi from '../../../api/secureApi';
import useSingleBlogHooks from '../../../hooks/blogs/useSingleBlogHooks';

const CreateBlog = () => {
    const { refetch } = useSingleBlogHooks()
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        email: localStorage.getItem('email'),
        category: '',
        cover_img: 'https://via.placeholder.com/800x400',
    });


    const handleChange = async (e) => {
        const { name, value, type } = e.target;

        if (type === 'file') {
            const file = e.target.files[0];

            if (file) {

                const base64 = await convertFileToBase64(file);
                setFormData((prevData) => ({
                    ...prevData,
                    [name]: base64,
                }));
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

        if (formData.category == '') {
            toast.error('Please select category')
            return
        }

        if (formData.cover_img) {
            // Remove metadata (data:image/png;base64,) from the base64 string
            const base64WithoutMetadata = formData.cover_img.split(',')[1];

            const maxSizeKB = 100; // Maximum size allowed in kilobytes
            const fileSizeKB = (base64WithoutMetadata.length * 3) / 4 / 1024; // Calculate the size of base64 string

            // Check if the file size is greater than the allowed maximum
            if (fileSizeKB > maxSizeKB) {
                toast.error('Cover image size exceeds the maximum allowed size (100 KB).');
                return; // Stop form submission
            }
        }

        // console.log('Form Data:', formData);
        // Send data to backend for saving to db;
        secureApi.post('/create-blog', formData)
            .then(res => {
                // console.log(res)
                if (res.message) {
                    toast.success('Blog created successfully')
                    refetch()
                }
            })
            .catch(error => {
                console.log(error)
            })
    };

    // Function to convert image to base64
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
        <div>
            <Typography variant='h5' sx={{ fontWeight: 'bold', textAlign: 'center' }}>Create your blog</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    label="Title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="Description"
                    name="description"
                    value={formData.description}
                    onChange={() => { }}
                    required
                    margin="normal"
                    style={{ display: 'none' }}
                />
                <ReactQuill
                    theme="snow"
                    value={formData.description}
                    onChange={handleDescriptionChange}
                    style={{ height: '200px', marginBottom: '60px', }}
                    modules={{
                        toolbar: [
                            ['bold', 'italic', 'underline', 'strike'],
                            [{ list: 'ordered' }, { list: 'bullet' }],
                            ['link', 'image'],
                            [{ 'size': ['small', false, 'large', 'huge'] }],
                            ['code-block'],
                            ['clean'],
                        ],
                    }}
                />
                <FormControl fullWidth>
                    <InputLabel id="choose_category">Choose category</InputLabel>
                    <Select
                        labelId="choose_category"
                        name='category'
                        value={formData.category}
                        label="Choose Category"
                        onChange={handleChange}
                    >
                        <MenuItem value={'Technology'}>Technology</MenuItem>
                        <MenuItem value={'Software'}>Software</MenuItem>
                        <MenuItem value={'Database'}>Database</MenuItem>
                    </Select>
                </FormControl>
                <Input

                    fullWidth
                    type="file"
                    name="cover_img"
                    onChange={handleChange}
                    margin="normal"
                    sx={{ mt: 2, }}
                    required
                />

                <Button type="submit" variant="contained" color="primary" sx={{ mt: 2, }}>
                    Submit
                </Button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default CreateBlog;
