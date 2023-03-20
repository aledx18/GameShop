import { NextPageContext } from 'next'
import { getSession } from 'next-auth/react'
import useCurrentUser from '@/components/useCurrentUser'

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}

export default function User() {
  const query = useCurrentUser()

  return (
    <div className='text-2xl font-medium text-white'>
      Hola {query.data?.data.name}
    </div>
  )
}
