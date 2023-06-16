/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Seasons provider to share database data between
# components
# -------------------------------------------------------
# Nadège LEMPERIERE, @14 june 2023
# Latest revision: 14 june 2023
# ---------------------------------------------------- */

/* React includes */
import { useMemo, useEffect, useState, Profiler }     from 'react';

/* Portal includes */
import { useLogging, useConfiguration }               from '../../providers';

/* Local includes */
import { Context }                                    from './Context';
import { useInitializeApp, useGetApps }               from './FirebaseHook';
import { useGetFirestore, useCollection, useGetDocs } from './FirebaseHook';
import { useGetStorage, useRef, useGetDownloadUrl }   from './FirebaseHook';

function Provider(props) {

    /* --------- Gather inputs --------- */
    const { children, persistKey = 'seasons' }   = props;
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
    const componentName = 'SeasonsProvider';

    /* Create local states */
    const savedState = JSON.parse(localStorage.getItem(persistKey));
    const [seasonsStore, setSeasonsStore] = useState({
        seasons: {},
        ...savedState,
    })

    useEffect(() => {

        logText(componentName,'debug','workflow',' Loading data --- BEGIN')

        const local_state = {seasons:{}}
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

            if( Object.keys(local.seasons).length !== Object.keys(store.seasons).length ) { /* Object removed */ shall_update.push(true) }
            if( shall_update.indexOf(true) > -1) {

                /* If at least one object has triggered an update */
                logText(componentName, 'info', 'workflow', ' Loading data --- UPDATE')
                setSeasonsStore(local)

            }
            logText(componentName,'debug','workflow',' Loading data --- END')

        }

        /* Loading data from firestore and firebase storage */
        getDocs(collection(firestore, 'seasons'))
            .then((docs) => {

                logText(componentName, 'info', 'data', ` Found ${docs.size} seasons`)
                if(docs.length === 0 ) { setSeasonsStore(local_state) }
                else {

                    docs.forEach((doc) => {

                        const data = JSON.parse(JSON.stringify(doc.data()))
                        data.id = doc.id
                        data.version = doc._document.version.timestamp
                        data.image = {}
                        getDownloadURL(ref(storage, `seasons/${data['image-root']}.png`))
                            .then((url) => {

                                data.image.raw = url
                                if(Object.entries(data.image).length === 2) {

                                    local_state.seasons[data.id] = data
                                    shall_update.push(update_decision(data, seasonsStore.seasons))

                                }
                                if(Object.keys(local_state.seasons).length === docs.size) { update(local_state, seasonsStore, shall_update, componentName) }

                            })

                        getDownloadURL(ref(storage, `seasons/${data['image-root']}.webp`))
                            .then((url) => {

                                data.image.web = url
                                if(Object.entries(data.image).length === 2) {

                                    local_state.seasons[data.id] = data
                                    shall_update.push(update_decision(data, seasonsStore.seasons))

                                }
                                if(Object.keys(local_state.seasons).length === docs.size) { update(local_state, seasonsStore, shall_update, componentName) }

                            })

                    })

                }

            })

    }, []); /* eslint-disable-line react-hooks/exhaustive-deps */

    /* Manage state persistence */
    useEffect(() => {

        localStorage.setItem(persistKey, JSON.stringify(seasonsStore))

    }, [seasonsStore, persistKey]);

    const state = useMemo(() => ({ seasons : seasonsStore.seasons }), [seasonsStore]);

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
