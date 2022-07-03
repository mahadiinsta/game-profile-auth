import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { FcGoogle } from 'react-icons/fc'

const providers = [{ name: 'google', icon: <FcGoogle /> }]

const Signin = () => {
  const { data: session, status } = useSession()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { push } = useRouter()
  const handleAuthSignIn = (provider) => signIn(provider)
  if (status === 'loading') {
    return <h1>Checking the authentication</h1>
  }
  if (session) {
    setTimeout(() => {
      push('/')
    }, 5000)
    return <h1>You are already signin</h1>
  }
  const handleEmailLoginSubmit = (e) => {
    e.preventDefault()
    if (!email) return false
    signIn('email', { email, redirect: false })
  }
  return (
    <div className="bg-gradient-to-r from-sky-500 to-indigo-500 h-screen py-[10%]">
      <div className="w-[30%] mx-auto p-10 border">
        <div>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1200px-Google_2015_logo.svg.png"
            alt="Logo"
            className="h-[100px] mx-auto py-2"
          />
        </div>
        <form onSubmit={handleEmailLoginSubmit}>
          <input
            type="email"
            placeholder="Enter a valid Email"
            onChange={(e) => setEmail(e.target.value)}
            className="border px-5 py-2 my-1 w-full"
          />
          <br />
          <input
            type="password"
            placeholder="Enter Password"
            className="border px-5 py-2 my-1 w-full"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button type="submit" className="border px-10 py-1 my-2 w-full">
            Sign in
          </button>
        </form>
        <div class="relative flex py-5 items-center">
          <div class="flex-grow border-t border-gray-400"></div>
          <span class="flex-shrink mx-4 text-gray-400">Or</span>
          <div class="flex-grow border-t border-gray-400"></div>
        </div>
        {providers.map(({ name, icon }, index) => (
          <span>
            <button
              key={index}
              onClick={() => handleAuthSignIn(name)}
              className="border px-10 py-2 w-full flex items-center justify-center gap-x-3 text-lg"
            >
              {icon} Sign in with {name}
            </button>
          </span>
        ))}
      </div>
    </div>
  )
}

export default Signin
