import * as Yup from "yup";

export const submitSchema = Yup.object({
    name: Yup.string().min(3).max(45).required("Please enter the valid name"),
    email: Yup.string().email().required("Please enter the valid email id"),
    username: Yup.string().min(3).max(15).required("Please enter the valid user name").test(
        "no-spaces",
        "Username cannot contain spaces",
        value => !/\s/.test(value)
    ),
})