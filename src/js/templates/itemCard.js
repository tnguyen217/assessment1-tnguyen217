function itemCard ({key, name, height, price, urlPath}){
  const template = `
      
    <div class="item-card-info">
        <div class="admin">
            <a href="update.html" id="edit" data-key="${key}" >edit</a>
            <a href="delete.html" id="delete" data-key="${key}" >delete</a>
        </div>

        <div class="item-card">
            <img src="${urlPath}" alt="${name}">

            <div class="item-text">
                <div class="info">
                    <h2>${name}</h2>
                    <p class="price"><span>$</span>${price}</p>
                </div>

                <p class="height">Height: ${height}cm</p>
            <div>
            
            <button class="add">+</button>
        </div>
        

    </div>
  `

  const element = document.createRange().createContextualFragment(template).children[0]
  addCardControls(element)
  return element
}

function addCardControls(item){
    item.querySelector('#edit').addEventListener('click', onEditItem)
    item.querySelector('#delete').addEventListener('click', onRemoveItem)
}


function onEditItem(e){
    const key = e.target.dataset.key 
    sessionStorage.setItem('key', key)
    window.location.assign('update.html')
}

function onRemoveItem(e){
    const key = e.target.dataset.key 
    sessionStorage.setItem('key', key)
    window.location.assign('delete.html')
}

export {itemCard}