import { LegacyCard, Tabs, Thumbnail, Spinner } from "@shopify/polaris";
import { useState, useCallback,useEffect } from "react";
import MobileGrid from "./MobileGrid";
import DesktopGrid from "./DesktopGrid";
import loaderIcon from '../images/loading_icon.svg'

export default function PostPreviewTab({ preview, feedData, postData }) {
  const [selected, setSelected] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
    []
  );

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      // setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer); // Clear the timer if the component unmounts
  }, [feedData?.settingResponse]);


  const tabs = [
    {
      id: "Desktop",
      content: "Desktop View",
      badge: (
        <Thumbnail
          source="https://cdn.shopify.com/s/files/1/0646/8019/8301/files/desktop.svg?v=1708599157"
          alt="DesktopView"
          size="small"
        />
      ),
      accessibilityLabel: "All customers",
      panelID: "Desktop-content",
    },
    {
      id: "Mobile",
      content: "Mobile View",
      badge: (
        <Thumbnail
          source="https://cdn.shopify.com/s/files/1/0646/8019/8301/files/mobile.svg?v=1708599157"
          alt="MobileView"
          size="small"
        />
      ),
      panelID: "Mobile-content",
    },
  ];


  return (
    <div className="tabsection">
      <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange} fitted>
        <LegacyCard.Section>
          {tabs[selected].id === "Desktop" ? (
            <div className="Desktopview">
               {isLoading ? (
                  <img className="loader_icon" src={loaderIcon} alt="loader" />
                ) : (
                  <DesktopGrid
                    mediaData={postData}
                    preview={preview}
                    feedData={feedData}
                  />
                )}
            </div>
          ) : (
            <div className="Mobileview">
              {isLoading ? (
                  <img className="loader_icon" src={loaderIcon} alt="loader" />
                ) : (
                  <MobileGrid
                    mediaData={postData}
                    preview={preview}
                    feedData={feedData}
                  />
                )}
            </div>
          )}
        </LegacyCard.Section>
      </Tabs>
    </div>
  );
}
