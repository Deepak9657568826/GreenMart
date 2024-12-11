import { useToast } from '@chakra-ui/react'
import React, { useEffect } from 'react'

function SuccessToast() {
    const toast = useToast()

    useEffect(() => {
        toast({
            title: 'product update successfully',
            description: "product update successfully",
            status: 'success',
            duration: 3000,
            isClosable: true,
            position: 'top-right',
        })
    }, [])
    return (
        <div>
            
        </div>
    )
}

export default SuccessToast
