/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Hook calling firebase functions.
# This hook is the only way to enable jest to mock the
# calls to firebase third party libraries by mocking the
# hook .
# -------------------------------------------------------
# Nadège LEMPERIERE, @30 may 2023
# Latest revision: 30 may 2023
# ---------------------------------------------------- */

/* Importing TextEncoder for tests */
import { initializeApp, getApps }               from 'firebase/app';
import { getFirestore, collection, getDocs }    from "firebase/firestore";
import { getStorage, ref, getDownloadURL  }     from "firebase/storage";

export const useInitializeApp = () => { return initializeApp; };
export const useGetApps = () => { return getApps; };
export const useGetFirestore = () => { return getFirestore; };
export const useCollection = () => { return collection; };
export const useGetDocs = () => { return getDocs; };
export const useGetStorage = () => { return getStorage; };
export const useRef = () => { return ref; };
export const useGetDownloadUrl = () => { return getDownloadURL; };
