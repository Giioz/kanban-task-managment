export const ElipsisMenu = ({type, setOpenEditModal, setOpenDeleteModal}:any) => {
  return (
     <div
     className={ type === 'Boards' ? 'absolute top-13 right-6' : 
        'absolute top-16 right-4'}
     >

        <div
        className='flex justify-end items-center'
        >

            <div
            className='w-40 text-sm z-50 font-medium shadow-md shadow-[#364e7e1a]
            bg-white dark:bg-[#20212c] space-y-4 py-5 px-4 rounded-lg h-auto pr-12'
            >
                <p
                onClick={() => {
                    setOpenEditModal()
                }}
                className='cursor-pointer dark:text-gray-400 text-gray-700'
                >
                    Edit {type}
                </p>
                <p
                className='cursor-pointer text-red-500'
                onClick={() => {
                    setOpenDeleteModal()
                }}
                >
                    Delete {type}
                </p>

            </div>    

        </div>

     </div>
  )
}
