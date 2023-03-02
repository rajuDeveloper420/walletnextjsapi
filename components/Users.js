import { useState } from 'react'
import { useRouter } from 'next/router'
import { mutate } from 'swr'

const Users = ({ formId, userForm, forNewUser = true }) => {
  const router = useRouter()
  const contentType = 'application/json'
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')

  const [form, setForm] = useState({
    name: userForm.name,
    username: userForm.username,
    email: userForm.email,
    country: userForm.country,
    currency: userForm.currency,
    wallet: userForm.wallet,
    password: userForm.password,
  })

  /* The PUT method edits an existing entry in the mongodb database. */
  const putData = async (form) => {
    const { id } = router.query

    try {
      const res = await fetch(`/api/users/${id}`, {
        method: 'PUT',
        headers: {
          Accept: contentType,
          'Content-Type': contentType,
        },
        body: JSON.stringify(form),
      })

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status)
      }

      const { data } = await res.json()

      mutate(`/api/users/${id}`, data, false) // Update the local data without a revalidation
      router.push('/')
    } catch (error) {
      setMessage('Failed to update pet')
    }
  }

  /* The POST method adds a new entry in the mongodb database. */
  const postData = async (form) => {
    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: {
          Accept: contentType,
          'Content-Type': contentType,
        },
        body: JSON.stringify(form),
      })

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status)
      }

      router.push('/')
    } catch (error) {
      setMessage('Failed to add user')
    }
  }

  const handleChange = (e) => {
    const target = e.target
    const value =
      target.name === 'poddy_trained' ? target.checked : target.value
    const name = target.name

    setForm({
      ...form,
      [name]: value,
    })
  }

  /* Makes sure pet info is filled for pet name, owner name, species, and image url*/
  const formValidate = () => {
    let err = {}
    if (!form.name) err.name = 'Name is required'
    if (!form.username) err.username = 'username is required'
    if (!form.email) err.email = 'Email is required'
    if (!form.country) err.country = 'Country is required'
    if (!form.currency) err.currency = 'Currency is required'
    if (!form.wallet) err.wallet = 'Wallet is required'
    if (!form.password) err.password = 'Password is required'
    return err
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = formValidate()
    if (Object.keys(errs).length === 0) {
      forNewUser ? postData(form) : putData(form)
    } else {
      setErrors({ errs })
    }
  }

  return (
    <>
      <form id={formId} onSubmit={handleSubmit}>
        
        <div className='form-group'>
            <label htmlFor="name">Name</label>
            <input
            type="text"
            maxLength="20"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            />
        </div>
        <div className='form-group'>
            <label htmlFor="username">Username</label>
            <input
            type="text"
            maxLength="20"
            name="username"
            value={form.username}
            onChange={handleChange}
            required
            />
        </div>

        
        <div className='form-group'>
            <label htmlFor="email">Email</label>
            <input
            type="email"
            maxLength="30"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            />
        </div>

        <div className='form-group'>
            <label htmlFor="country">Country</label>
            <input
            type="text"
            name="country"
            value={form.country}
            onChange={handleChange}
            />
        </div>

        <div className='form-group'>
            <label htmlFor="currency">Currency</label>
            <input
            type="text"
            name="currency"
            checked={form.currency}
            onChange={handleChange}
            />
        </div>

        <div className='form-group'>
            <label htmlFor="wallet">Wallet</label>
            <input
            type="text"
            name="wallet"
            maxLength="60"
            value={form.wallet}
            onChange={handleChange}
            />
        </div>

        <div className='form-group'>
            <label htmlFor="password">Password</label>
            <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            />
        </div>
        <div className='form-group button-box'>
          <button type="submit" className="btn">
            Submit
          </button>
        </div>
      </form>
      <p>{message}</p>
      <div>
        {Object.keys(errors).map((err, index) => (
          <li key={index}>{err}</li>
        ))}
      </div>
    </>
  )
}

export default Users