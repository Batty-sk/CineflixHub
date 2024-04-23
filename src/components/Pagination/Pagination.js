import { NavigateBefore,NavigateNext } from "@mui/icons-material"
import { Box,Button } from "@mui/material"
import { useSelector } from "react-redux";

function Pagination({Pgno,setPage,maxPages}) {
    const currentTheme = useSelector((store)=>store.Theme.theme)

    const handlePageSwitch=(operator)=>{
        if (Pgno == 1 && operator == '-')
                return 
        if ((Pgno == maxPages) && operator=='+')
            return


        switch (operator){

            case '+':
                setPage(Pgno+1)
                break;
            case '-':
                setPage(Pgno-1)

        }
    }
  return (

    <div  className={`flex justify-center  font-extrabold `} style={currentTheme?{filter:'invert(1)'}:{filter:''}}>
    <Box padding={8} >
        <Button startIcon={<NavigateBefore  className="w-10 h-10 "/> } onClick={()=>handlePageSwitch('-')}></Button>  {Pgno} <Button onClick={()=>handlePageSwitch('+')}  endIcon={<NavigateNext  className=" w-10 h-10"/> }></Button>
    </Box>
    </div>
  )
}

export default Pagination