# Getting Started

(all commands are in windows terminal, adjust for whatever os you use)

Step 1. Clone this repo onto your local 

`git clone https://github.com/TVageesan/Hack4Good.git mini-mart`

Step 2. Change directory to your project

`cd mini-mart`

Step 3. Install dependencies

`npm install`

Step 4. Download .env

Go to telegram chat, find pinned post with a '.env' file

Download it and place in base folder (same folder as package.json)

Step 5. Build & deploy website 

`npm run dev`

# References

[Mantine](https://mantine.dev/) is a component library with drag and drop components (i.e. Buttons, Forms, Tables etc.) you can use to speed up development time with high quality, easy to use components. 

[Tabler](https://tabler.io/icons) is a icon library. Use this to quickly find appropiate icons to put into the website, it has already been installed so just directly import said icon.
Example:

 `import { IconHeart, IconShoppingCart } from '@tabler/icons-react';`

[React Router](https://reactrouter.com/start/library/) is a router framework that makes page navigation easy and fast. [NavLink](https://reactrouter.com/start/library/navigating#navlink) and [useNavigate](https://reactrouter.com/start/library/navigating#usenavigate) should be the only things you have to be aware about.

# Blackboxing backend

1. Create a new function in db/database.ts to return your dummy data. 
ex. (remb to make a new class on types.ts with variables matching ur function!)
```
export const getAllProducts = async () => {
  const products = [
    {
      name: 'Oreo',
      price: 300,
      description: 'A tasty snack',
      img: 'path-to-image',
      stock: 50,
      category: "Snacks"
    }
  ]
  return products
};

```

2. Import the function wherever you use it in your front end
```
import { getAllProducts } from "../../db/database";
```

3. Use your data in this pattern:
```
export default function Market(){
...
const [products, setProducts] = useState<Product[]>([]);
getAllProducts().then((products) => setProducts(products));
...
return (
<div>
 ... use your data here as if you have it ...
</div>
)}
```

Note: This introduces async behaviour you might want to be aware of, but if you directly copy paste the above it shouldn't matter.

For reference though this is the relevant documentation: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise

TLDR is your webpage will have two states.

Initial: Your data hasn't arrived yet, the website loads with the default value. (In above example, it will load up with products value being empty array.

After fetch: your data arrives from supabase (above is getAllProducts()) and your products value updates. This triggers the webpage to reload with all your data now properly displayed.

This can be a source of bugs if you don't handle the initial state gracefully so just a heads up :)
