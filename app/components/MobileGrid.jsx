import React, { useCallback, useState } from "react";
import {
  BlockStack,
  Modal,
  TextContainer,
  Banner,
  Box,
} from "@shopify/polaris";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Lightbox, { useLightboxState } from "yet-another-react-lightbox";
import banner from "../images/instgram.png";

function MyCustomSlide({ item, slide, formatDateString }) {
  const index = item.findIndex((el) => el === slide);

  const { currentIndex } = useLightboxState();
  return index === currentIndex ? (
    <>
      <div className="main_gallery_wrapper">
        {slide.media_type === "VIDEO" ? (
          <div className="fi_post_image_wrapper">
            <video
            controls
            src={slide.media_url}
            className="fi_post_image"
          />
          </div>
        ) : (
          <div className="fi_post_image_wrapper">
            <img className="fi_post_image" src={slide.media_url} />
          </div>
        ) }
        <div className="fi_right_side">
          <div className="fi_top_header">
            <div className="fi_logo_wrap">
              <img
                src="https://instafeed.nfcube.com/assets/img/logo-instagram-transparent.png"
                className="fi_logo_img"
                alt="instagram profile"
              />
            </div>
            <a
              className="fi_username_link"
              href={`https://www.instagram.com/${slide.username}`}
              target="_blank"
            >
              {slide.username}
            </a>
          </div>
          <div className="fi_right_inner_content">
            {slide.caption && (
              <p className="fi_post_caption">{slide.caption}</p>
            )}
          </div>
          <div className="fi_bottom_date_wrap">
            <span>{formatDateString(slide.timestamp)}</span> •
            <a href={slide.permalink} target="_blank">
              {" "}
              View on Instagram
            </a>
          </div>
        </div>
      </div>
    </>
  ) : null;
}

function MobileGrid({ preview, feedData, mediaData }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  let previewData = feedData?.settingResponse;
  console.log(feedData);
  if (!previewData) {
    previewData = {};
  }

  previewData.feedTitle = preview?.feed_title ?? previewData?.feedTitle ?? "";
  previewData.feedType = preview?.feed_type ?? previewData?.feedType ?? "grid";
  previewData.spacing = preview?.feed_post_spacing ?? previewData?.spacing ?? 0;
  previewData.postPreview =
    preview?.feed_post_action ?? previewData?.postPreview ?? 0;
  previewData.postRows = preview?.feed_post_rows ?? previewData?.postRows ?? 2;
  previewData.postColumns =
    preview?.feed_post_cols ?? previewData?.postColumns ?? 5;
  let totalPost = previewData.postRows * previewData.postColumns;

  const limitImages = feedData?.mediaData?.data.slice(0, totalPost);

  const updateIndex = (index) => {
    setIndex(index);
  };

  const formatDateString = (dateString) => {
    const date = new Date(dateString);
    const options = { day: "numeric", month: "long", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <div className="fullwidth">
      <BlockStack gap="500" fullwidth>
        {limitImages?.length ? (
          <>
            {previewData.feedType === "grid" ? (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: `repeat(2, minmax(0, 1fr))`,
                  gap: previewData?.spacing,
                }}
              >
                {limitImages.map((item, index) => (
                  <Box as="div" key={index}>
                    {item.media_type === "VIDEO" ? (
                      <video
                        src={item.media_url}
                        controls
                        width="100%"
                        height="100%"
                        onClick={() => {
                          if (!previewData.postPreview) {
                            setOpen(true);
                            updateIndex(index);
                          } else {
                            window.open(item.permalink, "_blank");
                          }
                        }}
                        style={{
                          objectFit: "cover",
                          objectPosition: "center",
                        }}
                        className="preview_post_grid_img"
                      />
                    ) : (
                      <img
                        src={item.media_url}
                        width="100%"
                        height="100%"
                        onClick={() => {
                          if (!previewData.postPreview) {
                            setOpen(true);
                            updateIndex(index);
                          } else {
                            window.open(item.permalink, "_blank");
                          }
                        }}
                        style={{
                          objectFit: "cover",
                          objectPosition: "center",
                        }}
                        alt="Instagram post"
                        className="preview_post_grid_img"
                      />
                    )}
                  </Box>
                ))}
              </div>
            ) : (
              <Swiper
                modules={[Navigation]}
                spaceBetween={previewData?.spacing}
                allowTouchMove={false}
                slidesPerView={2}
                navigation
                className="mySwiper"
                style={{ width: "100%" }}
              >
                {limitImages.map((item, index) => (
                  <SwiperSlide key={index}>
                    {item.media_type === "VIDEO" ? (
                      <video
                        src={item.media_url}
                        controls
                        width="100%"
                        height="100%"
                        onClick={() => {
                          if (!previewData.postPreview) {
                            setOpen(true);
                            updateIndex(index);
                          } else {
                            window.open(item.permalink, "_blank");
                          }
                        }}
                        style={{
                          objectFit: "cover",
                          objectPosition: "center",
                        }}
                        className="preview_post_grid_img"
                      />
                    ) : (
                      <img
                        src={item.media_url}
                        width="100%"
                        height="100%"
                        onClick={() => {
                          if (!previewData.postPreview) {
                            setOpen(true);
                            updateIndex(index);
                          } else {
                            window.open(item.permalink, "_blank");
                          }
                        }}
                        style={{
                          objectFit: "cover",
                          objectPosition: "center",
                        }}
                        alt="Instagram post"
                        className="preview_post_grid_img"
                      />
                    )}
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
            {previewData.postPreview == 0 && (
              <Lightbox
                open={open}
                close={() => setOpen(false)}
                index={index}
                on={{
                  view: ({ index: currentIndex }) => setIndex(currentIndex),
                }}
                slides={limitImages}
                render={{
                  slide: ({ slide }) => (
                    <MyCustomSlide
                      formatDateString={formatDateString}
                      item={limitImages}
                      slide={slide}
                    />
                  ),
                }}
              />
            )}
          </>
        ) : (
          <div className="d_flex preview_default_images">
            <img src={banner} className="h-80" />
          </div>
        )}
      </BlockStack>
    </div>
  );
}

export default MobileGrid;
