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
import { useFetch }                                                 from './RestHook';
import { setPosts, setSeasons, setRobots, setTeam, setCalendars }   from './store/actions';
import reducer                                                      from './store/reducer';

function Provider(props) {

    /* --------- Gather inputs --------- */
    const { children, persistKey = 'data' }      = props;
    const { logText }                            = useLogging();
    const { config }                             = useConfiguration();
    const { firebase = {}, calendars = {} }      = config;
    const initializeApp                          = useInitializeApp();
    const getApps                                = useGetApps();
    const getFirestore                           = useGetFirestore();
    const collection                             = useCollection();
    const getDocs                                = useGetDocs();
    const getStorage                             = useGetStorage();
    const getDownloadURL                         = useGetDownloadUrl();
    const ref                                    = useRef();
    const fetch                                  = useFetch();
    const componentName = 'DataProvider';

    /* Create local states */
    const savedState = JSON.parse(localStorage.getItem(persistKey));
    const [dataStore, dispatch] = useReducer(reducer, {
        posts:  [],
        seasons:  [],
        robots: [],
        team: [],
        calendars: {},
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

        /* Collect public calendars */
        fetch(`https://www.googleapis.com/calendar/v3/calendars/${calendars['public']}/events?key=${firebase['api-key']}`)
            .then(response => response.json())
            .then(data => {

                const calendars = {...dataStore.calendars}
                calendars['public'] = data.items
                dispatch(setCalendars(calendars))

            }
            );


        /* Initialize firebase if it was not previously done */
        const apps              = getApps()
        let app = null
        if( apps.length === 0 ) { app = initializeApp(firebase_config) }
        else                    { app = apps[0]}

        /* Configure firestore */
        const local_firestore   = getFirestore(app);
        const local_storage     = getStorage(app);
        setFirebase({firestore: local_firestore, storage: local_storage})

        getDocs(collection(local_firestore, 'team'))
            .then((docs) => {

                logText(componentName, 'info', 'data', ` Found ${docs.size} team members`)
                const team = []
                docs.forEach((doc) => {

                    const data = JSON.parse(JSON.stringify(doc.data()))
                    if ( 'image' in data ) {

                        getDownloadURL(ref(local_storage, `team/${data['image']}`))
                            .then((url) => {

                                data['image'] = url
                                data['id'] = doc.id
                                team.push(data)
                                if(team.length === docs.size) { dispatch(setTeam(team)) }

                            })

                    }
                    else {

                        data['id'] = doc.id
                        team.push(data)
                        if(team.length === docs.size) { dispatch(setTeam(team)) }

                    }

                })

            })

        getDocs(collection(local_firestore, 'robots'))
            .then((docs) => {

                logText(componentName, 'info', 'data', ` Found ${docs.size} robots`)
                const robots = []
                docs.forEach((doc) => {

                    const data = JSON.parse(JSON.stringify(doc.data()))
                    getDownloadURL(ref(local_storage, `robots/${data['image']}`))
                        .then((url) => {

                            data['image'] = url
                            data['id'] = doc.id
                            const media = [];
                            const count_media_total =
                                ('features' in data ? data.features.length  : 0) +
                                ('views'    in data ? data.views.length  : 0)
                            if ('features' in data && data.features.length > 0) {

                                for(let i_feature = 0; i_feature < data.features.length; i_feature +=1)
                                {

                                    getDownloadURL(ref(local_storage, `robots/${data.features[i_feature].media}`))
                                        .then((url_media) => {

                                            data.features[i_feature].media = url_media
                                            media.push(url_media)
                                            if (media.length === count_media_total) { robots.push(data) }
                                            if( robots.length === docs.size) { dispatch(setRobots(robots)) }

                                        })

                                }

                            }
                            if ('views' in data && data.views.length > 0) {

                                for(let i_view = 0; i_view < data.views.length; i_view ++)
                                {

                                    getDownloadURL(ref(local_storage, `robots/${data.views[i_view].image}`))
                                        .then((url_media) => {

                                            data.views[i_view].image = url_media
                                            media.push(url_media)
                                            if (media.length === count_media_total) { robots.push(data) }
                                            if( robots.length === docs.size) { dispatch(setRobots(robots)) }

                                        })

                                }

                            }
                            if(count_media_total === 0 ) {

                                robots.push(data)
                                if(robots.length === docs.size) { dispatch(setRobots(robots)) }

                            }

                        })

                })

            })


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
        robots:     dataStore.robots,
        team:       dataStore.team,
        calendars:  dataStore.calendars,
    }), [dataStore]);


    /* ----------- Define HTML --------- */
    return (
        <Context.Provider value={state}>
            {children}
        </Context.Provider>
    );

}

export default Provider;
