import {
  ref,
  uploadBytesResumable,
  UploadTaskSnapshot,
  getDownloadURL,
  StorageError,
} from "firebase/storage";

import { storage } from "@/lib/firebase/firebase";

export async function uploadToStorage(
  relativePath: string,
  image: File,
  setProgress: (progress: number)=>void,
  uploadError: (error: StorageError)=>void,
  setImageUrl: (fp: string, url: string)=>void
) {
  const filePath = `${relativePath}`;
  const newImageRef = ref(storage, filePath);
  const uploadTask = uploadBytesResumable(newImageRef, image);

  uploadTask.on(
	  "state_changed", 
    (snapShot: UploadTaskSnapshot) => {
      const progress = (snapShot.bytesTransferred / snapShot.totalBytes) * 100;
      setProgress(Number(progress?.toFixed(1)));
    },
    error => {
      console.log(error.message)
      uploadError(error)
    },
    async () => {
      // on complete
      try{
        const url = await getDownloadURL(newImageRef);
        setImageUrl(filePath, url)
      } catch (error){
        console.log('error', error)
      }
      
    }
  );
}

export async function uploadImage(
  relativePath: string,
  image: File,
  setProgress: (progress: number)=>void,
  uploadError: (error: StorageError)=>void,
  setImageUrl: (fp: string, url: string)=>void
) {
  const filePath = `images/${relativePath}`;
  const newImageRef = ref(storage, filePath);
  const uploadTask = uploadBytesResumable(newImageRef, image);

  uploadTask.on(
	  "state_changed", 
    (snapShot: UploadTaskSnapshot) => {
      const progress = (snapShot.bytesTransferred / snapShot.totalBytes) * 100;
      setProgress(Number(progress?.toFixed(1)));
    },
    error => {
      console.log(error.message)
      uploadError(error)
    },
    async () => {
      // on complete
      try{
        const url = await getDownloadURL(newImageRef);
        setImageUrl(filePath, url)
      } catch (error){
        console.log('error', error)
      }
      
    }
  );
}
