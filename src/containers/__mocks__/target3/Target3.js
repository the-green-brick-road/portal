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


function Target3(props) {


    const navigate = useNavigate();

    function handleClick1() { navigate('/') }
    function handleClick2() { navigate('/target2') }
    function handleClick3() { navigate('/target3') }

    return (

        <div>
            <p> target3 </p>
            <Button aria-label='target1' onClick={handleClick1}/>
            <Button aria-label='target2' onClick={handleClick2}/>
            <Button aria-label='target3' onClick={handleClick3}/>
        </div>

    )

};

export default Target3;