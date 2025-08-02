
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc,getFirestore,collection} from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyCrooBUBnfO5WftyDEAG3jR09iKKG5pjQs",
  authDomain: "netflix-clone-272d9.firebaseapp.com",
  projectId: "netflix-clone-272d9",
  storageBucket: "netflix-clone-272d9.firebasestorage.app",
  messagingSenderId: "784712796381",
  appId: "1:784712796381:web:35f910be7e68df86957334"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app) 

const signUp = async (name,email,password)=>{
    try {
        const res = await createUserWithEmailAndPassword(auth,email,password)
        const user = res.user;
        await addDoc(collection(db,"user") , {
            uid:user.uid,
            name,
            authProvider:"local",
            email,
        })

    } catch (error){
        console.log(error)
        toast.error(error.code.split('/')[1].split('-').join(" "))
    }
}


const login = async(email,password)=>{
   try {
     await signInWithEmailAndPassword(auth,email,password)
   } catch (error) {
     console.log(error)
          toast.error(error.code.split('/')[1].split('-').join(" "))
   }
}




const logout = async()=>{
    signOut(auth)
}
export{auth,db,login,signUp,logout}
