import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import connectDB from '../../utils/connectDB'
import User from '../../models/UserModel'

/* Allows you to view pet card info and delete pet card*/
const UserPage = ({ user }) => {
  const router = useRouter()
  const [message, setMessage] = useState('')
  const handleDelete = async () => {
    const userID = router.query.id

    try {
      await fetch(`/api/users/${userID}`, {
        method: 'Delete',
      })
      router.push('/')
    } catch (error) {
      setMessage('Failed to delete the users.')
    }
  }

  return (
    <div key={user._id}>
        <div className="card">
        <h5 className="pet-name">Name : {user.name}</h5>
        <div className="main-content">
            <p className="pet-name">Username : {user.username}</p>
            <p className="owner">Email: {user.email}</p>
            <p className="owner">Country: {user.country}</p>
            <p className="owner">Currency: {user.currency}</p>
            <p className="owner">Wallet: {user.wallet}</p>

            <div className="btn-container">
            <Link href="/[id]/edit" as={`/${user._id}/edit`} legacyBehavior>
                <button className="btn edit">Edit</button>
            </Link>
            <Link href="/[id]" as={`/${user._id}`} legacyBehavior>
                <button className="btn view">View</button>
            </Link>
            </div>
        </div>
        </div>
    </div>
  )
}

export async function getServerSideProps({ params }) {
  await connectDB()

  const user = await User.findById(params.id).lean()
  user._id = user._id.toString()

  return { props: { user } }
}

export default UserPage