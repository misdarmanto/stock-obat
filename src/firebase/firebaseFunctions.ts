import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc
} from 'firebase/firestore'
import { fireBase } from '../configs/firebase.config'

interface IFireBaseCreateData {
  collectionName: string
  data: any
}

interface IFireBaseGetDocumentData {
  collectionName: string
  documentId: string
}

interface IFireBaseUpdateDocumentData extends IFireBaseGetDocumentData {
  data: any
}

interface IFireBaseDeleteDocumentData extends IFireBaseGetDocumentData {}

export enum Collections {
  STOCKS = 'STOCKS',
  USERS = 'USERS',
  HISTORY_PENJUALAN = 'HISTORY_PENJUALAN'
}

const createData = async ({ collectionName, data }: IFireBaseCreateData) => {
  try {
    const stokObatRef = doc(collection(fireBase.db, collectionName))
    await setDoc(stokObatRef, data)
  } catch (error: any) {
    throw Error(error.message)
  }
}

const getCollectionData = async ({ collectionName }: { collectionName: string }) => {
  try {
    const result: any = []
    const querySnapshot = await getDocs(collection(fireBase.db, collectionName))
    querySnapshot.forEach((doc) => {
      result.push({ ...doc.data(), id: doc.id })
    })
    return result
  } catch (error: any) {
    throw Error(error.message)
  }
}

const getDocumentData = async (props: IFireBaseGetDocumentData) => {
  try {
    const docRef = doc(fireBase.db, props.collectionName, props.documentId)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      console.log('Document data:', docSnap.data())
      return docSnap.data()
    }
    return null
  } catch (error: any) {
    throw Error(error.message)
  }
}

const updateDocumentData = async (props: IFireBaseUpdateDocumentData) => {
  try {
    const docRef = doc(fireBase.db, props.collectionName, props.documentId)
    await updateDoc(docRef, props.data)
  } catch (error: any) {
    throw Error(error.message)
  }
}

const deleteDocumentData = async (props: IFireBaseDeleteDocumentData) => {
  try {
    await deleteDoc(doc(fireBase.db, props.collectionName, props.documentId))
  } catch (error: any) {
    throw Error(error.message)
  }
}

export const firebaseCRUD = {
  createData,
  getCollectionData,
  getDocumentData,
  updateDocumentData,
  deleteDocumentData
}
