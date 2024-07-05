import React,{useState,useEffect} from 'react'
import '../styles/WidgetLg.css'
import {format} from 'timeago.js'
import { userRequest } from '../requestMethods'

const WidgetLg = () => {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const getOrders = async () => {

      const res = await userRequest.get('/order/all')

      const sortedOrders = res.data.data.sort((a, b) =>  new Date(b.createdAt) - new Date(a.createdAt)); 
      try {
        setOrders(sortedOrders)

      } catch (error) {
        console.error(error)
      }
    }

    getOrders()
  }, [])
    const Button = ({type}) =>{
      return <button className={`widgetLgButton ${type}`}>{type}</button>
    }
  return (
    <div className="widgetLg">
    <h3 className="widgetLgTitle">Latest transactions</h3>
    <table className="widgetLgTable">
      <thead>
      <tr className="widgetLgTr">
        <th className="widgetLgTh">ProductID</th>
        <th className="widgetLgTh">Date</th>
        <th className="widgetLgTh">Amount</th>
        <th className="widgetLgTh">Status</th>
      </tr>
      </thead>
      <tbody>
        {orders?.map((order,index) =>(  
          order.products.map((prod)=>(
            <tr className="widgetLgTr" key={index}>
            <td className="widgetLgUser">
              <span className="widgetLgName">{prod.productID}</span>
            </td>
            <td className="widgetLgDate">{format(order.createdAt)}</td>
            <td className="widgetLgAmount">₹ {order.totalAmount}</td>
            <td className="widgetLgStatus">
              <Button type={prod.status}/>
            </td>
          </tr>
          ))
       ))}
      </tbody>

    </table>
  </div>  )
}

export default WidgetLg