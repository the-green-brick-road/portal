/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Router component definition
# -------------------------------------------------------
# Nadège LEMPERIERE, @19 may 2023
# Latest revision: 24 may 2023
# ---------------------------------------------------- */

/* React includes */
import { lazy, useEffect, useState }   from 'react';
import { BrowserRouter, useRoutes }    from 'react-router-dom';

/* Portal includes */
import { useConfiguration }            from '../../providers';
import { Layout }                      from '../../containers';

function PortalRouter(props) {

    /* --------- Gather inputs --------- */
    const { folder }         = props
    const { config }         = useConfiguration();
    /* const componentName      = 'PortalRouter'; */

    const [routesState, setRoutes] = useState([])

    /* Routes loading */
    useEffect(() => {

        const route_elements     = [];
        for (let i_route = 0; i_route < config.routes.length; i_route += 1) {

            const Element = lazy(() => import(`../../${folder}/${config.routes[i_route].element.toLowerCase()}/${config.routes[i_route].element}`));
            const rt = {
                exact: true,
                path: config.routes[i_route].path,
                element: <Element />,
            };
            route_elements.push(rt);
            setRoutes(route_elements)

        }

    }, []) /* eslint-disable-line react-hooks/exhaustive-deps */


    const routes_with_layout = [
        {
            element: <Layout />,
            children: routesState,
        }
    ]
    const element = useRoutes(routes_with_layout);
    return element;

};

function Router(props) {

    /* --------- Gather inputs --------- */
    const { folder = 'views' }  = props
    /* const { logText }   = useLogging();
    const componentName = 'Router'; */

    /* ----------- Define HTML --------- */
    return (
        <BrowserRouter>
            <PortalRouter folder={folder} />
        </BrowserRouter>
    );

}

export default Router;