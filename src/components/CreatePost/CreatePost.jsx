import { Button, Card, CardContent, CardMedia } from "@mui/material";
import React from "react";
import styles from './CreatePost.module.css'
import TextField from '@mui/material/TextField';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css'; // Добавляем стили EasyMDE
import axios from '../../axios'
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../../redux/slices/authReducer';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

const CreatePost = () => {
    const navigate = useNavigate()
    const isAuth = useSelector(selectIsAuth)
    const [isLoading, setLoading] = React.useState(false);
    const [text, setText] = React.useState('');
    const [title, setTitle] = React.useState('');
    const [tags, setTags] = React.useState('');
    const [imageUrl, setImageUrl] = React.useState('');
    const inputFileRef = React.useRef(null)

    const handleChangeFile = async (event) => {
        try {
        const formData = new FormData()
        const file = event.target.files[0]
        formData.append('image', file)
        const { data } = await axios.post('/uploads', formData)
        setImageUrl(data.url)
        }catch(err) {
        console.warn(err)
        }
    };

    const onClickRemoveImage = async () => {
        setImageUrl('')
    };

    const onChange = React.useCallback((value) => {
        setText(value);
    }, []);

    const options = React.useMemo(
        () => ({
        spellChecker: false,
        maxHeight: '400px',
        autofocus: true,
        placeholder: 'Введите текст...',
        status: false,
        autosave: {
            enabled: true,
            delay: 1000,
        },
        }),
        [],
    );

    if(!window.localStorage.getItem('token') && !isAuth) {
        return <Navigate to='/' />
    }

    const onSubmit = async () => {
        try {
        setLoading(true)

        const fields = {
            title,
            imageUrl,
            tags,
            text
        }
        console.log(tags)
        console.log(tags.split(','))

        const {data} = await axios.post('/posts', fields)

        const id = data._id

        navigate(`/posts/${id}`)
        }catch(err){ 
        console.warn(err)
        alert('Error')
        }
    }
    return (
        <div className={styles.Main}>
            <Card className={styles.Card} style={{ backgroundColor: '#555555', borderRadius: '10px'}}>
                {/* <CardMedia
                    component="img"
                    alt="green iguana"
                    height="330"
                    image="https://mui.com/static/images/cards/contemplative-reptile.jpg"
                    style={{cursor: 'pointer'}}
                /> */}
                <CardContent style={{ backdropFilter: 'blur(90px)'}}>
                    
                    <TextField
                        variant="standard"
                        placeholder="Header..."
                        // value={title}
                        // onChange={e=>setTitle(e.target.value)}
                        value={title}
                        onChange={e=>setTitle(e.target.value)}
                        color="success"
                        fullWidth
                    />
                    <br />
                    <br/>
                    <TextField 
                        variant="standard" 
                        placeholder="Tags..." 
                        value={tags}
                        onChange={e=>setTags(e.target.value)}
                        color="success"
                        fullWidth 
                    />
                    <br />
                    <br />
                    <SimpleMDE 
                        options={options} value={text} onChange={onChange}/>

                    <Button onClick={onSubmit} variant="outlined" style={{ color: '#000', border: '1px solid #000', textDecoration: 'none'}}>SEND</Button>
                    <Button LinkComponent={Link} to='/home' variant="outlined" style={{ color: '#000', border: '1px solid #000', textDecoration: 'none'}}>LOGOUT</Button>
                </CardContent>
            </Card>
        </div>
    )
}

export default CreatePost