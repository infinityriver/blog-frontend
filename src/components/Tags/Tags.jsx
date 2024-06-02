import { Card, CardContent, Typography } from "@mui/material";
import React from "react";
import styles from './Tags.module.css'

const Tags = () => {
    return (
        <div className={styles.Main}>
        <Card className={styles.Card} style={{ backgroundColor: '#555555', borderRadius: '10px'}}>
            <CardContent style={{ backdropFilter: 'blur(90px)'}}>
                <Typography gutterBottom variant="h5" component="div" style={{ color: '#000', cursor: 'pointer'}}>
                    Tags
                </Typography>
                
            </CardContent>
        </Card>
        </div>
    )
}

export default Tags