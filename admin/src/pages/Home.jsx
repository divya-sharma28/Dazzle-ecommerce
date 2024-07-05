import React, { useEffect, useState   } from 'react'
import '../styles/Home.css'
import WidgetSm from '../components/WidgetSm'
import WidgetLg from '../components/WidgetLg'
import { userRequest } from '../requestMethods'

const Home = () => {

  const [users, setUsers] = useState([])

  useEffect(() => {
    const getUsers = async () => {

      const res = await userRequest.get('/user/all?new=true')
      try {
        setUsers(res.data.data)

      } catch (error) {
        console.error(error)
      }
    }

    getUsers()
  }, [])

  return (
    <div className='home'>
      <div className="homeWidgets">
        <WidgetSm users={users} />
        <WidgetLg />
      </div>
    </div>
  )
}

export default Home