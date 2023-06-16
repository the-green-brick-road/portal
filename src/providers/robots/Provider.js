/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Robots provider to share database data between
# components
# -------------------------------------------------------
# Nadège LEMPERIERE, @14 june 2023
# Latest revision: 14 june 2023
# ---------------------------------------------------- */

/* React includes */
import { useMemo, useEffect, useState, Profiler }       from 'react';

/* Portal includes */
import { useLogging, useConfiguration }                             from '../../providers';

/* Local includes */
import { Context }                                                  from './Context';
import { useInitializeApp, useGetApps }                             from './FirebaseHook';
import { useGetFirestore, useCollection, useGetDocs }               from './FirebaseHook';
import { useGetStorage, useRef, useGetDownloadUrl }                 from './FirebaseHook';

function Provider(props) {

    /* --------- Gather inputs --------- */
    const { children, persistKey = 'robots' }    = props;
    const { logText, onRender }                  = useLogging();
    const { config }                             = useConfiguration();
    const { firebase = {} }                      = config;
    const initializeApp                          = useInitializeApp();
    const getApps                                = useGetApps();
    const getFirestore                           = useGetFirestore();
    const collection                             = useCollection();
    const getDocs                                = useGetDocs();
    const getStorage                             = useGetStorage();
    const getDownloadURL                         = useGetDownloadUrl();
    const ref                                    = useRef();
    const media_sizes                            = [
        {type:'web', width:800, suffix:'.webp'},
        {type:'raw', width:800, suffix:'.png'},
        {type:'web', width:400, suffix:'-medium.webp'},
        {type:'raw', width:400, suffix:'-medium.png'},
        {type:'web', width:200, suffix:'-small.webp'},
        {type:'raw', width:200, suffix:'-small.png'}
    ]
    const componentName = 'RobotsProvider';

    /* Create local states */
    const savedState = JSON.parse(localStorage.getItem(persistKey));
    const [robotsStore, setRobotsStore] = useState({
        robots: {},
        ...savedState,
    });

    useEffect(() => {

        logText(componentName,'debug','workflow',' Loading data --- BEGIN')

        const local_state = { robots: {} }
        const shall_update = []

        /* Set firebase configuration */
        const firebase_config = {
            apiKey:              firebase['api-key'],
            authDomain:          firebase['auth-domain'],
            projectId:           firebase['project-id'],
            storageBucket:       firebase['storage-bucket'],
            messagingSenderId:   firebase['messaging-sender-id'],
            appId:               firebase['app-id'],
            measurementId:       firebase['measurement-id'],
        };

        /* Initialize firebase if it was not previously done */
        const apps              = getApps()
        let app = null
        if( apps.length === 0 ) { app = initializeApp(firebase_config) }
        else                    { app = apps[0]}

        /* Configure firestore */
        const firestore   = getFirestore(app);
        const storage     = getStorage(app);

        /* Define condition for state update decision -- to avoid reloading page unnecessarily if data have not changed */
        function update_decision(data, store) {

            let result = false
            if (!(data.id in store)) { /* new data found */ result = true}
            if ((data.id in store) &&
                ((data.version.seconds !== store[data.id].version.seconds) ||
                 (data.version.nanoseconds !== store[data.id].version.nanoseconds)))
            { /* Data updated */ result = true }

            return result

        }

        function update(local, store, shall_update, componentName) {

            if( Object.keys(local.robots).length !== Object.keys(store.robots).length ) { /* Object removed */ shall_update.push(true) }
            if( shall_update.indexOf(true) > -1) {

                /* If at least one object has triggered an update */
                logText(componentName, 'info', 'workflow', ' Loading data --- UPDATE')
                setRobotsStore(local)

            }
            logText(componentName,'debug','workflow',' Loading data --- END')

        }

        getDocs(collection(firestore, 'robots'))
            .then((docs) => {

                logText(componentName, 'info', 'data', ` Found ${docs.size} robots`)
                if(docs.length === 0 ) { update(local_state, robotsStore, shall_update, componentName) }
                else {

                    docs.forEach((doc) => {


                        const data = JSON.parse(JSON.stringify(doc.data()))
                        data.version = doc._document.version.timestamp
                        data.id = doc.id
                        data.image = {}
                        const media = [];
                        const count_media_total = media_sizes.length +
                            ('features' in data ? data.features.length  : 0) +
                            ('views'    in data ? data.views.length  : 0)

                        if(count_media_total === 0 ) {

                            local_state.robots[data.id] = data
                            shall_update.push(update_decision(data, robotsStore.robots))
                            if(Object.keys(local_state.robots).length === docs.size) { update(local_state, robotsStore, shall_update, componentName) }

                        }

                        for(let i_media = 0; i_media < media_sizes.length; i_media ++){

                            getDownloadURL(ref(storage, `robots/${data['image-root']}${media_sizes[i_media].suffix}`))
                                .then((url) => {

                                    if (!(media_sizes[i_media].type in data['image'] )) { data['image'][media_sizes[i_media].type] = {}}
                                    if (!(media_sizes[i_media].width in data['image'][media_sizes[i_media].type] )) { data['image'][media_sizes[i_media].type][media_sizes[i_media].width] = []}
                                    data['image'][media_sizes[i_media].type][media_sizes[i_media].width] = url
                                    media.push(url)
                                    if ( media.length === count_media_total ) {

                                        local_state.robots[data.id] = data
                                        shall_update.push(update_decision(data, robotsStore.robots))

                                    }
                                    if(Object.keys(local_state.robots).length === docs.size) { update(local_state, robotsStore, shall_update, componentName) }

                                })

                        }

                        if ('features' in data && data.features.length > 0) {

                            for(let i_feature = 0; i_feature < data.features.length; i_feature +=1)
                            {

                                getDownloadURL(ref(storage, `robots/${data.features[i_feature].media}`))
                                    .then((url) => {

                                        data.features[i_feature].media = url
                                        media.push(url)
                                        if ( media.length === count_media_total ) {

                                            local_state.robots[data.id] = data
                                            shall_update.push(update_decision(data, robotsStore.robots))

                                        }
                                        if(Object.keys(local_state.robots).length === docs.size) { update(local_state, robotsStore, shall_update, componentName) }

                                    })

                            }

                        }

                        if ('views' in data && data.views.length > 0) {

                            for(let i_view = 0; i_view < data.views.length; i_view ++)
                            {

                                getDownloadURL(ref(storage, `robots/${data.views[i_view].image}`))
                                    .then((url) => {

                                        data.views[i_view].image = url
                                        media.push(url)
                                        if ( media.length === count_media_total ) {

                                            local_state.robots[data.id] = data
                                            shall_update.push(update_decision(data, robotsStore.robots))

                                        }
                                        if(Object.keys(local_state.robots).length === docs.size) { update(local_state, robotsStore, shall_update, componentName) }


                                    })

                            }

                        }

                    })

                }

            })


    }, []); /* eslint-disable-line react-hooks/exhaustive-deps */

    /* Manage state persistence */
    useEffect(() => {

        localStorage.setItem(persistKey, JSON.stringify(robotsStore))

    }, [robotsStore, persistKey]);

    const state = useMemo(() => ({ robots: robotsStore.robots }), [robotsStore]);

    logText(componentName,'debug','workflow',' Rendering')

    /* ----------- Define HTML --------- */
    return (
        <Profiler id={componentName} onRender={onRender}>
            <Context.Provider value={state}>
                {children}
            </Context.Provider>
        </Profiler>
    );

}

export default Provider;
