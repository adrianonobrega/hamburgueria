import { Header } from '../components/Header'
import { Product } from '../components/Product'
import { Cart } from '../components/Cart'
import { useEffect, useState } from 'react'
import { Api } from '../services/api'

interface IItem {
    amount:number
    product:{
        category:string
        img:string
        name:string
        price:string
    }
}

interface IOrders {

    id: string | undefined
    status: string | undefined
    name: string | undefined
    items: IItem[] | undefined

}



const OrderInitial = {
    order: [
        {
            id: '',
            name: '',
            status: '',
            total: '',
            items: []
        }
    ],
    setOrders: () => { },
}
export default function Home() {

    const [orders, setOrders] = useState(OrderInitial.order)
    const [modal,setModal] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem('token')
        Api.get('orders', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                setOrders(res.data)
                console.log(res.data)
            })
            .catch((err) => console.log(err))
    }, [])

    function ItemOpen(){
        setModal(true)
    }

    return (
        <>
            <Header />
            <div>
            {orders.map((item) => (
                
                
                <div onClick={ItemOpen} className='flex'>
                <h2>Cliente - {item.name}</h2>
                <h2>Status - {item.status}</h2>
                <h2>{item.total}</h2>
                {
                    modal === true && (
                        <div>
                    <ul>
                    {item.items.map((item:IItem) => (
                        <li>
                            <p>Produto - {item.product.name}</p>
                            <p>Quantidade - {item.amount}</p>
                        </li>
                    ))}
                    </ul>
                </div>
                    )
                }
                
                
                
                </div>
                
                
            ))}
            </div>

        </>
    )
}
