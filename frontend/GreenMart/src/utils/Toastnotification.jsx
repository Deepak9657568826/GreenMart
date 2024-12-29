import React from 'react'
import { useToast } from '@chakra-ui/react'

function Toastnotification() {
    const toast = useToast()

    const showToast = (title, description, status = 'success') => {
        toast({
            title,
            description,
            status,
            duration: 3000,
            isClosable: true,
            position: 'top-right',
        })
    }
    return {showToast}

}

export default Toastnotification






















