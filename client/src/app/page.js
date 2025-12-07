"use client";

import React, { useEffect, useState } from 'react'
import axios from "axios";
import ImportLogs from '@/component/ImportLogs';


const Page = () => {

  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchResponse = async () => {
      try {
        const res = await axios.get("http://localhost:9000/api/import-logs");
        setLogs(res.data);
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false);
      }
    };

    fetchResponse();

  }, [])
  return (
    <>
      <div className='min-h-screen bg-gray-50 p-6'>
        <h3 className='text-2xl font-bold mb-6 text-center font-serif text-gray-700'> Knovator Scalable Job Importer</h3>
        {
          loading ? (
            <div className='text-center text-gray-500'> Loading... </div>
          ) : (
            <ImportLogs logs={logs} />
          )
        }
      </div>
    </>
  )
}

export default Page;