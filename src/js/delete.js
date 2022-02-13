import {ref as databaseRef, get, remove} from 'firebase/database'
import { db, storage  } from "./libs/firebase/firebaseConfig";

async function pageInit(){

    const key = sessionStorage.getItem('key')
    const path = `items/${key}`

    remove(databaseRef(db, path))
  }
  
  pageInit()