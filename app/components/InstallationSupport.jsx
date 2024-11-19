// Installation Support in which we have 2 containers;

//  1- Installation guide
//  2- Contact suppoert guife which takes us to the form.


import { Page, Grid, LegacyCard, Button, Text } from "@shopify/polaris";
import React from "react";

export default function InstallationSupport() {
  return (
    <Grid>
        <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
          <div className="d_flex p-30-70 install_item_wrapper">
          <div class="install-image ">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 157 157" height="157" width="157">
              <path fill-opacity="0.1" fill="#303030" d="M36.834 45.2888C36.834 43.0467 37.7247 40.8964 39.3101 39.311C40.8955 37.7256 43.0457 36.835 45.2878 36.835H111.711C113.953 36.835 116.103 37.7256 117.689 39.311C119.274 40.8964 120.165 43.0467 120.165 45.2888C120.165 47.5309 119.274 49.6812 117.689 51.2666C116.103 52.852 113.953 53.7426 111.711 53.7426H45.2878C43.0457 53.7426 40.8955 52.852 39.3101 51.2666C37.7247 49.6812 36.834 47.5309 36.834 45.2888Z"></path>
              <path fill-opacity="0.1" fill="#303030" d="M42.2673 67.0273C40.0252 67.0273 37.875 67.918 36.2896 69.5034C34.7041 71.0888 33.8135 73.2391 33.8135 75.4812C33.8135 77.7233 34.7041 79.8736 36.2896 81.459C37.875 83.0444 40.0252 83.935 42.2673 83.935H69.4404C71.6825 83.935 73.8328 83.0444 75.4182 81.459C77.0036 79.8736 77.8942 77.7233 77.8942 75.4812C77.8942 73.2391 77.0036 71.0888 75.4182 69.5034C73.8328 67.918 71.6825 67.0273 69.4404 67.0273H42.2673Z"></path>
              <path fill-opacity="0.1" fill="#303030" d="M0 33.2115C0 24.4033 3.49906 15.9558 9.72743 9.72743C15.9558 3.49906 24.4033 0 33.2115 0H123.788C132.597 0 141.044 3.49906 147.273 9.72743C153.501 15.9558 157 24.4033 157 33.2115V99.6346C156.998 102.036 156.042 104.338 154.343 106.035L106.035 154.343C104.338 156.042 102.036 156.998 99.6346 157H33.2115C24.4033 157 15.9558 153.501 9.72743 147.273C3.49906 141.044 0 132.597 0 123.788V33.2115ZM33.2115 18.1154C24.8785 18.1154 18.1154 24.8785 18.1154 33.2115V123.788C18.1154 132.122 24.8785 138.885 33.2115 138.885H90.5769V111.712C90.5769 100.045 100.045 90.5769 111.712 90.5769H138.885V33.2115C138.885 24.8785 132.122 18.1154 123.788 18.1154H33.2115ZM126.083 108.692H111.712C110.911 108.692 110.143 109.01 109.577 109.577C109.01 110.143 108.692 110.911 108.692 111.712V126.083L126.083 108.692Z" clip-rule="evenodd" fill-rule="evenodd"></path>
            </svg>
          </div>
            <div className="install-content">
              <Text variant="headingLg" as="h2">
                Installation guide
              </Text>
              <Text variant="bodyLg" as="p">
                Install Instafeed in two simple steps! First, connect your
                Instagram account. Check our installation guide for more
                details.
              </Text>
              <Button variant="primary"> Read installation guide </Button>               {/* we can initialize the url attribute for linking */}
            </div>
          </div>
        </Grid.Cell>

        <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
          <div className="d_flex p-30-70 install_item_wrapper">
          <div class="install-image ">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 137 159" height="159" width="137">
                <path fill="#DEDEDE" d="M69.7385 158.425C68.8957 158.425 68.0842 158.425 67.2415 158.425C65.0567 157.743 63.6209 156.225 62.3725 154.367C57.7843 147.551 53.165 140.797 48.4832 134.044C48.0462 133.424 47.3596 132.805 46.6417 132.557C34.4066 128.406 24.2004 121.373 15.8356 111.615C-2.89152 89.7122 -5.29484 56.688 10.155 32.4C27.54 5.07608 60.094 -6.78909 90.8065 3.89886C115.464 12.4802 130.383 30.1385 135.783 55.5728C136.345 58.268 136.594 61.0561 137 63.7823C137 66.6634 137 69.5445 137 72.4566C136.875 73.417 136.75 74.3773 136.625 75.3377C132.599 103.436 117.18 122.458 90.4943 132.526C89.7453 132.805 88.965 133.393 88.4968 134.044C83.815 140.797 79.1956 147.551 74.6075 154.367C73.359 156.225 71.9545 157.743 69.7385 158.425ZM68.5212 141.169C72.329 135.593 75.9808 130.295 79.5702 124.936C80.7875 123.139 82.3168 121.993 84.4392 121.373C111.999 113.071 128.542 86.4594 123.673 58.3609C118.179 26.7308 86.1247 6.16037 54.7256 14.1531C22.9207 22.2697 4.75538 55.4178 15.5547 86.2115C21.7658 103.901 34.2818 115.518 52.2286 121.28C54.5383 122.024 56.2549 123.17 57.5658 125.184C60.6246 129.831 63.8394 134.416 66.9606 139.001C67.46 139.682 67.9282 140.333 68.5212 141.169Z"></path>
                <path fill="#DEDEDE" d="M75.3563 77.3207C75.3563 82.6182 75.3251 87.9467 75.3875 93.2442C75.4188 94.9481 74.7009 96.1253 73.2964 96.8998C70.2064 98.6037 67.054 98.6656 63.9328 97.0237C62.4346 96.2492 61.6855 95.01 61.6855 93.2752C61.7168 82.6492 61.7168 72.0542 61.6855 61.4282C61.6855 59.4765 62.4971 58.1134 64.2449 57.4318C67.1788 56.2546 70.1127 56.2546 73.0154 57.5867C74.6072 58.3302 75.4188 59.5384 75.3875 61.3972C75.3251 66.6947 75.3563 71.9922 75.3563 77.3207Z"></path>
                <path fill="#DEDEDE" d="M68.4591 48.5717C64.7449 48.5408 61.4676 45.8146 61.3116 42.5927C61.1243 38.8751 64.7761 35.7462 68.9273 36.087C69.5515 36.1489 70.1758 36.2419 70.7688 36.4278C73.89 37.3571 75.9812 40.1763 75.6066 42.9335C75.1384 46.0934 72.0173 48.6027 68.4591 48.5717Z"></path>
              </svg>
            </div>
            <div className="install-content">
              <Text variant="headingLg" as="h2">
                Mintt Studio Support
              </Text>
              <Text variant="bodyLg" as="p">
                Having trouble? Our support team is always available to <br></br> help you.
              </Text>
              <Button variant="primary" url="/app/help"> Contact Support </Button>    {/* we had initialize the url attribute for linking */}
            </div>
          </div>
        </Grid.Cell>
      </Grid>
  );
}

// This component is rendering on Main screen, "app._index.jsx"