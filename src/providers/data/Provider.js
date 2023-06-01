/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Data provider to share database data between
# components
# -------------------------------------------------------
# Nadège LEMPERIERE, @30 may 2023
# Latest revision: 30 may 2023
# ---------------------------------------------------- */

/* React includes */
import { useMemo, useReducer, useEffect, useState }                 from 'react';

/* Portal includes */
import { useLogging, useConfiguration }                             from '../../providers';

/* Local includes */
import { Context }                                                  from './Context';
import { useInitializeApp, useGetApps }                             from './FirebaseHook';
import { useGetFirestore, useCollection, useGetDocs }               from './FirebaseHook';
import { useGetStorage, useRef, useGetDownloadUrl }                 from './FirebaseHook';
import { setPosts, setSeasons }                                     from './store/actions';
import reducer                                                      from './store/reducer';

function Provider(props) {

    /* --------- Gather inputs --------- */
    const { children, persistKey = 'data' } = props;
    const { logText }                            = useLogging();
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
    const componentName = 'DataProvider';

    /* Create local states */
    const savedState = JSON.parse(localStorage.getItem(persistKey));
    const [dataStore, dispatch] = useReducer(reducer, {
        posts:  [],
        seasons:  [],
        ...savedState,
    });

    const [firebaseState, setFirebase] = useState({firestore : null, storage : null}) /* eslint-disable-line no-unused-vars */

    useEffect(() => {

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
        const local_firestore   = getFirestore(app);
        const local_storage     = getStorage(app);
        setFirebase({firestore: local_firestore, storage: local_storage})
        getDocs(collection(local_firestore, 'seasons'))
            .then((docs) => {

                logText(componentName, 'info', 'data', ` Found ${docs.size} seasons`)
                const seasons = []
                docs.forEach((doc) => {

                    const data = JSON.parse(JSON.stringify(doc.data()))
                    getDownloadURL(ref(local_storage, `seasons/${data['image']}`))
                        .then((url) => {

                            data['image'] = url
                            data['id'] = doc.id
                            seasons.push(data)
                            if(seasons.length === docs.size) { dispatch(setSeasons(seasons)) }

                        })

                })

            })

        getDocs(collection(local_firestore, 'posts'))
            .then((docs) => {


                logText(componentName, 'info', 'data', ` Found ${docs.size} posts`)
                const posts = []
                docs.forEach((doc) => {

                    const data = JSON.parse(JSON.stringify(doc.data()))
                    getDownloadURL(ref(local_storage, `posts/${data['image']}`))
                        .then((url) => {

                            data['image'] = url
                            data['id'] = doc.id

                            if ('media' in data && data['media'].length > 0) {

                                const media = []
                                for(let i_media = 0; i_media < data.media.length; i_media ++)
                                {

                                    getDownloadURL(ref(local_storage, `posts/${data['media'][i_media]}`))
                                        .then((url_media) => {

                                            media.push(url_media)
                                            if (media.length === data.media.length) {

                                                data['media'] = media
                                                posts.push(data)

                                            }
                                            if(posts.length === docs.size) { dispatch(setPosts(posts)) }

                                        })

                                }

                            }
                            else {

                                posts.push(data)
                                if(posts.length === docs.size) { dispatch(setPosts(posts)) }

                            }

                        })

                })

            })

    }, []); /* eslint-disable-line react-hooks/exhaustive-deps */

    /* Manage state persistence */
    useEffect(() => {

        localStorage.setItem(persistKey, JSON.stringify(dataStore))

    }, [dataStore, persistKey]);

    const state = useMemo(() => ({
        seasons :   dataStore.seasons,
        posts :     dataStore.posts,
    }), [dataStore]);


    /* ----------- Define HTML --------- */
    return (
        <Context.Provider value={state}>
            {children}
        </Context.Provider>
    );

}

export default Provider;
