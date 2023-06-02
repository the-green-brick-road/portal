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
import { lazy, useEffect, useState, Suspense } from 'react';
import { BrowserRouter, useRoutes }            from 'react-router-dom';

/* Portal includes */
import { useConfiguration, useData }           from '../../providers';
import { Layout }                              from '../../containers';

function PortalRouter(props) {

    /* --------- Gather inputs --------- */
    const { folder }         = props
    const { config }         = useConfiguration();
    const { seasons, posts } = useData();
    /* const componentName      = 'PortalRouter'; */

    const [ routesState, setRoutes ] = useState(
        [{
            element: <Layout />,
            children: [],
        }]
    )

    useEffect(() => {

        const newRoutes = [...routesState];

        for (let i_route = 0; i_route < config.routes.length; i_route += 1) {

            const Element = lazy(() => import(`../../views${folder}/${config.routes[i_route].element.toLowerCase()}/${config.routes[i_route].element}`));
            const rt = {
                exact: true,
                path: config.routes[i_route].path,
                element: <Element />,
            };
            newRoutes[0].children.push(rt);

        }
        for (let i_route = 0; i_route < seasons.length; i_route += 1) {

            const Element = lazy(() => import(`../../views${folder}/season/Season`));
            const rt = {
                exact: true,
                path: `/seasons/${seasons[i_route].id}`,
                element: <Element data={seasons[i_route]}/>,
            };
            newRoutes[0].children.push(rt);

        }
        for (let i_route = 0; i_route < posts.length; i_route += 1) {

            if (posts[i_route].real) {

                const Element = lazy(() => import(`../../views${folder}/post/Post`));
                const rt = {
                    exact: true,
                    path: `/posts/${posts[i_route].id}`,
                    element: <Element data={posts[i_route]}/>,
                };
                newRoutes[0].children.push(rt);

            }

        }

        setRoutes(newRoutes)

    }, [config, seasons, posts]); /* eslint-disable-line react-hooks/exhaustive-deps */

    return (
        <Suspense fallback={<div ><p>Loading ...</p></div>}>
            {useRoutes(routesState)}
        </Suspense>
    );

};

function Router(props) {

    /* --------- Gather inputs --------- */
    const { folder = '' }  = props
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