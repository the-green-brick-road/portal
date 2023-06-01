/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Test Component for router
# -------------------------------------------------------
# Nadège LEMPERIERE, @24 may 2023
# Latest revision: 24 may 2023
# ---------------------------------------------------- */

/* React includes */
import { useNavigate }                    from "react-router-dom";

/* Material UI includes */
import { Button }                         from '@mui/material';


function Target1(props) {

    const navigate = useNavigate();

    function handleClick1() { navigate('/') }
    function handleClick2() { navigate('/target2') }
    function handleClick3() { navigate('/target3') }
    function handleClick4() { navigate('/seasons/1') }
    function handleClick5() { navigate('/seasons/2') }
    function handleClick6() { navigate('/posts/1') }
    function handleClick7() { navigate('/posts/2') }
    function handleClick8() { navigate('/posts/3') }

    return (

        <div>
            <p> target1 </p>
            <Button aria-label='target1' onClick={handleClick1}/>
            <Button aria-label='target2' onClick={handleClick2}/>
            <Button aria-label='target3' onClick={handleClick3}/>
            <Button aria-label='season1' onClick={handleClick4}/>
            <Button aria-label='season2' onClick={handleClick5}/>
            <Button aria-label='post1'   onClick={handleClick6}/>
            <Button aria-label='post2'   onClick={handleClick7}/>
            <Button aria-label='post3'   onClick={handleClick8}/>
        </div>

    )

};

export default Target1;