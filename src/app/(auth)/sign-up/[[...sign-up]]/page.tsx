import { SignUp } from "@clerk/nextjs";

const Page = () => {


    return(
        <div className="flex justify-center items-center">
            <SignUp routing="hash" /> 
        </div>
    )
}

export default Page;