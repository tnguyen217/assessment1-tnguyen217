import {ref as dataRef, get, set, update} from 'firebase/database';
import {db} from './libs/firebase/firebaseConfig';
import {itemCard} from './templates/itemCard'

async function pageInit(){
    const itemRef = dataRef(db, 'items/');
    const itemSnapShot = await get(itemRef)
    const data = itemSnapShot.val();
   
    // Object of Objects  rental{{},{},{}}
    // Arrays of Objects
    // map filter reduce sort find ....
    // Object.keys()  Object.enteries() Object.values();
      
    const itemCards =   Object.values(data).map(item=>{
            const card = itemCard(item)
            // layout thrashing
            document.querySelector('#itemDisplay').append(card)
            return card
      })
      
      
}

pageInit()