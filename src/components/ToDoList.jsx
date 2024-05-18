import React, { useEffect, useState } from 'react'
import Tasks from '@/components/Tasks'

import Add from '@/assets/Add_ring_fill.png'
import ExpandDown from '@/assets/Expand_down.png'
import ExpandUp from '@/assets/Expand_up.png'
import { getDoc, getDocs, collection, doc } from 'firebase/firestore'
import { auth, db } from '@/firebase'


const ToDoList = ({name}) => {
  const [show, setShow] = useState(false)
  const [subcollectionData, setSubcollectionData] = useState([])

  // useEffect(()=> {
    const obtainData = async () => {
      try {
        const currentUser = auth.currentUser;
        const userUID = auth.currentUser.uid
        const docRef = await getDocs(collection(db, "Poro-work-database", "sample", "facets"));
        const subDocRef = docRef.docs.map((doc) => ({...doc.data(), id: doc.id}));
        // docRef.forEach((doc) => {
        //   // doc.data() is never undefined for query doc snapshots
        //   console.log(doc.id, " => ", ...doc.data());
        // });
    
        setSubcollectionData(subDocRef)
        console.log(subDocRef)
      } catch (error) {
        console.log("does not show bro")
      }
    }
    // obtainData();
  // }, [])
  

  return (
    <div className='m-5 rounded-2xl'>
      <div 
      onClick={()=> setShow(!show)} 
      className='flex justify-between gap-2 h-10 px-4 mb-3 bg-stone-[#101000] rounded-2xl items-center'
      >
        <span className='font-semibold'>{name}</span>
        <div className='flex'>
          {!show ? (
            <img src={Add} className='[filter:brightness(30%)] hover:[filter:brightness(100%)]'/>
            ) : (
            ""
            )
          }
          <img src={!show ? (ExpandUp) : (ExpandDown)} onClick={()=> setShow(!show)} className='[filter:brightness(300%)]'/>
        </div> 
      </div>
      {subcollectionData.map((index, document)=> (
        <Tasks key={index} task={document.task} time={document.hour}/>
      ))}
      {/* {!show ? (
        <Tasks/>
      ) : (
        ""
      )
      } */}
    </div>
  )
}

export default ToDoList