import React from 'react'
import pb from '../lib/pocketbase';

const useLogout = () => {
    function logout() {
        pb.authStore.clear();
        window.location.reload(false);
    }
    return logout
}

export default useLogout