import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

// TASK 2 is up to you on where you put the validaton

// TASK 1
const personSchema = z.object({
    id: z.string().min(1,"ID is a required field").regex(/[0-9]/,"ID must be an integer"),
    firstName: z.string().min(1,"First name is required").regex(/^[A-Z]/,"First Name must start with a capital letter").trim(),
    lastName: z.string().min(1,"Last name is required").regex(/^[A-Z]/,"Last Name must start with a capital letter").trim(),
    dateOfBirth : z.coerce.date().max(new Date(),"Date of birth cannot be in the future").min(new Date("1924-01-01"),"Minimum date of birth exceeded"),
    emailAddress: z.string().email("Invalid email address entered").trim(),
    phoneNum: z.string().trim().refine((value) => value.replace(/\s/g, "").length === 13, {message: "Phone Number must be 13 characters long (excluding whitespaces)", })
        .refine((value) => value.replace(/\s/g, "").startsWith("+44"), {
            message: "Phone Number must start with +44 (excluding whitespaces)",
        }),

    address: z.string().min(5,"Address is too short").max(50,"Maximum address length reached"),
})

// TASK 1
const postPath = "/people";
const putPath = "/people";

type FormFields = z.infer<typeof personSchema>;

export default function PersonForm() {
    // Form handling
    const form = useForm<FormFields>({ resolver: zodResolver(personSchema) });
    const { register, handleSubmit, formState } = form;
    const { errors } = formState;
    const [isUpdating, setIsUpdating] = useState(false);

    // Success message handling
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    useEffect(() => {
        if (successMessage) {
            const timer = setTimeout(() => {
                setSuccessMessage(null);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [successMessage]);

    const isUpdatingCheck = (updating: boolean) => {
        setIsUpdating(updating); // Set state synchronously
        setShowDetails(true);
        handleSubmit((data) => onSubmit(data))(); // Trigger form submission
    };

    // Form submission handling
    const onSubmit: SubmitHandler<FormFields> = async (data: FormFields) => {
        try {
            const url = isUpdating ? `http://localhost:8080${putPath}` : `http://localhost:8080${postPath}`;
            const method = isUpdating ? "PUT" : "POST";

            const response = await fetch(url, {
                method: method,
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' },
            });
            if (response.ok) {
                const json = await response.json()
                // TASK 3
                const dynamicSuccessMessage = !isUpdating ? `Successfully created person with ID ${data.id}\n` : `Successfully updated person with ID ${data.id}\n`
                setSuccessMessage(dynamicSuccessMessage + JSON.stringify(json, null, 2));
            } else {
                setSuccessMessage("Failed to create person");
            }
        } catch (error) {
            console.log(error)
        }

    }

    // Re-used classNames
    //const labelClassName = clsx("");
    const inputClassName = clsx("text-black");
    const errorClassName = clsx("text-red-400");

    return (
        <div className="w-96 mx-auto p-6 bg-gray-100 rounded-md shadow-md mt-10 h-[px]">
        <h2 className="text-xl font-bold mb-4 text-center text-red-500">Please enter your details:</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
                <label className="font-medium text-black" htmlFor="id">ID</label>
                <input className={inputClassName} type="text" id="id" {...register("id")} placeholder="6"/>
                <p className={errorClassName}>{errors.id?.message}</p>

                {/* TASK 1 Add more attribute fields here */}
                <label className="font-medium text-black" htmlFor="firstName">First Name</label>
                <input className={inputClassName} type="text" id="firstName" {...register("firstName")} placeholder="Beyonce" />
                <p className={errorClassName}>{errors.firstName?.message}</p>

                <label className="font-medium text-black" htmlFor="lastName">Last Name</label>
                <input className={inputClassName} type="text" id="lastName" {...register("lastName")} placeholder="Derek" />
                <p className={errorClassName}>{errors.lastName?.message}</p>

                <label className="font-medium text-black" htmlFor="dob">Date of Birth</label>
                <input className={inputClassName} type="date" id="dob" {...register("dateOfBirth")} />
                <p className={errorClassName}>{errors.dateOfBirth?.message}</p>

                <label className="font-medium text-black" htmlFor="emailAdd">Email Address</label>
                <input className={inputClassName} type="text" id="emailAdd" {...register("emailAddress")} placeholder="beyDerek@gmail.com" />
                <p className={errorClassName}>{errors.emailAddress?.message}</p>

                <label className="font-medium text-black" htmlFor="phoneNum">Phone Number</label>
                <input className={inputClassName} type="text" id="phoneNum" {...register("phoneNum")} placeholder="+445673452341" />
                <p className={errorClassName}>{errors.phoneNum?.message}</p>

                <label className="font-medium text-black" htmlFor="address">Address</label>
                <input className={inputClassName} type="text" id="address" {...register("address")} placeholder="21 Beverely Hills, California, United States" />
                <p className={errorClassName}>{errors.address?.message}</p>


                <div className="flex justify-between mt-4">
                    <button
                        type="submit"
                        className="w-36 bg-red-500 text-white py-1 px-2 rounded-md hover:bg-green-600"
                        onClick={() => isUpdatingCheck(false)}
                    >
                        Create
                    </button>
                    <button
                        type="submit"
                        className="w-36 bg-red-500 text-white py-1 px-2 rounded-md hover:bg-green-600"
                        onClick={() => isUpdatingCheck(true)}
                    >
                        Update
                    </button>
                </div>

                
                {successMessage && (
                    <div className="w-96 mx-auto mt-4 p-4 bg-green-100 text-green-800 rounded-md shadow-md">
                    <h3 className="font-bold"></h3>
                    <pre className="whitespace-pre-wrap text-sm mt-2">{successMessage}</pre>
                </div>
                )}

            
            </form>
        </div>

        
        
        
    );
}