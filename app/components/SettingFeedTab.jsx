import React, { useCallback, useState } from "react";
import { Page, Layout, Tabs, Button, Thumbnail } from "@shopify/polaris";
import SettingFeedForm from "./SettingFeedForm";
// import Analytic from "./Analyticstab";



function SettingFeedTab({feedData, setForm}) {
  const [selected, setSelected] = useState(0);

  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
    []
  );

  const tabs = [
    {
      id: "feed_settings_tab",
      content: "Feed Setting",
      accessibilityLabel: "Feed Setting",
      badge: (
        <Thumbnail
          source="https://cdn.shopify.com/s/files/1/0646/8019/8301/files/settings-icon.svg?v=1708603635"
          alt="settings-icon"
        />
      ),
      panelID: "panel1",
    },
    {
      id: "analytics_tab",
      content: "Analytics",
      accessibilityLabel: "Analytics",
      badge: (
        <Thumbnail
          source="https://cdn.shopify.com/s/files/1/0646/8019/8301/files/analytics-icon.svg?v=1708610424"
          alt="settings-icon"
        />
      ),
      panelID: "panel2",
    },
  ];

  const handleDeepLink= () => {
    const openUrl = `https://${feedData.shop}/admin/themes/current/editor?template=index&addAppBlockId=d1d62f27-ae63-41a7-9a00-882e2f0d93f7/instafeed&target=mainSection`;
    window.open(openUrl, "_blank");
    };

  return (
    <Page fullWidth>
      <Layout>
        <Layout.Section>
          <div className="tab_settings_wrapper ct_box_inner_wrapper">
            <Tabs
              tabs={tabs}
              selected={selected}
              onSelect={handleTabChange}
              fitted
            >
              {tabs[selected].id === "feed_settings_tab" ? (
                <div className="form_layout_wrapper">
                  <SettingFeedForm setForm={setForm} feedData={feedData} />
                </div>
              ) : (
                <Analytic/>
              )}
            </Tabs>
          </div>
          <div className="theme_install_wrapper ct_box_inner_wrapper">
            <div className="">
              <p className="add_to_theme_label">Add to theme</p>
              <div className="add_feed_to_theme">
                <Button onClick={handleDeepLink} fullWidth>Add instafeed to your theme</Button>
              </div>
              <a
                href="mailto:support@devmontdigital.io"
                className="contact_support_link"
              >
                Learn how to add instafeed to your theme or contact our support
                team
              </a>
            </div>
          </div>
        </Layout.Section>
      </Layout>
    </Page>
  );
}

export default SettingFeedTab;
