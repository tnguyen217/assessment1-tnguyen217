import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import {ref as databaseRef, push, set, get, remove} from 'firebase/database'
import { db, storage  } from "./libs/firebase/firebaseConfig";

document.querySelector("#itemImage").addEventListener("change", onImageSelected);
document.forms["itemForm"].addEventListener("submit", onAddItem); 


    function onAddItem(e) {
        e.preventDefault();
        uploadNewItem();
    }
  

   function onImageSelected(e) {
    //selected file
    // file objets   [fileObj, fileObj, fileObj]
    let file = e.target.files[0];
    // update the display with the requested image
    document.querySelector(".display img").src = URL.createObjectURL(file);
}

    async function uploadNewItem() {
        // form data
        const name = document.querySelector('#itemName').value.trim();
        const height = document.querySelector('#itemHeight').value.trim();
        const price = document.querySelector('#itemPrice').value.trim();
        const file = document.querySelector('#itemImage').files[0]
        
        // paths to the data to write
        const imageRef = storageRef( storage, `images/${file.name}`);
        const dataRef =  databaseRef( db, 'items/')

        // uploading file to the storage bucket
        const uploadResult = await uploadBytes(imageRef, file);
        // url to the image stored in storage bucket
        const urlPath =  await getDownloadURL(imageRef) 
        // path on the storage bucket to the image
        const storagePath = uploadResult.metadata.fullPath;

        // firebase unique key
        const itemRef = await push(dataRef)
        

        
        set(itemRef,{
           key:itemRef.key,
           sku:`plushie-${itemRef.key}`,
           urlPath,
           storagePath,
           name,
           height,
           price
        })
        
    }
 