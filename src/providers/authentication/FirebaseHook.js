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
# Nadège LEMPERIERE, @16 june 2023
# Latest revision: 16 june 2023
# ---------------------------------------------------- */

import { initializeApp, getApps }                                   from 'firebase/app';
import { getAuth, signOut, EmailAuthProvider, GoogleAuthProvider }  from 'firebase/auth';
import { deleteUser, onAuthStateChanged, sendEmailVerification  }   from 'firebase/auth';
import { getFirestore, collection, query, getDocs, where }          from 'firebase/firestore'
import { auth }                                                     from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';

export const useInitializeApp = () => { return initializeApp; };
export const useGetApps = () => { return getApps; };
export const useGetAuth = () => { return getAuth; };
export const useEmailAuthProvider = () => { return EmailAuthProvider; };
export const useGoogleAuthProvider = () => { return GoogleAuthProvider; };
export const useGetUIAuth = () => { return auth; };
export const useSendEmailVerification = () => { return sendEmailVerification; };
export const useDeleteUser = () => { return deleteUser; };
export const useSignOut = () => { return signOut; };
export const useGetFirestore = () => { return getFirestore; };
export const useCollection = () => { return collection; };
export const useGetDocs = () => { return getDocs; };
export const useQuery = () => { return query; };
export const useWhere = () => { return where; };
export const useOnAuthStateChanged  = () => { return onAuthStateChanged; };
