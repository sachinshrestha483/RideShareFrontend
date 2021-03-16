import ValidateJwtToken from "@/utility/IdentitySection/ValidateJwtToken";


const refreshLogin=async ()=>{
    const { validate } = ValidateJwtToken();
await validate();
}
export default {refreshLogin};



