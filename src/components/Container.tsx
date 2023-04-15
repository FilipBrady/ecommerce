import { useState } from 'react';
import { Provider } from './Context';
import { Products } from '../data/Products';
import { Categories } from '../data/Categories';
import { CategoryTypes, ProductTypes } from '../data/types';
import { initializeApp } from 'firebase/app';
import {
  addDoc,
  collection,
  collectionGroup,
  doc,
  DocumentData,
  Firestore,
  getDocs,
  getFirestore,
  increment,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import {
  Auth,
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  User,
} from 'firebase/auth';
import {
  FirebaseStorage,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

export type AppState = {
  products: ProductTypes;
  categories: CategoryTypes;

  db: Firestore;
  user: User | null | undefined;
  userInfo: DocumentData[] | undefined;
  auth: Auth;
  signInWithGoogle: () => void;

};

type Props = {
  children: (props: AppState) => JSX.Element;
};

const Container = ({ children }: Props) => {
  const firebaseConfig = {
    apiKey: 'AIzaSyBHOm7GklRrU18DR-Vh3_A5VBBGj85pSR0',
    authDomain: 'ecommerce-891a4.firebaseapp.com',
    projectId: 'ecommerce-891a4',
    storageBucket: 'ecommerce-891a4.appspot.com',
    messagingSenderId: '227068402479',
    appId: '1:227068402479:web:6078ecb8b10f95ab761fda',
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth(app);
  const storage = getStorage(app);

  const [user] = useAuthState(auth);

  const userProfileInfo = query(collection(db, 'users'));
  const [userInfo] = useCollectionData(userProfileInfo);

  const [productsList, setProductsList] = useState<ProductTypes>(Products);
  const [categoriesList, setCategoriesList] =
    useState<CategoryTypes>(Categories);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const popUp = await signInWithPopup(auth, provider);
      const user = popUp.user;
      const q = query(collection(db, 'users'), where('uid', '==', user.uid));
      const existingUser = await getDocs(q);
      if (existingUser.docs.length === 0) {
        await setDoc(doc(db, 'users', user.uid), {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const appState: AppState = {
    products: productsList,
    categories: categoriesList,

    db: db,
    user: user,
    userInfo: userInfo,
    auth: auth,
    signInWithGoogle: signInWithGoogle,
  };

  return <Provider value={appState}>{children(appState)}</Provider>;
};

export default Container;
