import { json } from "@remix-run/node";
import { authenticate } from "../shopify.server";
import db from "../db.server";
import { cors } from 'remix-utils/cors';
import { getUserAllPost } from "../models/Instagaram.auth.server";

export async function loader({ request }){
    try {
        // const { session } = await authenticate.admin(request);
        // const { shop } = session;

        const url = new URL(request.url);
        const shop = url.searchParams.get("shop");

        const settingData = await db.Setting.findFirst({ where: { shop } });
        const authUser = await db.AuthUser.findFirst({ where: { shop } });

        if (!authUser) {
          let response = json({ message: "Account is not connected"});
          return await cors(request, response);
        }

        const accessToken = authUser.access_token;
        const authUserId = authUser.oauth_uid;
        const mediaData = await getUserAllPost(accessToken, authUserId);

        const response = json({
            ok: true,
            message: "Success",
            data: {
                mediaData,
                settingData
            },
        });

        return await cors(request, response);

    } catch (error) {
      console.error(error);
      let response = json({ message: "Something went wrong!"});
      return await cors(request, response);
    }
  };
  