import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

const Header = () => {
  const { push, asPath } = useRouter()
  const { data: session } = useSession()
  const handleSignOut = async () => {
    const data = await signOut({ redirect: false, callbackUrl: '/' })
    push(data.url)
  }
  const handleSignIn = () => push(`/auth/signin?callbackUrl=${asPath}`)
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '10px 20px',
        alignItems: 'center',
      }}
    >
      <h1 className="text-3xl text-grey-500 font-semibold">Gamers Profile</h1>
      <button
        // style={{
        //   height: '30px',
        //   borderRadius: '10px',
        //   padding: '15px 30px',
        //   display: 'flex',
        //   justifyContent: 'center',
        //   alignItems: 'center',
        //   backgroundColor: 'green',
        //   color: '#fff',
        //   border: 'none',
        // }}
        className="px-5 py-2 bg-green-400 text-white rounded-lg"
        onClick={() => (session ? handleSignOut() : handleSignIn())}
      >{`${session ? 'Logout' : 'Login'}`}</button>
    </div>
  )
}

export default Header
