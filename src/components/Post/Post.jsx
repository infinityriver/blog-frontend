import React from "react";
import styles from './Post.module.css'
import { Avatar, Card, CardContent, CardMedia, Container, Stack, Typography } from "@mui/material";
import EyeIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import { Link } from "react-router-dom";

const Post = (props) => {
    return (
        <div className={styles.Main}>
            <Card className={styles.Card} style={{ backgroundColor: '#555555', borderRadius: '10px'}}>
                <Link to='/sign'>
                <CardMedia
                    
                    component="img"
                    alt="green iguana"
                    height="330"
                    image="https://mui.com/static/images/cards/contemplative-reptile.jpg"
                    style={{cursor: 'pointer'}}
                />
                </Link>
                
                <CardContent style={{ backdropFilter: 'blur(90px)'}}>
                    <Stack direction='row' spacing={1}>
                        <Avatar alt="Travis Howard" src="https://mui.com/static/images/avatar/2.jpg" />
                        <Typography gutterBottom variant="h9" component="div" style={{ color: '#000'}}>NAME</Typography>
                    </Stack>
                    
                    <Typography gutterBottom variant="h5" component="div" style={{ color: '#000', cursor: 'pointer'}}>
                        {props.title}
                    </Typography>
                    <ul className={styles.postDetails}>
                        <li>
                        <EyeIcon />
                        <span>{props.viewsCount}</span>
                        </li>
                        <li>
                        <CommentIcon />
                        <span>{0}</span>
                        </li>
                    </ul>
                    
                </CardContent>
            </Card>
        </div>
    )
}

export default Post