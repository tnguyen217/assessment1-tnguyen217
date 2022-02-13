import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import {ref as databaseRef, update, get} from 'firebase/database'
import { db, storage  } from "./libs/firebase/firebaseConfig";

document.querySelector("#itemImage").addEventListener("change", onImageSelected);
const itemForm = document.forms['itemForm']

async function pageInit(){
  const key = sessionStorage.getItem('key')
  const itemRef = databaseRef(db, `items/${key}`);
  const itemSnapShot = await get(itemRef)
  const item = itemSnapShot.val();

  // formatter for the form
  if(itemSnapShot.exists()){
    setFieldValues(item)
  }

  itemForm.addEventListener('submit', onUpdateItem)

}

function onUpdateItem(e){
  e.preventDefault();
  updateItemData()

}

// Populate form fields
function setFieldValues({name, height, price, urlPath}){
  itemForm.elements['itemName'].value = name
  itemForm.elements['itemHeight'].value = height
  itemForm.elements['itemPrice'].value = price
  document.querySelector('#uploadImage img').src = urlPath
}

function onImageSelected(e) {
  //selected file
  // file objets   [fileObj, fileObj, fileObj]
  let file = e.target.files[0];
  // update the display with the requested image
  document.querySelector(".display img").src = URL.createObjectURL(file);
}

async function updateItemData(){
  const key = sessionStorage.getItem('key')
  const itemRef = databaseRef(db, `items/${key}`)

  const name = itemForm.elements['itemName'].value.trim()
  const height = itemForm.elements['itemHeight'].value.trim()
  const price = itemForm.elements['itemPrice'].value.trim()
  const file = itemForm.elements['itemImage'].files
  let newFile;

  if(file.length !== 0){
    newFile = itemForm.elements['itemImage'].files[0]
  }

  // format the storage for the new image
  const imageRef = storageRef(storage, `images/${key}/${file.name}`)
  // uploading file to the storage bucket
  const uploadResult = await uploadBytes(imageRef, newFile);
  // url to the image stored in storage bucket
  const urlPath =  await getDownloadURL(imageRef) 
  // path on the storage bucket to the image
  const storagePath = uploadResult.metadata.fullPath;

  
  update(itemRef,{
    urlPath,
    storagePath,
    name,
    height,
    price
  })

  // console.log(name, height, price, file)
}


pageInit()