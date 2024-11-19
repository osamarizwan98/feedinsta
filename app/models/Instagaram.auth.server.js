import cron from 'node-cron';

export async function getAccessToken(code, session) {
    const clientId = "875749180517574";
    const clientSecret = "24d0e496e2fdc7aa1a8fadeec57be398";
    const redirectUri =
      "https://admin.shopify.com/store/quick-wishlist/apps/feedinsta/app/additional";
  
    const url = "https://api.instagram.com/oauth/access_token";
  
    const data = new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: "authorization_code",
      redirect_uri: redirectUri,
      code: code,
    });
  
    const options = {
      method: "POST",
      headers: {
        // 'Access-Control-Allow-Origin': session.shop,
        "Content-Type": "application/x-www-form-urlencoded",
        "X-Shopify-Access-Token": session.accessToken,
      },
      body: data,
    };
  
    try {
      const response = await fetch(url, options);
      const responseData = await response.json();
  
      if (!response.ok) {
        console.error("Error:", responseData);
        throw new Error("Failed to receive access token...");
      }
      return responseData;
    } catch (error) {
      console.error("Error:", error);
      throw new Error("Failed to make the request...");
    }
  }


  export async function getLongLiveAccessToken(accessToken) {
    try {
      const response = await fetch(
        `https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=24d0e496e2fdc7aa1a8fadeec57be398&access_token=${accessToken}`,
        {
          method: "GET",
          // headers: {
          //   // 'Access-Control-Allow-Origin': session.shop,
          //   "X-Shopify-Access-Token": session.accessToken,
          // },
        },
      );
      const responseData = await response.json();
  
      if (!response.ok) {
        console.error("Error:", responseData);
        throw new Error("Failed to receive long access token...");
      }
      console.log("Longlive resonse:", responseData)
      return responseData;
    } catch (error) {
      console.error("Error:", error);
      throw new Error("Failed to make the request...");
    }
  }


  
  export async function getUserAllPost(longLiveToken, userId) {
    try {
      const response = await fetch(
        `https://graph.instagram.com/v19.0/${userId}/media?fields=id,username,media_url,media_type,caption,children{media_url},permalink,timestamp&access_token=${longLiveToken}`,
        {
          method: "GET",
          // headers: {
          //   // 'Access-Control-Allow-Origin': session.shop,
          //   // "X-Shopify-Access-Token": session.accessToken,
          // },
        },
      );
      const responseData = await response.json();
  
      if (!response.ok) {
        console.error("Error:", responseData);
        throw new Error("Post not found");
      }
      console.log(responseData);
      return responseData;
    } catch (error) {
      console.error("Error:", error);
      throw new Error("Failed to make the request...");
    }
  }
  

  // Schedule a job to run every one minutes
  cron.schedule('*/1 * * * *', () => {
    console.log('running a task every two minutes');
  })