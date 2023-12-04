import { useForm } from "react-hook-form";

const Funding = () => {

    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => {
        console.log(data)
    };

    return (
        <div className="mx-auto">

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-3 w-96 mx-auto my-5 md:my-10">
                    <div>
                        <input className="p-4 rounded-lg w-full" placeholder="Amount"  {...register("number")} type="number" name="" id="" />
                    </div>
                    <div>
                        <input className="p-4 rounded-lg w-full" placeholder="Card Number"  {...register("number")} type="number" name="" id="" />
                    </div>
                    <div className="flex gap-3">
                        <div>
                            <input className="p-4 rounded-lg w-full" {...register("date")} type="date" name="" id="" />
                        </div>
                        <div>
                            <input className="p-4 rounded-lg w-full" placeholder="CVC" {...register("cvc")} type="number" name="" id="" />
                        </div>
                    </div>
                    <input className="btn btn-outline btn-success" type="submit" />
                </div>
            </form>

        </div>
    );
};

export default Funding;