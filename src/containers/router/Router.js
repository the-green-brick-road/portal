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
import { lazy, Suspense, Fragment, Profiler }                            from 'react';
import { BrowserRouter, Routes, Route }                                  from 'react-router-dom';

/* Portal includes */
import { useConfiguration, useRobots, useSeasons, usePosts, useLogging } from '../../providers';
import { Layout }                                                        from '../../containers';

function PortalRouter(props) {

    /* --------- Gather inputs --------- */
    const { folder }    = props
    const { config }    = useConfiguration();
    const { robots }    = useRobots();
    const { seasons }   = useSeasons();
    const { posts }     = usePosts();
    const { logText }   = useLogging();
    const componentName = 'PortalRouter';

    logText(componentName,'debug','workflow',' Rendering')

    const SeasonElement = lazy(() => import(`../../views${folder}/season/Season`));
    const RobotElement = lazy(() => import(`../../views${folder}/robot/Robot`));
    const PostElement = lazy(() => import(`../../views${folder}/post/Post`));

    return (
        <Suspense fallback={<div ><p>Loading ...</p></div>}>
            <Routes>
                <Route path="/" element={<Layout />}>
                    {config.routes.map((item,index) => {

                        const Element = lazy(() => import(`../../views${folder}/${item.element.toLowerCase()}/${item.element}`));
                        return(
                            <Route key={item.element} exact={true} path={item.path} element={<Element />} />
                        )

                    })}
                    {Object.keys(seasons).map((item,index) => {

                        const path = `/seasons/${seasons[item].id}`
                        return(
                            <Route key={seasons[item].id} exact={true} path={path} element={<SeasonElement data={seasons[item]}/>} />
                        )

                    })}
                    {Object.keys(robots).map((item,index) => {

                        const path = `/robots/${robots[item].id}`
                        return(
                            <Route key={robots[item].id} exact={true} path={path} element={<RobotElement data={robots[item]}/>} />
                        )

                    })}
                    {Object.keys(posts).map((item,index) => {

                        if ((posts[item].real) && (!('url' in posts[item]))) {

                            const path = `/posts/${posts[item].id}`
                            return(
                                <Route key={posts[item].id} exact={true} path={path} element={<PostElement data={posts[item]}/>} />
                            )

                        }
                        else { return(<Fragment key={posts[item].id} />) }

                    })}
                </Route>
            </Routes>

        </Suspense>
    );

};
function Router(props) {

    /* --------- Gather inputs --------- */
    const { folder = '' }  = props
    const { onRender }   = useLogging();
    const componentName = 'Router';

    /* ----------- Define HTML --------- */
    return (

        <Profiler id={componentName} onRender={onRender}>
            <BrowserRouter>
                <PortalRouter folder={folder} />
            </BrowserRouter>
        </Profiler>
    );

}

export default Router;