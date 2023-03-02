import { useRouter } from 'next/router'
import useSWR from 'swr'
import Form from '../../components/Users'

const fetcher = (url) =>
  fetch(url)
    .then((res) => res.json())
    .then((json) => json.data)

const EditUser = () => {
  const router = useRouter()
  const { id } = router.query
  const {
    data: user,
    error,
    isLoading,
  } = useSWR(id ? `/api/users/${id}` : null, fetcher)

  if (error) return <p>Failed to load</p>
  if (isLoading) return <p>Loading...</p>
  if (!user) return null

  const userForm = {
    name: user.name,
    username: user.username,
    email: user.email,
    country: user.country,
    currency: user.currency,
    wallet: user.wallet,
  }

  return <Form formId="edit-pet-form" petForm={userForm} forNewUser={false} />
}

export default EditUser