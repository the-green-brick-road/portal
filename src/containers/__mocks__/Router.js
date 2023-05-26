/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Router component mock
# -------------------------------------------------------
# Nadège LEMPERIERE, @24 may 2023
# Latest revision: 24 may 2023
# ---------------------------------------------------- */

/* React includes */
import { useNavigate }                     from "react-router-dom";

/* Material UI includes */
import { Button }                          from '@mui/material';

/* React includes */
import { BrowserRouter, useRoutes }        from 'react-router-dom';

/* eslint-enable jest/no-mocks-import */
function MockLayoutConsumer(props) {

    const { index } = props

    const navigate = useNavigate();

    function handleClick1() { navigate('/') }
    function handleClick2() { navigate('/test1') }
    function handleClick3() { navigate('/test2') }

    return (
        <div>
            <p> target{index} </p>
            <Button aria-label='test1' onClick={handleClick1}/>
            <Button aria-label='test2' onClick={handleClick2}/>
            <Button aria-label='test3' onClick={handleClick3}/>
        </div>
    )

};

function MockRouter(props) {

    const { layout }  = props

    const LayoutName = layout

    const routes_with_layout = [
        {
            element: <LayoutName/>,
            children: [
                {
                    exact: true,
                    path: '/',
                    element: <MockLayoutConsumer index={0} />,
                },
                {
                    exact: true,
                    path: '/test1',
                    element: <MockLayoutConsumer index={1} />,
                },
                {
                    exact: true,
                    path: '/test2',
                    element: <MockLayoutConsumer index={2} />,
                }
            ],
        }
    ]
    const element = useRoutes(routes_with_layout);
    return element;

};


function Router(props) {

    /* --------- Gather inputs --------- */
    const { layout }  = props
    /* const { logText }   = useLogging();
    const componentName = 'Router'; */

    /* ----------- Define HTML --------- */
    return (
        <BrowserRouter>
            <MockRouter layout={layout} />
        </BrowserRouter>
    );

}

export default Router;
