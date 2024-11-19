// The InstaButon component in which we are connecting the Instagram account.
// During the Connection, we will  be asked to log into our Instagram Account and grant access for this application.

// Reuirement for Connection for developemnt;
// 1- Initializing the redirect url = 'https://admin.shopify.com/store/social-feeds-insta/apps/instafeedapp/app/settings
// 2- instagram Auth url for getting the code of Account; (client_id=1593196088119056 => from instagram APP Meta account), redirect url, scopes and in response = code
// instagramAuthUrl = `https://www.instagram.com/oauth/authorize?client_id=1593196088119056&redirect_uri=${encodeURI(redirectUri)}&scope=user_profile,user_media&response_type=code`;


import { Button } from "@shopify/polaris";
import React from "react";

 function InstaButton() {

  const handleAction = () => {
    const redirectUri = 'https://admin.shopify.com/store/social-feeds-insta/apps/instafeedapp/app/settings';
    const instagramAuthUrl = `https://www.instagram.com/oauth/authorize?client_id=1593196088119056&redirect_uri=${encodeURI(redirectUri)}&scope=user_profile,user_media&response_type=code`;
    window.open(instagramAuthUrl, '_blank');
  };

  return (
    <div className="connection-btn">
      <Button onClick={handleAction} size="large">
        <span className="connection_icon_span">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M23.1539 6.52727C23.1539 5.5967 22.3998 4.84531 21.4727 4.84531C20.5455 4.84531 19.7906 5.5967 19.7906 6.52727C19.7906 7.45442 20.5455 8.20581 21.4727 8.20581C22.3998 8.20581 23.1539 7.45442 23.1539 6.52727Z" fill="url(#paint0_linear_1_174)"/>
            <path d="M25.3943 19.6565C25.3321 21.0216 25.1037 21.7633 24.9142 22.2559C24.6595 22.9091 24.3558 23.3761 23.8632 23.866C23.3761 24.3558 22.9091 24.6589 22.2559 24.9107C21.7633 25.1031 21.0188 25.332 19.6538 25.3971C18.178 25.4621 17.7407 25.476 13.9983 25.476C10.2593 25.476 9.81855 25.4621 8.34276 25.3971C6.9777 25.332 6.23669 25.1031 5.74403 24.9107C5.08745 24.6589 4.6239 24.3558 4.13404 23.866C3.64071 23.3761 3.33699 22.9091 3.08583 22.2559C2.89622 21.7633 2.66447 21.0216 2.60563 19.6565C2.53371 18.1807 2.52053 17.7365 2.52053 14.0017C2.52053 10.2593 2.53371 9.81855 2.60563 8.34276C2.66447 6.9777 2.89622 6.23669 3.08583 5.73988C3.33699 5.08745 3.64071 4.62317 4.13404 4.13332C4.6239 3.64419 5.08745 3.34041 5.74403 3.08583C6.23669 2.8928 6.9777 2.66722 8.34276 2.6022C9.81855 2.53713 10.2593 2.52053 13.9983 2.52053C17.7407 2.52053 18.178 2.53713 19.6538 2.6022C21.0188 2.66722 21.7633 2.8928 22.2559 3.08583C22.9091 3.34041 23.3761 3.64419 23.8632 4.13332C24.3558 4.62317 24.6595 5.08745 24.9142 5.73988C25.1037 6.23669 25.3321 6.9777 25.3943 8.34276C25.4628 9.81855 25.4794 10.2593 25.4794 14.0017C25.4794 17.7365 25.4628 18.1807 25.3943 19.6565ZM27.9149 8.22792C27.8464 6.7362 27.6111 5.71705 27.2617 4.82939C26.9061 3.90847 26.4294 3.12802 25.649 2.34757C24.872 1.5706 24.0915 1.09387 23.1706 0.734109C22.2795 0.388148 21.2638 0.150121 19.7714 0.0851006C18.279 0.013127 17.8023 -2.2763e-06 13.9983 -2.2763e-06C10.1977 -2.2763e-06 9.71757 0.013127 8.22517 0.0851006C6.7362 0.150121 5.7212 0.388148 4.82591 0.734109C3.90847 1.09387 3.12802 1.5706 2.35105 2.34757C1.5706 3.12802 1.09387 3.90847 0.734784 4.82939C0.388823 5.71705 0.153599 6.7362 0.0816254 8.22792C0.0166053 9.72032 0 10.1977 0 14.0017C0 17.8023 0.0166053 18.2789 0.0816254 19.7714C0.153599 21.2603 0.388823 22.2787 0.734784 23.1706C1.09387 24.0881 1.5706 24.872 2.35105 25.6489C3.12802 26.4259 3.90847 26.9061 4.82591 27.2652C5.7212 27.6111 6.7362 27.8464 8.22517 27.9149C9.71757 27.9834 10.1977 28 13.9983 28C17.8023 28 18.279 27.9834 19.7714 27.9149C21.2638 27.8464 22.2795 27.6111 23.1706 27.2652C24.0915 26.9061 24.872 26.4259 25.649 25.6489C26.4294 24.872 26.9061 24.0881 27.2617 23.1706C27.6111 22.2787 27.8464 21.2603 27.9149 19.7714C27.9834 18.2789 28 17.8023 28 14.0017C28 10.1977 27.9834 9.72032 27.9149 8.22792Z" fill="url(#paint1_linear_1_174)"/>
            <path d="M13.9983 18.6643C11.4224 18.6643 9.33217 16.5776 9.33217 14.0017C9.33217 11.4216 11.4224 9.33218 13.9983 9.33218C16.5749 9.33218 18.6678 11.4216 18.6678 14.0017C18.6678 16.5776 16.5749 18.6643 13.9983 18.6643ZM13.9983 6.80817C10.0275 6.80817 6.81165 10.0309 6.81165 14.0017C6.81165 17.969 10.0275 21.1884 13.9983 21.1884C17.969 21.1884 21.1884 17.969 21.1884 14.0017C21.1884 10.0309 17.969 6.80817 13.9983 6.80817Z" fill="url(#paint2_linear_1_174)"/>
            <defs>
            <linearGradient id="paint0_linear_1_174" x1="0.252485" y1="27.7105" x2="25.6678" y2="2.29527" gradientUnits="userSpaceOnUse">
            <stop stop-color="#FFD521"/>
            <stop offset="0.05" stop-color="#FFD521"/>
            <stop offset="0.501119" stop-color="#F50000"/>
            <stop offset="0.95" stop-color="#B900B4"/>
            <stop offset="0.950079" stop-color="#B900B4"/>
            <stop offset="1" stop-color="#B900B4"/>
            </linearGradient>
            <linearGradient id="paint1_linear_1_174" x1="0.252556" y1="27.7454" x2="25.6888" y2="2.30917" gradientUnits="userSpaceOnUse">
            <stop stop-color="#FFD521"/>
            <stop offset="0.05" stop-color="#FFD521"/>
            <stop offset="0.501119" stop-color="#F50000"/>
            <stop offset="0.95" stop-color="#B900B4"/>
            <stop offset="0.950079" stop-color="#B900B4"/>
            <stop offset="1" stop-color="#B900B4"/>
            </linearGradient>
            <linearGradient id="paint2_linear_1_174" x1="0.259149" y1="27.746" x2="25.6892" y2="2.31596" gradientUnits="userSpaceOnUse">
            <stop stop-color="#FFD521"/>
            <stop offset="0.05" stop-color="#FFD521"/>
            <stop offset="0.501119" stop-color="#F50000"/>
            <stop offset="0.95" stop-color="#B900B4"/>
            <stop offset="0.950079" stop-color="#B900B4"/>
            <stop offset="1" stop-color="#B900B4"/>
            </linearGradient>
            </defs>
          </svg>

        </span>
        Connect with Instagram
      </Button>
   </div>
  );
}

export default InstaButton;