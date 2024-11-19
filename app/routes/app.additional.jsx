import {
  Page,
  Grid,
  LegacyCard,
  InlineStack,
  Text,
  SkeletonPage,
  Button,
  PageActions,
} from "@shopify/polaris";
import React, { useEffect, useState } from "react";
import PostPreviewTab from "../components/PostPreviewTab";
import SettingFeedTab from "../components/SettingFeedTab";
import globalStyle from "../css/style.css";
import { authenticate } from "../shopify.server";
import {
  getAccessToken,
  getLongLiveAccessToken,
  getUserAllPost,
} from "../models/Instagaram.auth.server";
import db from "../db.server";
import { getFeedSetting } from "../models/Setting.server";
import { json, redirect, useLoaderData, useSubmit } from "@remix-run/react";

// Import Swiper styles
import swiperStyle from "swiper/css";
import swiperNav from "swiper/css/navigation";
import lightBoxStyle from "yet-another-react-lightbox/styles.css";

export const links = () => [
  { rel: "stylesheet", href: swiperStyle },
  { rel: "stylesheet", href: swiperNav },
  { rel: "stylesheet", href: globalStyle },
  { rel: "stylesheet", href: lightBoxStyle },
];

export const loader = async ({ request }) => {
  const { session } = await authenticate.admin(request);
  const { shop } = session;

  try {
    const { session } = await authenticate.admin(request);
    const settingResponse = await getFeedSetting(shop);
    let feedData = await db.AuthUser.findFirst({
      where: { shop: session.shop },
    });

    if (feedData !== null) {
      // Shop exists in the database, fetch user data
      const accessToken = feedData.access_token;
      const authUserId = feedData.oauth_uid;
      console.log("Shop Exist");
      const mediaData = await getUserAllPost(accessToken, authUserId);

      return json({ mediaData, accessToken, settingResponse, shop });
    } else {
      // Shop doesn't exist in the database, insert it
      const code = new URL(request.url).searchParams.get("code");
      if (!code && settingResponse) {
        return json({ settingResponse, shop });
      }
      const accessTokenResponse = await getAccessToken(code, session);
      const accessToken = accessTokenResponse?.access_token;
      const userId = accessTokenResponse?.user_id.toString();
      const longLiveToken = await getLongLiveAccessToken(accessToken);
      const mediaData = await getUserAllPost(
        longLiveToken.access_token,
        userId,
      );
      const userName = mediaData.data[0].username;

      feedData = await db.AuthUser.create({
        data: {
          shop: session.shop,
          access_token: longLiveToken.access_token,
          code: code,
          oauth_uid: userId,
          username: userName,
        },
      });
      console.log("Shop Not Exist");
      return json({
        mediaData,
        accessToken: longLiveToken.access_token,
        settingResponse,
        shop
      });
    }
  } catch (error) {
    console.error("Error occurred in loader:", error);
    return json({ error: "An error occurred while loading data." }, 500);
  }
};

export async function action({ request }) {
  const { session } = await authenticate.admin(request);
  const { shop } = session;
  const formData = await request.formData();

  if (formData.get("action") == "delete") {
    // if (Ourdata.action === "delete") {
    await db.AuthUser.delete({ where: { shop } });
    return redirect("/app");
  }
  if (formData.get("action") == "save") {
    const data = {
      shop,
      feedTitle: formData.get("feed_title"),
      feedType: formData.get("feed_type"),
      spacing: parseInt(formData.get("feed_post_spacing")),
      postPreview: parseInt(formData.get("feed_post_action")),
      postRows: parseInt(formData.get("feed_post_rows")),
      postColumns: parseInt(formData.get("feed_post_cols")),
    };
    const errors = {};

    if (!data.postColumns) {
      errors.postColumns = "Post Column is required";
    }
    if (Object.keys(errors).length > 0) {
      return json({ errors });
    }

    const checkStore = await getFeedSetting(shop);
    const storeResult = checkStore
      ? await db.Setting.update({ where: { shop }, data })
      : await db.Setting.create({ data });
    return null;
  }
}

function AdditionalPage() {
  const loaderData = useLoaderData();
  const [preview, setPreview] = useState({});
  const [postData, setPostData] = useState(null);
  const [username, setUsername] = useState(null);
  const [connected, setConnected] = useState(false);
  const submit = useSubmit();

  useEffect(() => {
    if (loaderData?.accessToken) {
      setConnected(true);
      setPostData(loaderData.mediaData);
      setUsername(loaderData.mediaData.data[0].username);
    }
  }, [loaderData]);

  return (
    <SkeletonPage title="Instafeed" fullWidth>
      <div className="username d_flex justify-between">
        <Text as="h2" variant="headingLg">
          {username} {connected ? "is connected" : ""}
        </Text>
        {connected && (
          <PageActions
            secondaryActions={[
              {
                content: "Disconnect",
                destructive: true,
                onAction: () =>
                  submit({ action: "delete" }, { method: "post" }),
              },
            ]}
          />
        )}
      </div>
      <Page fullWidth>
        <Grid gap={"lg"}>
          <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 7, lg: 7, xl: 7 }}>
            <LegacyCard title="" sectioned>
              <SettingFeedTab setForm={setPreview} feedData={loaderData} />
            </LegacyCard>
          </Grid.Cell>
          <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 5, lg: 5, xl: 5 }}>
            <LegacyCard title="" sectioned>
              <PostPreviewTab
                preview={preview}
                postData={postData}
                feedData={loaderData}
              />
              <div style={{ marginTop: "10px" }}>
                <InlineStack align="space-between" blockAlign="center">
                  <Text variant="headingLg" as="h2">
                    Preview
                  </Text>
                  <div className="d_flex previewcontainer">
                    <Text variant="bodyXs" as="p">
                      Preview on website
                    </Text>
                    <img
                      className="pl-10 pb-5"
                      src="https://cdn.shopify.com/s/files/1/0646/8019/8301/files/redirect-icon.svg"
                      alt="Preview"
                    />
                  </div>
                </InlineStack>
              </div>
            </LegacyCard>
          </Grid.Cell>
        </Grid>
      </Page>
    </SkeletonPage>
  );
}

export default AdditionalPage;
