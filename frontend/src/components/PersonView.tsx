import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import {useState } from "react";
import { z } from "zod";

const schema = z.object({
    id: z.string().min(1,"ID is a required field").regex(/[0-9]/,"ID must be an integer")
})

type FormFields = z.infer<typeof schema>;



// TASK 4
export default function PersonView() {
    const form = useForm<FormFields>({ resolver: zodResolver(schema) });
    const { register, handleSubmit, formState } = form;
    const { errors } = formState;
    const [isViewClicked , setIsViewClicked] = useState(false);
    const [personInfo, setPersonInfo] = useState<any>(null); 


    const onSubmit: SubmitHandler<FormFields> = async (data: FormFields) => {
        setIsViewClicked(true)
        setPersonInfo(null);
        try {
            const url = `http://localhost:8080/people/${data.id}`
            const response = await fetch(url, {
                method: "GET",
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                const json = await response.json();
                setPersonInfo(json)
                console.log("Success:", json);
            } else if (response.status === 404) {
                console.error("Person not found: Invalid ID entered");
            } else {
                console.error("Request failed:", response.status, response.statusText);
            }
        }catch (error) {
            console.log(error)
        }
        
    }

    return (
    
        <div className="w-100 mx-auto p-6 bg-gray-100 rounded-md shadow-md mt-10 h-[215px]">
        <h2 className="text-xl font-bold mb-4 text-center text-red-500">View your information:</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">

            {/* <label>Enter an ID:</label> */}
            <label className="font-medium text-black" htmlFor="ID">Enter an ID:</label>
            <input type="text" {...register("id")} placeholder="6" 
                className="text-black"/>
            <p className={"text-red-400"}>{errors.id?.message}</p>

            {/* <button>View</button> */}
            <div className="flex justify-center mt-2">
                <button 
                type="submit" 
                className="w-36 bg-red-500 text-white py-1 px-2 rounded-md hover:bg-green-600">View
               
                </button>
            
            </div>

            {/* {isViewClicked && personInfo && (
            <div className="w-96 mx-auto p-6 bg-gray-100 rounded-md shadow-md mt-10 h-[300px]">
                <h2 className="text-xl font-bold mb-4 text-center text-red-500">Your details:</h2>
                <label className="font-medium text-black" htmlFor="ID">ID: {personInfo.id}</label> <br />
                <label className="font-medium text-black" htmlFor="firstName">First Name: {personInfo.firstName}</label>  <br />
                <label className="font-medium text-black" htmlFor="lastName">Last Name: {personInfo.lastName}</label>  <br />
                <label className="font-medium text-black" htmlFor="dob">Date of Birth: {personInfo.dateOfBirth}</label>  <br />
                <label className="font-medium text-black" htmlFor="Email">Email: {personInfo.emailAddress}</label>  <br />
                <label className="font-medium text-black" htmlFor="PhoneNum">Phone Number: {personInfo.phoneNum}</label>  <br />
                <label className="font-medium text-black" htmlFor="address:">Address: {personInfo.address}</label> 
                
            </div> 
            )} */}

            {isViewClicked && (
                <div className="w-96 mx-auto p-6 bg-gray-100 rounded-md shadow-md mt-10 h-[300px]">
                <h2 className="text-xl font-bold mb-4 text-center text-red-500">Your details:</h2>

                {personInfo ? (
                <>
                <label className="font-medium text-black" htmlFor="ID">ID: {personInfo.id}</label> <br />
                <label className="font-medium text-black" htmlFor="firstName">First Name: {personInfo.firstName}</label>  <br />
                <label className="font-medium text-black" htmlFor="lastName">Last Name: {personInfo.lastName}</label>  <br />
                <label className="font-medium text-black" htmlFor="dob">Date of Birth: {personInfo.dateOfBirth}</label>  <br />
                <label className="font-medium text-black" htmlFor="Email">Email: {personInfo.emailAddress}</label>  <br />
                <label className="font-medium text-black" htmlFor="PhoneNum">Phone Number: {personInfo.phoneNum}</label>  <br />
                <label className="font-medium text-black" htmlFor="address:">Address: {personInfo.address}</label> 
                </>
                ) : (
                    <label className="font-medium text-black" htmlFor="error">Invalid ID. Please create an ID First</label> 
                )}
            </div> 
            )}
            

        </form>
        
        

    </div>
    );

    
}

