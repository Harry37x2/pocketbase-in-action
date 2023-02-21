import React from 'react'
import pb from '../lib/pocketbase';
import {useQuery} from 'react-query'

const useVerified = () => {  
    const id = pb.authStore.model?.id;
    async function checkVerified() {
        if(id!==undefined){
            const userData = await pb
                .collection('users')
                .getOne(id)
            return userData.verified;
        }
        return false
    }
    return useQuery({queryFn: checkVerified, queryKey:['check-verified', id]})
}

export async function requestVerification() {
    const email = pb.authStore.model.email;
    const res = await pb
        .collection('users')
        .requestVerification(email)
    if(res) alert('Veri mail sent-> check email')
}

export default useVerified