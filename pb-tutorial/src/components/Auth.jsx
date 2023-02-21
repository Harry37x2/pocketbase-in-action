import pb from '../lib/pocketbase'
import {useForm} from 'react-hook-form'
import useLogout from '../hooks/useLogout';
import useLogin from '../hooks/useLogin';
import useVerified, {requestVerification} from '../hooks/useVerified';

export default function Auth() {
  const logout = useLogout();
  const{ data: isVerified } = useVerified();
  const {mutate: login, isLoading, isError} = useLogin();
  const { register, handleSubmit, reset} = useForm();

  const isLoggedIn = pb.authStore.isValid;

  async function onSubmit(data) {    
    logout({email: data.email, password: data.password})
    reset();
  }

  if(isLoggedIn)
  return (
    <>
      <h1>Logged In: {pb.authStore.model.email}</h1>
      <p>Verified:{isVerified?.toString()}</p>
      {!isVerified && <button onClick={requestVerification}>Send verification email</button>}
      <button onClick={onSubmit}>Log Out</button>
    </>
  )

  return (
    <>
        {isLoading && <p>Loading...</p>}
        {isError && <p>Invalid email or password</p>}
        <h1>Please Log In</h1>
        <form onSubmit={handleSubmit(login)}>
          <input 
            type='text' 
            placeholder='email'
            {...register('email')}
          />
          <input 
            type='password' 
            placeholder='password'
            {...register('password')}
          />
          <button type='submit' disabled={isLoading}>Login</button>
        </form>
    </>
  )
}