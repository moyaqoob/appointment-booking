import Email from "@auth/core/providers/email";
import { defineSchema,defineTable } from "convex/server";
import {v} from "convex/values";

const schema = defineSchema({
    tasks:defineTable({
        completed:v.boolean(),
    })
})

const users = defineSchema({
    users:defineTable({
        name:v.string(),
        email:v.string(),
        password:v.string(),
    })
})

export default schema