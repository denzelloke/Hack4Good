# Video Demo Link
https://youtu.be/oUWSrqQz67c


# How to use for demo
Go to https://bbb-mini-mart.vercel.app/

As the project is for a closed system (i.e. public users should not be able to access into it by creating an account), demo users will need to use the following credentials:

### User account
**Username**: test_user

**Password**: password

### Admin account
**Username**: test_admin

**Password**: password


# Documentation

## Getting Started (Local Development)

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

## Postgres schema

![image](https://github.com/user-attachments/assets/6146bcd6-aa64-49c6-98cb-cf460f3b0ab2)

## Tech Stack

[Mantine](https://mantine.dev/) is a component library with drag and drop components (i.e. Buttons, Forms, Tables etc.) you can use to speed up development time with high quality, easy to use components. 

[Tabler](https://tabler.io/icons) is a icon library. Use this to quickly find appropiate icons to put into the website, it has already been installed so just directly import said icon.
Example:

 `import { IconHeart, IconShoppingCart } from '@tabler/icons-react';`

[React Router](https://reactrouter.com/start/library/) is a router framework that makes page navigation easy and fast. [NavLink](https://reactrouter.com/start/library/navigating#navlink) and [useNavigate](https://reactrouter.com/start/library/navigating#usenavigate) should be the only things you have to be aware about.
