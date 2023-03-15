/* eslint-disable multiline-ternary */
import axios from 'axios'
import {
  IconMail,
  IconPass,
  IconUser,
  IconGithub,
  IconGoogle
} from '@/components/icons/icons'
import { useCallback, useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'

export default function Login() {
  const [variant, setVariant] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const router = useRouter()

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === 'login' ? 'register' : 'login'
    )
  }, [])

  // Github Login
  async function handleGithubSignin() {
    signIn('github', { callbackUrl: '/' })
  }
  // Google Login
  async function handleGoogleSignin() {
    signIn('google', { callbackUrl: '/' })
  }

  const register = useCallback(async () => {
    try {
      await axios.post('/api/register', {
        name,
        password,
        email
      })
    } catch (error) {
      console.log(error)
    }
  }, [email, name, password])

  const login = useCallback(async () => {
    try {
      await signIn('credentials', {
        email,
        password,
        redirect: false,
        callbackUrl: '/'
      })
      router.push('/')
    } catch (error) {
      console.log(error, 'dasd')
    }
  }, [email, password, router])

  function handdleSubmit(eve: any) {
    eve.preventDefault()
    if (variant === 'login') {
      console.log('login')
      login()
    } else {
      console.log('register')
      register()
    }
  }

  return (
    <div className='flex min-h-full items-center justify-center py-12 px-4 min-[250px]:mt-20 sm:px-6 lg:px-8'>
      <div className='w-full max-w-sm space-y-8'>
        <div className='flex w-full max-w-md flex-col rounded-lg bg-[#1b1b1d] px-4 py-8 shadow-lg sm:px-6 md:px-8 lg:px-10'>
          <div className='mb-6 self-center text-2xl font-bold tracking-tight text-white sm:text-2xl '>
            {variant === 'login' ? 'Login to your Account' : 'Register'}
          </div>

          <div className='mt-4'>
            <form autoComplete='off' onSubmit={handdleSubmit}>
              {variant === 'register' && (
                <div className='mb-2 flex flex-col'>
                  <div className='relative flex '>
                    <span className='inline-flex items-center rounded-l-md border-t border-l border-b border-gray-300 bg-white  px-3 text-sm text-gray-500 shadow-sm'>
                      <IconUser />
                    </span>
                    <input
                      type='text'
                      id='sign-in-name'
                      value={name}
                      onChange={(e: any) => setName(e.target.value)}
                      className=' w-full flex-1 appearance-none rounded-r-lg border border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-gray-500'
                      placeholder='Your name'
                    />
                  </div>
                </div>
              )}

              <div className='mb-2 flex flex-col'>
                <div className='relative flex '>
                  <span className='inline-flex items-center rounded-l-md border-t border-l border-b border-gray-300 bg-white  px-3 text-sm text-gray-500 shadow-sm'>
                    <IconMail />
                  </span>
                  <input
                    type='text'
                    value={email}
                    onChange={(e: any) => setEmail(e.target.value)}
                    id='sign-in-email'
                    className=' w-full flex-1 appearance-none rounded-r-lg border border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-gray-500'
                    placeholder='Your email'
                  />
                </div>
              </div>

              <div className='mb-4 flex flex-col'>
                <div className='relative flex '>
                  <span className='inline-flex items-center  rounded-l-md border-t border-l border-b border-gray-300 bg-white  px-3 text-sm text-gray-500 shadow-sm'>
                    <IconPass />
                  </span>
                  <input
                    type='password'
                    id='sign-in-password'
                    value={password}
                    onChange={(e: any) => setPassword(e.target.value)}
                    className=' w-full flex-1 appearance-none rounded-r-lg border border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-gray-500'
                    placeholder='Your password'
                  />
                </div>
              </div>

              <div className='mb-2 flex items-center'>
                {variant === 'login' && (
                  <div className='ml-auto flex'>
                    <a
                      href='#'
                      className='inline-flex text-xs font-thin text-white hover:text-gray-200 sm:text-sm '
                    >
                      Forgot Your Password?
                    </a>
                  </div>
                )}
              </div>
              <div className='flex w-full'>
                <button
                  type='submit'
                  className='focus:ring-offset-gren-200 w-full  rounded-lg bg-sky-400 py-2 px-4 text-center text-base font-semibold text-white shadow-md transition duration-200 ease-in hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-blue-500  focus:ring-offset-2 '
                >
                  {variant === 'login' ? 'Sign in' : 'Sign up'}
                </button>
              </div>
            </form>
          </div>
          <div className='my-4 flex items-center justify-center'>
            <div className='inline-flex items-center text-center text-xs font-thin'>
              <p className='text-md text-white'>
                {variant === 'login'
                  ? 'First time?'
                  : 'Already have an account?'}
                <span
                  onClick={toggleVariant}
                  className=' text-md ml-1 cursor-pointer font-semibold hover:text-gray-400'
                >
                  {variant === 'login' ? 'Create an account' : 'Login'}
                </span>
                .
              </p>
            </div>
          </div>
          <div className='flex items-center justify-center py-2'>
            <p className='text-xs font-thin'>o</p>
          </div>
          <div className='item-center flex flex-col text-center'>
            <button
              type='button'
              onClick={handleGithubSignin}
              className='mr-2 mb-2 inline-flex items-center justify-center rounded-lg bg-[#24292F] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-[#24292F]/90 focus:outline-none focus:ring-4 focus:ring-[#24292F]/50 dark:focus:ring-gray-500'
            >
              <IconGithub />
              Sign in with Github
            </button>
            <button
              type='button'
              onClick={handleGoogleSignin}
              className='focus:ring-[#4285F4]/55 mr-2 mb-2 inline-flex items-center justify-center rounded-lg bg-[#ee5045] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-[#ee5045]/90 focus:outline-none focus:ring-4 focus:ring-[#ee5045]/50'
            >
              <IconGoogle /> Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
