import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'

// import firebase from 'firebase/app'
// import 'firebase/firestore'

// const firebaseConfig = {
//   apiKey: process.env.FIREBASE_GOOGLE_API_KEY,
//   authDomain: process.env.FIREBASE_GOOGLE_AUTH_DOMAIN,
//   projectId: process.env.FIREBASE_GOOGLE_PROJECT_ID,
//   storageBucket: process.env.FIREBASE_GOOGLE_STORAGE_BUCKET,
//   messagingSenderId: process.env.FIREBASE_GOOGLE_MESSANGING_SENDER_ID,
//   appId: process.env.FIREBASE_GOOGLE_APP_ID,
// }

// const firestore = (
//   firebase.apps[0] ?? firebase.initializeApp(firebaseConfig)
// ).firestore()

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'User Email',
          type: 'text',
          placeholder: 'demo@email.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        const res = await fetch('http://localhost:3000/api/login', {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { 'Content-Type': 'application/json' },
        })
        const user = await res.json()

        // If no error and we have user data, return it
        if (res.ok && user) {
          return user
        }
        // Return null if user data could not be retrieved
        return null
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
    // ...add more providers here
  ],
  pages: {
    signIn: '/auth/signin',
    singOut: '/auth/signout',
  },
  // adapter: FirebaseAdapter(firestore),

  //   callbacks: {
  //     async jwt({ token, account }) {
  //       // Persist the OAuth access_token to the token right after signin
  //       if (account) {
  //         token.accessToken = account.access_token
  //       }
  //       return token
  //     },
  //     async session({ session, token, user }) {
  //       // Send properties to the client, like an access_token from a provider.
  //       session.accessToken = token.accessToken
  //       return session
  //     },
  //   },
})
