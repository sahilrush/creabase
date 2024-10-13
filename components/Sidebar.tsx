"use client";

import React, { useEffect, useState } from 'react'
import NewDocumentButton from './NewDocumentButton'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { MenuIcon } from 'lucide-react'
import {useCollection} from "react-firebase-hooks/firestore"
import { CollectionGroup } from 'firebase-admin/firestore'
import { collectionGroup, DocumentData, query, where } from 'firebase/firestore'
import { useUser } from '@clerk/nextjs'
import { db } from '@/firebase'



interface RoomDocument extends DocumentData {
  createdAt: Date;  
  roomId: string; 
  userId: string;
  role: "owner" | "editor";

}
  

const Sidebar = () => {  
  const {user} = useUser();
  const [grorpedData, setGroupedData] = useState<{
    owner: RoomDocument[];
    editor: RoomDocument[];
  }>({
    owner:[],
    editor:[]
  })

  const [data, loading , error] = useCollection(
    user && 
    query(
      collectionGroup(db, "rooms"),
      where("userId", "==", user.emailAddresses[0].toString())
    )

  );



  useEffect(() => {

    if (!data) return;

    const grouped = data.docs.reduce<{
      owner: RoomDocument[];
      editor: RoomDocument[]; 
    }>(
      (acc, curr) => {
        const roomData = curr.data() as RoomDocument;
        if (roomData.role === "owner") {
          acc.owner.push({
            id: curr.id,
            ...roomData,
          });
        }else {
          acc.editor.push ({
            id:curr.id,
            ...roomData,
          })
        }
        return acc;  
      }, {
        owner: [],
        editor: [], 
      }
    )

    setGroupedData(grouped);
  },[data])
    const menuOptions = (
        <>
        <NewDocumentButton />
       {/*My documents */}
      

     <div className='flex py-4 flex-col space-y-4 md:max-w-36'>
       {grorpedData.owner.length === 0 ? (
        <h2 className='text-gray-500 font-semibold text-sm'>
          No documents found
        </h2>
       ):(
        
        <>
        <h2 className='text-gray-500 font-semibold text-sm'>
          my Document
        </h2>
        {grorpedData.owner.map((doc) => (
          <p>(doc.roomId)</p>
        ))}
        </>

       )}
       </div>
       {/* lists.. */}
       {/* shared with me*/}
         {/*lists */}        
        </> 

    );
  return ( 
    <div className='p-2 md:p-5 bg-gray-200 relative'>
        <div className='md:hidden'>
        <Sheet>
  <SheetTrigger>
    <MenuIcon/>
  </SheetTrigger>
  <SheetContent side="left">
    <SheetHeader>  
      <SheetTitle>Menu</SheetTitle>
      <div>
        {menuOptions}
      </div>
    </SheetHeader>
  </SheetContent>
</Sheet>
</div>

             <div className='hidden md:inline'>
            {menuOptions}
             </div>
    </div>
  )
}

export default Sidebar    