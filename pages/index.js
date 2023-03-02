import Link from 'next/link'
import connectDB from '../utils/connectDB'
import User from '../models/UserModel'
connectDB();

const Index = ({ users }) => (
  <>


  <div className='send'>
    <Link href="/transferamount" legacyBehavior>
      <button className="btn edit">Transfer Amount</button>
      </Link>

      <Link href="/adduser" legacyBehavior>
      <button className="btn adduser">Add User</button>
      </Link>
  </div>

    {users.map((user) => (
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
    ))}
  </>
)

/* Retrieves pet(s) data from mongodb database */
export async function getServerSideProps() {
  await connectDB()

  /* find all the data in our database */
  const result = await User.find({})
  //console.log(result)
  const users = result.map((doc) => {
    const user = doc.toObject()
    user._id = user._id.toString()
    return user
  })

  return { props: { users: users } }
}

export default Index