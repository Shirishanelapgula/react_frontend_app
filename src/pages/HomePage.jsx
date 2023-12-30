import { useEffect, useState } from "react";
import {Link} from "react-router-dom"
import axios from "axios";
import Product from "../components/Product";
import {VITE_BACKEND_URL} from "../App"


const HomePage= ()=>{

    const [Products , setProducts]= useState([])
    const [isLoading, setIsLoading] = useState(false)

    const getProducts = async ()=>{
        try{
            setIsLoading(true)
            const response = await axios.get(`${VITE_BACKEND_URL}/api/products`)
            console.log(response.data)
            setProducts(response.data)
            setIsLoading(false)

        }catch(error){
            console.log(error)
        }
    }
 useEffect(()=>{
    getProducts();
 },[])

    return(
        <div>
            <div>
                <Link to="/create" className="inline-block mt-4 shadow-md bg-blue-700 text-white rounded-sm px-4 py-3 font-bold hover:bg-blue-600 hover:cursor-pointer">Create a Product</Link>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
            {isLoading ? ("Loading...." ): 
            (<>
            {Products.length >0 ? (
            <>
            {Products.map((item,index) =>{
                return (
                <div className="p-2" key={index}>

                   {<Product key = {index} item = {item} getProducts = {getProducts}/>}

                </div>)

            })}
            </>) 
            : <div className="text-black font-bold">No products Found</div>}
             
            </>)
            }
            </div>
        </div>
    )
}

export default HomePage;