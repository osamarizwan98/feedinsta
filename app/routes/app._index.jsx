import React from "react";
import {
  Layout,
  SkeletonPage,
  LegacyCard,
} from "@shopify/polaris";
import InstaButton from "../components/InstaButton";
import InstallationSupport from "../components/InstallationSupport";
import globalStyle from "../css/style.css";
 
export function links() {
    return[
        {
            rel:"stylesheet",
            href:globalStyle,
        }
    ]
}

export default function Index() {
  return (
    <SkeletonPage title="Instafeed" fullWidth>
      <Layout>
        <Layout.Section>
        <div className="legacy_container">
            <LegacyCard sectioned title="">
              <div className="d_flex legacy_container_box">
                <div className="skeleton w-60">
                  <p className="skeleton-text">
                    Connect your <strong> Instagram account </strong>
                    to start using Instafeed
                  </p>
                </div>
                <div className="Butn-sec w-40">
                  <p className="white pb-12">
                    If you are having trouble connecting your Instagram account,
                    check the most common solutions here.
                  </p>
                    <InstaButton />
                </div>
              </div>
            </LegacyCard>
          </div>
          <div className="install_support_wrapper">
            <InstallationSupport/> 
          </div>
        </Layout.Section>
      </Layout>
    </SkeletonPage>
  );
}