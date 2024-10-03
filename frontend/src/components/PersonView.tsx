import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
    id: z.string().min(1),
})

type FormFields = z.infer<typeof schema>;

// TASK 4
export default function PersonView() {
    const form = useForm<FormFields>({ resolver: zodResolver(schema) });
    const { register, handleSubmit, formState } = form;
    const { errors } = formState;

    const onSubmit: SubmitHandler<FormFields> = () => { }

    return (<div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
            <label>ID of Person</label>
            <input type="text" {...register("id")} />
            <p className={"text-red-400"}>{errors.id?.message}</p>
            <button>View</button>
        </form>

    </div>
    );

}