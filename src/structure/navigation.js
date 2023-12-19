import {Login} from "../pages/Login/Login";
import {Register} from "../pages/Register/Register";
import Home from "../pages/Home/Home";
import Categories from "../pages/Category/Categories";
import CategoryForm from "../components/categories/CategoryForm";
import Products from "../pages/Product/Products";
import ProductForm from "../components/produtcs/ProductForm";


export const nav = [
    {path:'/', name:'Home',element:<Home/>,isMenu:false,isPrivate:false},
    {path:'/login', name:'Login',element:<Login/>,isMenu:false,isPrivate:false},
    {path:'/register', name:'Register',element:<Register/>,isMenu:false,isPrivate:false},
    //categories
    {path:'/categories', name:'Categories',element:<Categories/>,isMenu:false,isPrivate:true},
    {path:'/add-category', name:'AddCategory',element:<CategoryForm/>,isMenu:true,isPrivate:true},
    {path:'/edit-category/:id', name:'EditCategory',element:<CategoryForm/>,isMenu:true,isPrivate:true},
    //products
    {path:'/products', name:'Products',element:<Products/>,isMenu:false,isPrivate:true},
    {path:'/add-product', name:'AddProduct',element:<ProductForm/>,isMenu:true,isPrivate:true},
    {path:'/edit-product/:id', name:'EditProduct',element:<ProductForm/>,isMenu:true,isPrivate:true},
]