import React from 'react'
import pb from '../lib/pocketbase';
import {useMutation} from 'react-query'


const useLogin = () => {
  async function login(data) {
      const authData = await pb
      .collection('users')
      .authWithPassword(data.email, data.password);     
  }
  return useMutation(login)
}

export default useLogin