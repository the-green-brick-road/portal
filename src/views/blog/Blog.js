/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Blog page definition
# -------------------------------------------------------
# Nadège LEMPERIERE, @30 may 2023
# Latest revision: 31 may 2023
# ---------------------------------------------------- */

/* React includes */
import { useEffect, Profiler, useState }                             from 'react';

/* Material UI includes */
import { Link, Card, CardContent, CardMedia, CardHeader, Container } from '@mui/material';
import { Grid, Typography, Paper }                                   from '@mui/material';
import { useTheme }                                                  from '@mui/material/styles';

/* Google fonts includes */
import '@fontsource/libre-bodoni'
import '@fontsource/courier-prime'
import '@fontsource/anton'
import '@fontsource/acme'
import '@fontsource/dancing-script'
import '@fontsource/dm-serif-display'

/* Portal includes */
import { usePosts, useLogging }                                       from '../../providers';
import { Image }                                                     from '../../components';

function Blog() {

    /* --------- Gather inputs --------- */
    const { posts }                     = usePosts();
    const { onRender }                  = useLogging();
    const theme                         = useTheme();
    const [ localPosts, setLocalPosts ] = useState([])
    const months        = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const componentName = 'Blog'

    useEffect(() => {

        /* ------- Sort posts by date ------ */
        const local_posts = [];
        const keys = Object.keys(posts)

        for (let i_post = 0; i_post < keys.length; i_post +=1) {

            if (local_posts.length === 0) { local_posts.push(posts[keys[i_post]]); }
            else {

                let j_post = 0
                if(posts[keys[i_post]].date.seconds > local_posts[local_posts.length - 1].date.seconds) { local_posts.push(posts[keys[i_post]]); }
                else {

                    while((posts[keys[i_post]].date.seconds > local_posts[j_post].date.seconds) && ((j_post + 1) < local_posts.length)) { j_post += 1 }
                    local_posts.splice(j_post, 0, posts[keys[i_post]]);

                }

            }

        }
        setLocalPosts(local_posts)

    }, [posts]);

    /* ----------- Define HTML --------- */
    return (
        <Profiler id={componentName} onRender={onRender}>
            <Container style={{ width:'100%', padding:0, position:'relative', margin:0 }}>
                <Image name="blog" style={{ width:'100%', pointerEvents: 'none', objectFit:'cover' }}/>
            </Container>
            <Container style={{ width:'100%', overflowX: 'hidden', overflowY: 'hidden', paddingTop:10 }}>
                <Grid container spacing={1} columns={60} style={{ transformOrigin: '50vw 50vh' }} >

                    { localPosts.map((item, index) => { /* Loop on all posts to create card */

                        let url=""
                        let target = ""
                        if( item.real ) {

                            if ('url' in item ) { url = item.url; target="_blank"}
                            else { url = `/posts/${item.id}` }

                        }

                        var time = new Date(1970, 0, 1); // Epoch
                        time.setSeconds(item.date.seconds);
                        const month = months[time.getMonth()];
                        const year = time.getYear() + 1900;
                        const date = time.getDate();

                        return(
                            <Grid item xs={30} sm={20} md={15} lg={12} key={index} style={{padding:0}}>

                                {(item.real) && (
                                    <Link href={url} underline="none" target={target}>
                                        <Card elevation={4} style={{ backgroundColor:'#eeeeee', margin:10 }}>
                                            <CardMedia component="img" style={{objectFit:'cover', objectPosition: item['image-position'] }} image={item.image}/>
                                            <CardContent style={{ backgroundColor:theme.palette.common.white, padding:'5px' }}>
                                                <Paper style={{ backgroundColor:theme.palette.primary.main, paddingLeft:'5px', paddingRight:'5px' }} >
                                                    <Typography variant="body1" style={{ color:theme.palette.common.white, fontSize:'11px', fontWeight:'bold'}}> {month}-{date}-{year} </Typography>
                                                </Paper>
                                            </CardContent>
                                            <CardHeader style={{ backgroundColor:theme.palette.common.white, padding:'5px'}} titleTypographyProps={{ fontSize:item['font-size'], fontWeight:'bold', fontFamily:item.font }} title={item.title} />
                                        </Card>
                                    </Link>
                                )}
                                {(!item.real) && (
                                    <Card elevation={4} style={{ backgroundColor:theme.palette.common.white, margin:10 }}>
                                        <CardMedia component="img" style={{objectFit: 'cover', objectPosition: item['image-position'] }} image={item.image}/>
                                        <CardContent style={{ backgroundColor:theme.palette.common.white, padding:'5px' }}>
                                            <Paper style={{ backgroundColor:'#888888', paddingLeft:'5px', paddingRight:'5px' }} >
                                                <Typography variant="body1" style={{ color:theme.palette.common.white, fontSize:'11px', fontWeight:'bold'}}> {date}-{month}-{year} </Typography>
                                            </Paper>
                                        </CardContent>
                                        <CardHeader style={{ backgroundColor:theme.palette.common.white, padding:'5px'}} titleTypographyProps={{ fontSize:item['font-size'], fontWeight:'bold', fontFamily:item.font }} title={item.title} />
                                    </Card>
                                )}
                            </Grid>
                        )

                    })}
                </Grid>
            </Container>
        </Profiler>
    );

}

export default Blog;