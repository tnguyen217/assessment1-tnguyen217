# Plushie Store Firebase - Assessment 1

This Store is build base on Firebase and deployed using Netlify from GitHub
 
## 1. Index.html
### Link to index.js & read.js 
This is used to display all product in the body section
```html
    <!-- JS links -->
    <script type="module" src="js/index.js"></script>
    <script type="module" src="js/read.js"></script>
```

This is the template for each output item. 
Card Item Elements:
1. Name
2. Height
3. Price
4. Image with alt tag of item's name
3. Edit & Delete Button linked accordingly to update.html & delete.html

```javascript
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
```

## 2. Write.html
### Link to write.js 

This is used to display an insert form to get data for new product item. 
```html
    <!-- JS links -->
    <script type="module" src="js/write.js"></script>
```

Form data will be transfer to write.js to genenerate a unique key for each item before set its data to Firebase RTD.

Form Elememt:
1. Item Name
2. Item Height
3. Item Price
4. Item Image

Set Data to Firebase: 
1. Item Name
2. Item Height
3. Item Price
4. Item Image Path (URl Path & Storage Path)
5. Unique key and SKU Key

```html
    <form id="itemForm" class="add-new-item">
        <div class="item-image form-control">
          <label for="itemImage">Select image </label>
          <div class="display">
            <img src="static/images/default.jpg" alt="plushie upload images of your new plushie item">
          </div>   
          <input type="file" id="itemImage" style="display:none"  class="select-file"  accept=".jpg, .png, .jpeg, .webp">
        </div>

        <div class="item-name form-control">
          <label for="itemName">Item Name</label>         
           <input id="itemName" type="text" placeholder="Dow Dow" >
        </div>

        <div class="item-height form-control">
          <label for="itemHeight">Item Height (cm)</label>         
           <input id="itemHeight" type="number" placeholder="23">
        </div>

        <div class="item-price form-control">
          <label for="itemPrice">Item Price (CAD)</label>         
           <input id="itemPrice" type="number" placeholder="10">
        </div>
        
        <div class="submit-button form-control">
          <a href="index.html">Exit</a>
          <button type="submit">Add Item</button>
        </div>
    </form>
```

### 3 delete.html
### Link to delete.js 
This is used to delete a selected item to be removed from Firebase RTD

```html
    <!-- JS links -->
    <script type="module" src="js/delete.js"></script>
```

The item key and its path will be used to idetify the item need to be delete 
```javascript
    const key = sessionStorage.getItem('key')
    const path = `items/${key}`
    remove(databaseRef(db, path))
```