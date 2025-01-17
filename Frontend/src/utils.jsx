import { toast } from "react-toastify";

export const handelSuccess = (msg) =>{
    toast.success(msg,{
        position:'top-left'
    })
}

export const handelError = (msg) =>{
    toast.error(msg,{
        position:'top-left'
    })
}
