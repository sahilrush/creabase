"use client";




import React, { useTransition } from 'react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation';



const NewDocumentButton = () => {
 const [isPending, startTransition] = useTransition();
 const router = useRouter();  
 

   const handleCreateNewDocument = () => {
    startTransition(async () => {
    const {docId} = await createNewDocument();
    router.push('/doc/${docId}');
    });
   };



  return (
    <Button onClick={handleCreateNewDocument} disabled={!isPending}>{isPending ? "creating..." : "New Document"}</Button>
 )
}


export default NewDocumentButton