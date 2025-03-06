"use client"
import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/react'
import { AiOutlineHome, AiOutlineUser } from 'react-icons/ai'
import React, { useEffect, useState } from 'react'

const Navbar = () => {
  const [showModel, setShowModel] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { data: session } = useSession()

  const toggleModel = () => setShowModel((prev) => !prev)

  useEffect(() => {
    window.onscroll = () => {
      setIsScrolled(window.pageYOffset === 0 ? false : true)
      return () => (window.onscroll = null)
    }
  }, [])

  
  return (
    <div
      className={`fixed z-50 h-16 w-full top-0 left-0 ${
        isScrolled ? 'shadow-md backdrop-blur' : ''
      }`}
    >
      <div className="h-full w-2/3 mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 transition-all">
          <h1
            className={`${
              isScrolled ? 'text-blue-600' : 'text-[#cec7c7]'
            } text-2xl font-bold`}
          >
            TravelGudi
          </h1>
          <AiOutlineHome
            size={25}
            color={`${isScrolled ? 'rgb(37 99 235)' : '#cec7c7'}`}
          />
        </Link>

        {/* User Icon */}
        <div>
          <div className="cursor-pointer" onClick={toggleModel}>
            <AiOutlineUser
              size={30}
              color={`${isScrolled ? 'rgb(37 99 235)' : '#cec7c7'}`}
            />
          </div>
          {showModel && (
            <div
              onClick={toggleModel}
              className="absolute top-16 right-[270px] shadow-md flex flex-col gap-4 p-4 bg-white rounded-xl"
            >
              {/* If user is logged in */}
              {session ? (
                <>
                  {session?.user?.isAdmin && (
                    <Link
                      className="bg-red-500 text-white px-1 py-2 rounded-xl"
                      href="/admin/dashboard"
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  {session?.user?.isAdmin && (
                    <Link
                      className="bg-blue-500 text-white px-1 py-2 rounded-xl"
                      href="/create"
                    >
                      listing hotel
                    </Link>
                  )}
                  <Link href="/reservations">Reservations</Link>
                  <button
                    onClick={() => signOut()}
                    className="text-slate-500 text-center"
                  >
                    Logout
                  </button>
                </>
              ) : (
                // If user is not logged in
                <button
                  onClick={() => signIn()}
                  className="text-blue-500 text-center"
                >
                  Login
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar



// "use client"
// import Link from 'next/link'
// import { signOut, useSession } from 'next-auth/react'
// import { AiOutlineHome, AiOutlineUser } from 'react-icons/ai'
// import React, { useEffect, useState } from 'react'

// const Navbar = () => {

//   const [showModel, setShowModel] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const { data: session } = useSession()

//   const toggleModel = () => setShowModel(prev => !prev)

//   useEffect(() => {
//     window.onscroll = () => {
//       setIsScrolled(window.pageYOffset === 0 ? false : true)
//       return () => (window.onscroll = null)
//     }
//   }, [])


//   return (
//     <div className={`fixed z-50 h-16 w-full top-0 left-0 ${isScrolled ? "shadow-md backdrop-blur" : ""} `}>
//       <div className="h-full w-2/3 mx-auto flex items-center justify-between">
//         <Link href="/" className='flex items-center gap-2 transition-all'>
//           <h1 className={`${isScrolled ? "text-blue-600" : "text-[#cec7c7]"} text-2xl font-bold`}>
//             TravelGudi
//           </h1>
//           <AiOutlineHome 
//             size={25}
//             color={`${isScrolled ? "rgb(37 99 235)" : "#cec7c7"}`}
//           />
//         </Link>
//         <div>
//           <div className="cursor-pointer" onClick={toggleModel}>
//             <AiOutlineUser 
//               size={30}
//               color={`${isScrolled ? "rgb(37 99 235)" : "#cec7c7"}`}
//             />
//           </div>
//           {showModel && (
//             <>
//               <div 
//                 onClick={toggleModel}
//                 className="absolute top-16 right-[270px] shadow-md flex flex-col gap-4 p-4 bg-white rounded-xl"
//               > 
//                 {session?.user?.isAdmin &&
//                   <Link className="bg-red-500 text-white px-1 py-2 rounded-xl" href='/admin/dashboard'>
//                       Admin Dashboard
//                   </Link>
//                 }
//                 <Link href="/reservations">
//                     Reservations
//                 </Link>
//                 <button onClick={() => signOut()} className="text-slate-500 text-center">
//                     Logout
//                 </button>
//               </div>
//             </>
//           )}
//         </div>

//       </div>
//     </div>
//   )
// }

// export default Navbar