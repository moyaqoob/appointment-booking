import GitHub from "@auth/core/providers/github";
import Google from "@auth/core/providers/google";
import Resend from "@auth/core/providers/resend";
import { Password } from "@convex-dev/auth/providers/Password";
import { convexAuth } from "@convex-dev/auth/server";


import {DataModel} from "./_generated/dataModel"
import { profile } from "console";

const CustomPassword = Password<DataModel>()


export const { auth, signIn, signOut, store } = convexAuth({
  providers: [GitHub, Google, Resend, Password],
});
