import React from 'react'
import AddNewButton from '@/modules/dashboard/components/add-new'
import AddRepo from '@/modules/dashboard/components/add-repo'
import { getAllPlayGroundDataForUsers } from '.'
import { Empty } from '@/components/ui/empty'
import EmptyState from '@/modules/dashboard/components/empty-state'
import ProjectTable from '@/modules/dashboard/components/project-table'

const Page = async() => {
  const playground = await getAllPlayGroundDataForUsers();
  return (
    <div className='flex flex-col justify-start items-center min-h-screen mx-automax-w-7x1 px-4 py-10'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 w-full'>
        <AddNewButton/>
        <AddRepo />
      </div>
      <div className=''>
    {
      playground && playground.length === 0 ?(
      <EmptyState/>
    ) :
     (
      <ProjectTable
      projects={playground || []}
      onDeleteProject={()=>{}}
          onUpadteProject={()=>{}}
          onDuplicateProject={()=>{}}
      
      />
     ) // if there no any
    }
      </div>
    </div>
  )

}

export default Page