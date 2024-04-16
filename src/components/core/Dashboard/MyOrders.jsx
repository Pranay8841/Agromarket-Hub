import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const MyOrders = () => {
    const {token} = useSelector((state) => state.auth)

    const navigate = useNavigate();

    const [myOrders, setMyOrders] = useState(null);

    
  return (
    <div>
      
    </div>
  )
}

export default MyOrders
