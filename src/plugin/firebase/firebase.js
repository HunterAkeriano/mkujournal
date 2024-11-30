import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyBMID6Mi8oXodmtpRmY_Tctm2VdoLHityE',
  authDomain: 'sporthub-sl.firebaseapp.com',
  projectId: 'sporthub-sl',
  storageBucket: 'sporthub-sl.appspot.com',
  messagingSenderId: '779803041500',
  appId: '1:779803041500:web:cbf9cc53c00bf4132e1e19',
}

const app = initializeApp(firebaseConfig)

const secondaryApp = initializeApp(firebaseConfig, 'Secondary')

const db = getFirestore(app)
const storage = getStorage(app)

export {
  db,
  storage,
  secondaryApp,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
}
