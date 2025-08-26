import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getAuthUser } from '../lib/api'

const useAuthUser = () => {
   const authUser = useQuery({
    queryKey:['authUser'],
    queryFn: getAuthUser,
    retry:false,
  })
  
  // Add this console log to debug
  console.log('useAuthUser Debug:', {
    isLoading: authUser.isLoading,
    data: authUser.data,
    user: authUser.data?.user,
    error: authUser.error
  });
  
  return {
    isLoading: authUser.isLoading, 
    authUser: authUser.data?.user // This might need to be just authUser.data
  }
}

export default useAuthUser