import {Link} from "react-router-dom"
import {toast} from "react-toastify";
import axios from "axios";
import Swal from "sweetalert2"
import {VITE_BACKEND_URL} from "../App"


const Product = ({item , getProducts}) =>{

    const deletePrtoduct = async (id)=>{

        const result = await Swal.fire({
            title: "Do you really want to delete the product?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor:"#3885d6",
            cancelButtonColor:"#d33",
            confirmButtonText: "Yes, delete it!"

        })

        if(result.isConfirmed){
            try{
                await axios.delete(`${VITE_BACKEND_URL}/api/products/${id}`)
                toast.success("Deleted the product successfully")
                getProducts()
                
            }catch(error){
                toast.error(error.message);
            }
        }


    }



    return (
     <div className="bg-white rounded shadow-lg overflow-hidden">
        <img src = {item.image} className="w-full h-28 object-cover"/>
        <div className="px-4 pt-2 pb-4">
            <h2 className="text font-semibold">{item.name}</h2>
            <div className="test-sm">Quantity: {item.quantity} </div>
            <div className="text-sm">Price ${item.price}</div>
            <div className="mt-3 flex gap-4">
              <Link to={`/edit/${item._id}`} className="inline-block w-full text-center shadow-md text-sm bg-gray-700 text-whiterounded0-sm px-4 py-1 font-bold hover:bg-gray-600 hover:cursor-pointer">Edit </Link>
              <button onClick={()=> deletePrtoduct(item._id)} className="inline-block w-full text-center shadow-md text-sm bg-red-700 text-whiterounded0-sm px-4 py-1 font-bold hover:bg-red-600 hover:cursor-pointer">Delete </button>
            </div>
        </div>

    </div>)
}

export default Product