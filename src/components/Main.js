import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
function Main() {
  const currentTheme = useSelector((store)=>store.Theme.theme)

    //console.log('data',data)
  return (
    <div className={`sm:pl-[140px] sm:pt-32 sm:pr-10 pt-36 sm:ml-52 pl-5 pr-5  ${currentTheme?'bg-[#121313]':''}`} >
        <div className='flex justify-center flex-wrap items-center'>
        <Outlet />
        </div>
    </div>
  )
}

export default Main