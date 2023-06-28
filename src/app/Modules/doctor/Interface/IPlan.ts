import { IAllergics } from "./IAllergics"
import { IDay } from "./IDay"

export interface IPlan{
    doctorId:string
    Duration :number|null
    CaloriesTo :number
    CaloriesFrom :number
    Days:any[]
    Allergics:IAllergics[]
   
}