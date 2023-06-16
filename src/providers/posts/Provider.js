/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Posts provider to share database data between
# components
# -------------------------------------------------------
# Nadège LEMPERIERE, @14 june 2023
# Latest revision: 14 june 2023
# ---------------------------------------------------- */

/* React includes */
import { useMemo, useEffect, useState, Profiler }    from 'react';

/* Portal includes */
import { useLogging, useConfiguration }               from '../../providers';

/* Local includes */
import { Context }                                    from './Context';
import { useInitializeApp, useGetApps }               from './FirebaseHook';
import { useGetFirestore, useCollection, useGetDocs } from './FirebaseHook';
import { useGetStorage, useRef, useGetDownloadUrl }   from './FirebaseHook';

function Provider(props) {

    /* --------- Gather inputs --------- */
    const { children, persistKey = 'posts' }     = props;
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
    const componentName = 'PostsProvider';

    /* Create local states */
    const savedState = JSON.parse(localStorage.getItem(persistKey));
    const [postsStore, setPostsStore] = useState({
        posts: {},
        ...savedState,
    })

    useEffect(() => {

        logText(componentName,'debug','workflow',' Loading data --- BEGIN')

        const local_state = {posts:{}}
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

            if( Object.keys(local.posts).length !== Object.keys(store.posts).length ) { /* Object removed */ shall_update.push(true) }
            if( shall_update.indexOf(true) > -1) {

                /* If at least one object has triggered an update */
                logText(componentName, 'info', 'workflow', ' Loading data --- UPDATE')
                setPostsStore(local)

            }
            logText(componentName,'debug','workflow',' Loading data --- END')

        }

        /* Loading data from firestore and firebase storage */
        getDocs(collection(firestore, 'posts'))
            .then((docs) => {

                logText(componentName, 'info', 'data', ` Found ${docs.size} posts`)
                if(docs.length === 0 ) { update(local_state, postsStore, shall_update, componentName) }
                else {

                    docs.forEach((doc) => {

                        const data = JSON.parse(JSON.stringify(doc.data()))
                        data.version = doc._document.version.timestamp
                        data.id = doc.id
                        getDownloadURL(ref(storage, `posts/${data['image']}`))
                            .then((url) => {

                                data['image'] = url
                                if ('media' in data && data['media'].length > 0) {

                                    const media = []
                                    for(let i_media = 0; i_media < data.media.length; i_media ++)
                                    {

                                        getDownloadURL(ref(storage, `posts/${data['media'][i_media]}`))
                                            .then((url_media) => {

                                                media.push(url_media)
                                                if (media.length === data.media.length) {

                                                    data['media'] = media
                                                    local_state.posts[data.id] = data
                                                    shall_update.push(update_decision(data, postsStore.posts))

                                                }
                                                if(Object.keys(local_state.posts).length === docs.size) { update(local_state, postsStore, shall_update, componentName) }

                                            })

                                    }

                                }
                                else {

                                    local_state.posts[data.id] = data
                                    shall_update.push(update_decision(data, postsStore.posts))
                                    if(Object.keys(local_state.posts).length === docs.size) { update(local_state, postsStore, shall_update, componentName) }


                                }

                            })

                    })

                }

            })

    }, []); /* eslint-disable-line react-hooks/exhaustive-deps */

    /* Manage state persistence */
    useEffect(() => {

        localStorage.setItem(persistKey, JSON.stringify(postsStore))

    }, [postsStore, persistKey]);

    const state = useMemo(() => ({ posts : postsStore.posts }), [postsStore]);

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
