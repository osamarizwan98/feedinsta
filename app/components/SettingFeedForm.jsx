import React, { useEffect, useState } from "react";
import {
  TextField,
  FormLayout,
  Button,
  Select,
  InlineGrid,
} from "@shopify/polaris";
import {
  Form,
  useActionData,
  useNavigation,
} from "@remix-run/react";

const Settingfeedform = ({ feedData, setForm }) => {
  const navigation = useNavigation();
  const actionData = useActionData();
  const settingData = feedData?.settingResponse;

  const [formState, setFormState] = useState({
    feed_title: settingData?.feedTitle || "",
    feed_type: settingData?.feedType || "grid",
    feed_post_spacing: settingData?.spacing || 0,
    feed_post_action: settingData?.postPreview || 0,
    feed_post_rows: settingData?.postRows || 2,
    feed_post_cols: settingData?.postColumns || 5,
  });

  const handleFieldChange = (field, value) => {
    if (field == "feed_post_cols" && (value == 0 || value > 10)) {
      return false;
    }
    setFormState((formState) => ({ ...formState, [field]: value }));
    setForm((formState) => ({ ...formState, [field]: value }));
  };

  const isLoading = navigation.state === "submitting" && navigation.formData?.get("action") !== "delete";
  useEffect(() => {
    if (isLoading) {
      // shopify.loading(true);
      shopify.toast.show("Feed saved");
    }
  });
  return (
    <Form method="post">
      <FormLayout>
        <TextField
          value={formState?.feed_title}
          name="feed_title"
          onChange={(value) => handleFieldChange("feed_title", value)}
          label="Feed Title"
          type="text"
          autoComplete="off"
        />
        <Select
          label="Feed Type"
          options={[
            { label: "Grid", value: "grid" },
            { label: "Slider", value: "slider" },
          ]}
          name="feed_type"
          onChange={(value) => handleFieldChange("feed_type", value)}
          value={formState?.feed_type}
        />

        <InlineGrid gap="600" columns={2}>
          <Select
            label="Post spacing"
            options={[
              { label: "No spacing", value: 0 },
              { label: "Small", value: 5 },
              { label: "Medium", value: 10 },
              { label: "Large", value: 15 },
            ]}
            name="feed_post_spacing"
            onChange={(value) =>
              handleFieldChange("feed_post_spacing", Number(value))
            }
            value={formState?.feed_post_spacing}
          />
          <Select
            label="On post click"
            options={[
              { label: "Open Post Preview", value: 0 },
              { label: "Go to Instagram", value: 1 },
            ]}
            name="feed_post_action"
            onChange={(value) =>
              handleFieldChange("feed_post_action", Number(value))
            }
            value={formState?.feed_post_action}
          />
        </InlineGrid>
        <InlineGrid gap="600" columns={2}>
          <Select
            label={
              formState?.feed_type === "grid" ? "No. of rows" : "Slider pages"
            }
            options={[
              { label: "1", value: 1 },
              { label: "2", value: 2 },
              { label: "3", value: 3 },
              { label: "4", value: 4 },
              { label: "5", value: 5 },
            ]}
            name="feed_post_rows"
            onChange={(value) =>
              handleFieldChange("feed_post_rows", Number(value))
            }
            value={formState?.feed_post_rows}
          />
          <TextField
            label="No. of columns"
            type="number"
            min={1}
            max={6}
            name="feed_post_cols"
            value={formState?.feed_post_cols}
            onChange={(value) =>
              handleFieldChange("feed_post_cols", Number(value))
            }
            error={actionData?.errors?.postColumns}
            autoComplete="off"
          />
        </InlineGrid>
        <input type="hidden" name="action" value="save" />
        <div className="setting_form_btn">
          <Button disabled={isLoading} size="large" fullWidth submit>
            Save
          </Button>
        </div>
      </FormLayout>
    </Form>
  );
};

export default Settingfeedform;
