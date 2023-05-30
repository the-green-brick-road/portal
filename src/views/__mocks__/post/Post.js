/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Season page mock definition
# -------------------------------------------------------
# Nadège LEMPERIERE, @30 may 2023
# Latest revision: 30 may 2023
# ---------------------------------------------------- */

/* React includes */
import { useNavigate } from "react-router-dom";

/* Material UI includes */
import { Button }      from '@mui/material';

function Post(props) {

    /* --------- Gather inputs --------- */
    const { data }      = props
    const navigate      = useNavigate();

    function handleClick1() { navigate('/') }
    function handleClick2() { navigate('/target2') }
    function handleClick3() { navigate('/target3') }
    function handleClick4() { navigate('/seasons/1') }
    function handleClick5() { navigate('/seasons/2') }
    function handleClick6() { navigate('/posts/1') }
    function handleClick7() { navigate('/posts/2') }


    return (

        <div>
            <p> {data.title}  </p>
            <Button aria-label='target1' onClick={handleClick1}/>
            <Button aria-label='target2' onClick={handleClick2}/>
            <Button aria-label='target3' onClick={handleClick3}/>
            <Button aria-label='season1' onClick={handleClick4}/>
            <Button aria-label='season2' onClick={handleClick5}/>
            <Button aria-label='post1'   onClick={handleClick6}/>
            <Button aria-label='post2'   onClick={handleClick7}/>
        </div>

    )

}

export default Post;