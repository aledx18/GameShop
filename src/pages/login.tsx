/* eslint-disable multiline-ternary */
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
import { useForm } from 'react-hook-form'
import axios from 'axios'

type Inputs = {
  name: string
  password: string
  email: string
}

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>()

  const [variant, setVariant] = useState('login')

  const router = useRouter()

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === 'login' ? 'signup' : 'login'
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

  const signup = useCallback(
    async (name: string, email: string, password: string) => {
      try {
        await axios.post('/api/register', {
          name,
          password,
          email
        })
      } catch (error) {
        console.log(error)
      }
    },
    []
  )

  const login = useCallback(async (email: string, password: string) => {
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
  }, [])

  function onSubmit(data: Inputs) {
    console.log(data)

    if (variant === 'login') {
      login(data.email, data.password)
    } else {
      signup(data.name, data.email, data.password)
    }
  }
  // bg-[#1b1b1d]
  return (
    <div className='flex min-h-full items-center justify-center py-14 px-4 min-[250px]:mt-20 sm:px-6 lg:px-8'>
      <div className='w-full max-w-sm space-y-8'>
        <div className='flex w-full max-w-md flex-col rounded-lg px-4 py-8 shadow-2xl dark:bg-[#1b1b1d] dark:shadow-lg sm:px-6 md:px-8 lg:px-10'>
          <div className='mb-6 self-center text-2xl font-bold tracking-tight text-grisOne dark:text-white sm:text-2xl '>
            {variant === 'login' ? 'Login to your Account' : 'Register'}
          </div>

          <div className='mt-4'>
            <form autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
              {variant === 'signup' && (
                <div className='mb-2 flex flex-col'>
                  <div className='relative flex '>
                    <span className='inline-flex items-center rounded-l-md border-t border-l border-b border-gray-300 bg-white px-3 text-sm text-gray-500 shadow-sm'>
                      <IconUser />
                    </span>
                    <input
                      type='text'
                      id='sign-in-name'
                      {...register('name', { required: true })}
                      className={`w-full flex-1 appearance-none rounded-r-lg border dark:bg-grisOne dark:text-white ${
                        errors.name
                          ? 'border-red-400 focus:ring-1 focus:ring-red-400 '
                          : 'border-gray-300 focus:ring-1 focus:ring-gray-500 dark:border-grisTwo'
                      } bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none `}
                      placeholder='Your name'
                    />
                  </div>
                  {errors.name && (
                    <span className='pt-0.5 text-xs font-thin text-white'>
                      This field is required
                    </span>
                  )}
                </div>
              )}

              <div className='mb-2 flex flex-col'>
                <div className='relative flex '>
                  <span className='inline-flex items-center rounded-l-md border-t border-l border-b border-gray-300 bg-white  px-3 text-sm text-gray-500 shadow-sm'>
                    <IconMail />
                  </span>
                  <input
                    type='text'
                    {...register('email', { required: true })}
                    id='sign-in-email'
                    className={`w-full flex-1 appearance-none rounded-r-lg border  dark:bg-grisOne dark:text-white ${
                      errors.email
                        ? 'border-red-400 focus:ring-1 focus:ring-red-400 '
                        : 'border-gray-300 focus:ring-1 focus:ring-gray-500 dark:border-grisTwo'
                    } bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none `}
                    placeholder='Your email'
                  />
                </div>
                {errors.email && (
                  <span className='pt-0.5 text-xs font-thin text-white'>
                    This field is required
                  </span>
                )}
              </div>

              <div className='mb-4 flex flex-col'>
                <div className='relative flex '>
                  <span className='inline-flex items-center  rounded-l-md border-t border-l border-b border-gray-300 bg-white  px-3 text-sm text-gray-500 shadow-sm'>
                    <IconPass />
                  </span>
                  <input
                    type='password'
                    id='sign-in-password'
                    {...register('password', { required: true })}
                    className={`w-full flex-1 appearance-none rounded-r-lg border dark:bg-grisOne dark:text-white ${
                      errors.password
                        ? 'border-red-400 focus:ring-1 focus:ring-red-400 '
                        : 'border-gray-300 focus:ring-1 focus:ring-gray-500 dark:border-grisTwo'
                    } bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none `}
                    placeholder='Your password'
                  />
                </div>
                {errors.password && (
                  <span className='pt-0.5 text-xs font-thin text-white'>
                    This field is required
                  </span>
                )}
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

          <div className='flex items-center justify-center py-6'>
            <div className='h-px flex-1 bg-grisOne dark:bg-gray-700 sm:w-16' />
            <p className='px-3 text-sm text-blackFondo dark:text-grisClaro'>
              Login with social accounts
            </p>
            <div className='h-px flex-1 bg-grisOne dark:bg-gray-700 sm:w-16' />
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
          <div className='my-4 flex items-center justify-center'>
            <div className='inline-flex items-center text-center text-xs font-extralight'>
              <p className='text-md text-blackFondo dark:text-white'>
                {variant === 'login'
                  ? 'First time?'
                  : 'Already have an account?'}
                <span
                  onClick={toggleVariant}
                  className=' text-md ml-1 cursor-pointer font-semibold hover:text-grisClaro'
                >
                  {variant === 'login' ? 'Create an account' : 'Login'}
                </span>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
