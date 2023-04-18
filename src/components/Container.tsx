import { useState } from 'react';
import { Provider } from './Context';
import { Products } from '../data/Products';
import { Categories } from '../data/Categories';
import { CategoryTypes, ProductTypes } from '../data/types';
import { initializeApp } from 'firebase/app';
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  collectionGroup,
  deleteDoc,
  deleteField,
  doc,
  DocumentData,
  Firestore,
  getDoc,
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
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useNavigate } from 'react-router-dom';
import { routes } from '../data/routes';

export type AppState = {
  products: DocumentData[] | undefined;
  categories: DocumentData[] | undefined;

  db: Firestore;
  user: User | null | undefined;
  userInfo: DocumentData[] | undefined;
  auth: Auth;
  storage: FirebaseStorage;
  carts: DocumentData[] | undefined;
  signInWithGoogle: () => void;
  logInWithEmailAndPassword: (email: string, password: string) => void;
  registerWithEmailAndPassword: (
    name: string,
    email: string,
    password: string
  ) => void;

  addProduct: (
    useruid: string,
    title: string,
    price: number,
    description: string,
    category: string,
    categoryId: number,
    uploadedImg: Blob
  ) => void;
  deleteProduct: (useruid: string, productId: string) => void;
  addProductToCart: (
    productId: string,
    productPrice: number,
    userUid: string
  ) => void;
  plusProductInCart: (productId: string) => void;
  minusProductInCart: (productId: string) => void;
  deleteProductFromCart: (productId: string) => void;
};

type Props = {
  children: (props: AppState) => JSX.Element;
};

const Container = ({ children }: Props) => {
  const navigate = useNavigate();
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

  const productsInfo = query(collection(db, 'products'));
  const [productsList] = useCollectionData(productsInfo);

  const categoriesInfo = query(collection(db, 'categories'));
  const [categoriesList] = useCollectionData(categoriesInfo);

  const productCartInfo = query(collection(db, 'carts'));
  const [carts] = useCollectionData(productCartInfo);

  // const [productsList, setProductsList] = useState<ProductTypes>(Products);
  // const [categoriesList, setCategoriesList] =
  //   useState<CategoryTypes>(Categories);

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
      navigate(routes.profil);
    } catch (err) {
      console.log(err);
    }
  };

  const registerWithEmailAndPassword = async (
    name: string,
    email: string,
    password: string
    // uploadedImg: Blob
  ) => {
    try {
      const createUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = createUser.user;
      navigate(routes.profil);
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        name: name,
        email: email,
        photoURL: null,
      });
      // const storageRef = ref(storage, `userProfilePictures/` + user.uid);
      // if (uploadedImg !== undefined) {
      //   const uploadTask = uploadBytesResumable(storageRef, uploadedImg);
      //   // Listen for state changes, errors, and completion of the upload.
      //   uploadTask.on(
      //     'state_changed',
      //     snapshot => {
      //       // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      //       const progress =
      //         (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      //       console.log('Upload is ' + progress + '% done');
      //       switch (snapshot.state) {
      //         case 'paused':
      //           console.log('Upload is paused');
      //           break;
      //         case 'running':
      //           console.log('Upload is running');
      //           break;
      //       }
      //     },
      //     error => {
      //       // A full list of error codes is available at
      //       // https://firebase.google.com/docs/storage/web/handle-errors
      //       switch (error.code) {
      //         case 'storage/unauthorized':
      //           // User doesn't have permission to access the object
      //           break;
      //         case 'storage/canceled':
      //           // User canceled the upload
      //           break;

      //         // ...

      //         case 'storage/unknown':
      //           // Unknown error occurred, inspect error.serverResponse
      //           break;
      //       }
      //     },
      //     () => {
      //       // Upload completed successfully, now we can get the download URL
      //       getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
      //         console.log('File available at', downloadURL);
      //       });
      //     }
      //   );
      // }
    } catch (err) {
      console.log(err);
    }
  };

  const logInWithEmailAndPassword = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate(routes.profil);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddProduct = async (
    useruid: string,
    title: string,
    price: number,
    description: string,
    category: string,
    categoryId: number,
    uploadedImg: Blob
  ) => {
    const newDocRef = await addDoc(collection(db, 'products'), {
      useruid,
      title,
      price,
      description,
      category,
      categoryId,
      rating: { rate: 0, count: 0 },
      createdAt: serverTimestamp(),
    });
    const productId = newDocRef.id;
    await setDoc(newDocRef, { id: productId }, { merge: true });
    const storageRef = ref(storage, `${auth.currentUser?.uid}/` + productId);
    if (uploadedImg !== undefined) {
      const uploadTask = uploadBytesResumable(storageRef, uploadedImg);
      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(
        'state_changed',
        snapshot => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        },
        error => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case 'storage/unauthorized':
              // User doesn't have permission to access the object
              break;
            case 'storage/canceled':
              // User canceled the upload
              break;

            // ...

            case 'storage/unknown':
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
            console.log('File available at', downloadURL);
          });
        }
      );
    }
  };

  const handleDeleteProduct = async (useruid: string, productId: string) => {
    if (auth.currentUser?.uid === useruid) {
      await deleteDoc(doc(db, 'products', productId));

      // Create a reference to the file to delete
      const desertRef = ref(storage, `${useruid}/${productId}`);
      // Delete the file
      deleteObject(desertRef)
        .then(() => {})
        .catch(error => {});
    }
  };

  const handleAddToCart = async (
    productId: string,
    productPrice: number,
    userUid: string
  ) => {
    const cartRef = doc(db, 'carts', userUid);

    // Get the cart data for the current user
    const cartSnapshot = await getDoc(cartRef);
    const cartData = cartSnapshot.data();

    if (cartSnapshot.exists()) {
      const productIndex = cartData?.productsInCart.findIndex(
        (product: any) => product.productId === productId
      );

      cartData?.productsInCart.map(async (cartProduct: any) => {
        if (cartProduct.productId === productId) {
          const updatedProducts = [...cartData?.productsInCart];
          updatedProducts[productIndex].productAmount++;

          await updateDoc(cartRef, {
            productsInCart: updatedProducts,
          });
        } else {
          const newProduct = {
            productAmount: 1,
            productPrice: productPrice,
            productId: productId,
          };

          const updatedProducts = [...cartData.productsInCart, newProduct];
          await setDoc(cartRef, {
            useruid: userUid,
            productsInCart: updatedProducts,
          });
        }
      });
    } else {
      // If the cart does not exist, create it with the current product
      const newProduct = {
        productAmount: 1,
        productPrice: productPrice,
        productId: productId,
      };
      const updatedProducts = [newProduct];
      await setDoc(cartRef, {
        useruid: userUid,
        productsInCart: updatedProducts,
      });
    }
  };

  const handlePlusProductInCart = async (productId: string) => {
    if (auth.currentUser?.uid !== undefined) {
      const useruid = auth.currentUser?.uid;
      const cartRef = doc(db, 'carts', useruid);

      const cartSnapshot = await getDoc(cartRef);
      const cartData = cartSnapshot.data();
      const productIndex = cartData?.productsInCart.findIndex(
        (product: any) => product.productId === productId
      );
      if (cartSnapshot.exists()) {
        cartData?.productsInCart.map(async (cartProduct: any) => {
          if (cartProduct.productId === productId) {
            const updatedProducts = [...cartData?.productsInCart];
            updatedProducts[productIndex].productAmount++;

            await updateDoc(cartRef, {
              productsInCart: updatedProducts,
            });
          }
        });
      }
    }
  };
  const handleMinusProductInCart = async (productId: string) => {
    if (auth.currentUser?.uid !== undefined) {
      const useruid = auth.currentUser?.uid;
      const cartRef = doc(db, 'carts', useruid);

      const cartSnapshot = await getDoc(cartRef);
      const cartData = cartSnapshot.data();
      const productIndex = cartData?.productsInCart.findIndex(
        (product: any) => product.productId === productId
      );
      if (cartSnapshot.exists()) {
        cartData?.productsInCart.map(async (cartProduct: any) => {
          if (cartProduct.productId === productId) {
            const updatedProducts = [...cartData.productsInCart];
            updatedProducts[productIndex].productAmount--;

            await updateDoc(cartRef, {
              productsInCart: updatedProducts,
            });
          }
        });
      }
    }
  };

  const handleDeleteProductFromCart = async (productId: string) => {
    if (auth.currentUser?.uid !== undefined) {
      const useruid = auth.currentUser.uid;
      const cartRef = doc(db, 'users', useruid);

      const cartSnapshot = await getDoc(cartRef);
      const cartData = cartSnapshot.data();
      
      const productIndex = cartData?.productsInCart.findIndex(
        (product: any) => product.productId === productId
        );
        
        console.log(productIndex);
        
        if (cartSnapshot.exists()) {
          // cartData?.productsInCart.map( async (cartProduct: any) => {
            if (cartData?.productsInCart[productIndex].productId === productId) {
            const updateProducts = [...cartData.productsInCart]
            
            await updateDoc(cartRef, {
              productPrice: deleteField(),
            });
          }
          // });
        }
        alert("hi")
    }
  };

  const appState: AppState = {
    products: productsList,
    categories: categoriesList,

    db: db,
    user: user,
    userInfo: userInfo,
    auth: auth,
    storage: storage,
    carts: carts,
    signInWithGoogle: signInWithGoogle,
    logInWithEmailAndPassword: logInWithEmailAndPassword,
    registerWithEmailAndPassword: registerWithEmailAndPassword,

    addProduct: handleAddProduct,
    deleteProduct: handleDeleteProduct,
    addProductToCart: handleAddToCart,
    plusProductInCart: handlePlusProductInCart,
    minusProductInCart: handleMinusProductInCart,
    deleteProductFromCart: handleDeleteProductFromCart
  };

  return <Provider value={appState}>{children(appState)}</Provider>;
};

export default Container;
