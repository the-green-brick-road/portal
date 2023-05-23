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
# Nadège LEMPERIERE, @08 may 2023
# Latest revision: 08 may 2023
# ---------------------------------------------------- */

import { getFirestore, collection, query, getDocs, where }             from 'firebase/firestore'
import { initializeApp, getApps }                                      from 'firebase/app';
import { getAuth, EmailAuthProvider, GoogleAuthProvider, deleteUser }  from 'firebase/auth';
import { auth }                                                        from 'firebaseui';

export const useInitializeApp = () => { return initializeApp; };
export const useGetApps = () => { return getApps; };
export const useGetFirestore = () => { return getFirestore; };
export const useGetAuth = () => { return getAuth; };
export const useEmailAuthProvider = () => { return EmailAuthProvider; };
export const useGoogleAuthProvider = () => { return GoogleAuthProvider; };
export const useGetUIAuth = () => { return auth; };
export const useCollection = () => { return collection; };
export const useQuery = () => { return query; };
export const useDeleteUser = () => { return deleteUser; };
export const useGetDocs = () => { return getDocs; };
export const useWhere = () => { return where; };