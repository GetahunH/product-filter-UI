const products = [
  {
    name: 'Sony Playstation 5',
    url:'/images/playstation_5.png',
    // url: '.images/playstation-5.png',
    category: 'games',
    price: 499.99,
  },
  {
    name: 'Samsung Galaxy',
    url: '/images/samsung_galaxy.png',
    category: 'smartphones',
    price: 399.99,
  },
  {
    name: 'Cannon EOS Camera',
    url: '/images/cannon_eos_camera.png',
    category: 'cameras',
    price: 749.99,
  },
  {
    name: 'Sony A7 Camera',
    url: '/images/sony_a7_camera.png',
    category: 'cameras',
    price: 1999.99,
  },
  {
    name: 'LG TV',
    url: '/images/lg_tv.png',
    category: 'televisions',
    price: 799.99,
  },
  {
    name: 'Nintendo Switch',
    url: '/images/nintendo_switch.png',
    category: 'games',
    price: 299.99,
  },
  {
    name: 'Xbox Series X',
    url: '/images/xbox_series_x.png',
    category: 'games',
    price: 499.99,
  },
  {
    name: 'Samsung TV',
    url: '/images/samsung_tv.png',
    category: 'televisions',
    price: 1099.99,
  },
  {
    name: 'Google Pixel',
    url: '/images/google_pixel.png',
    category: 'smartphones',
    price: 499.99,
  },
  {
    name: 'Sony ZV1F Camera',
    url: '/images/sony_zv1f_camera.png',
    category: 'cameras',
    price: 799.99,
  },
  {
    name: 'Toshiba TV',
    url: '/images/toshiba_tv.png',
    category: 'televisions',
    price: 499.99,
  },
  {
    name: 'iPhone 14',
    url: '/images/iphone_14.png',
    category: 'smartphones',
    price: 999.99,
  },
];
// Select DOM Elements
const productsWarapper = document.getElementById('products-wrapper');
const checkBoxes = document.querySelectorAll('input[type="checkbox"]');
const filtresContainer = document.getElementById('filters-container');
const searchInput = document.getElementById('search');
const cartCount = document.getElementById('cart-count');

// init cart item count 
let cartItemCount =0;

// init product ellement
const productElements = [];
filtresContainer.addEventListener('change',filterProducts);
searchInput.addEventListener('input',filterProducts);


// loop over products and create an element
products.forEach((product)=>{
   const productElement =createProductElement(product);
   productElements.push(productElement);
   productsWarapper.appendChild(productElement);
})
//create product element
function createProductElement(product){
  const productElement = document.createElement('div');

  productElement.className = 'item space-y-2';

  // console.log(productElement);
  productElement.innerHTML = `
        <div class="bg-gray-100 flex justify-center relative overflow-hidden group cursor-pointer border rounded-xl">
          <img src="${product.url}" 
               alt="${product.name}" class="w-full h-full object-cover">
          <button 
              class="status bg-black text-white absolute bottom-0 left-0 right-0 text-center py-2 translate-y-full transition group-hover:translate-y-0">
              Add To Cart
          </button>
        </div>
        <p class="text-xl">${product.name}</p>
        <strong>$${product.price.toLocaleString()}</strong>
   `;
   productElement.querySelector('.status').addEventListener('click',updateCart);

   return productElement;
}
//@@@@@@@@@@@@@@@@@@@@@@@@ Add or remove @@@@@@@@@@@@@@@@@@222222222
function updateCart(e){
   const statusEl = e.target;

   if(statusEl.classList.contains('added')){
    //Remove form cart
    statusEl.classList.remove('added');
    statusEl.innerHTML="Add To Cart";
    statusEl.classList.remove('bg-red-600');
    statusEl.classList.add('bg-gray-800');
    cartItemCount--;
   }else{
    //Add to cart
    statusEl.classList.add('added');
    statusEl.innerHTML="Remove From Cart";
    statusEl.classList.remove('bg-gray-800');
    statusEl.classList.add('bg-red-600');

    cartItemCount++;
   }

   //Update cart item count
   cartCount.innerText = cartItemCount.toString();
}

// filter products by checkboxes and input search
function filterProducts(){
  //Get search item
  const searchTerm = searchInput.value.trim().toLowerCase();
  //Get checked categories
  const checkedCategories = Array.from(checkBoxes)
  .filter((check)=>check.checked)
  .map((check)=>check.value);

  //loop over products and check for matchs
  productElements.forEach((productElement,index)=>{
   const product = products[index];

   //check to see if the product matches the search input or checked categories
   const matchesSearchTerm = product.name.toLowerCase().includes(searchTerm);
   const isInCheckedCategory = checkedCategories.length === 0 || checkedCategories.includes(product.category);
   // show or hide product based on the matches
   if(matchesSearchTerm && isInCheckedCategory){
    productElement.classList.remove('hidden');
   }else{
    productElement.classList.add('hidden');
   }
  });
}