import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Button } from '@chakra-ui/react';
import Model from './Model';



function Flow() {
    const [openModal, setOpenModal] = useState(false);
    const [data, setdata] = useState()
    const url = `https://jsonplaceholder.typicode.com/todo`

    async function fetchData() {
        try {
            const response = await axios.get(url)
            console.log(response.data);
            setdata(response.data)
            setOpenModal(true)

        } catch (error) {
            console.log(error.message);
            setOpenModal(true)
        }
    }


    useEffect(() => {
        fetchData()
    }, [])



    return (
        <div>
            <h1>THis is data</h1>
            <Model
                openModal={openModal}
                data={data &&  data.length > 0 ? `data fetch successfully` : `Data fetch failed`}
                setOpenModal={setOpenModal}
            />
        </div>
    )
}

export default Flow
