import React, { useCallback, useState } from "react";
import { Resend } from "resend";
import {
  Button,
  FormLayout,
  Page,
  SkeletonPage,
  TextField,
  Toast,
} from "@shopify/polaris";
import { Form, json, useNavigation, useSubmit } from "@remix-run/react";
import globalStyle from "../css/style.css";
import SupportBg from "../images/support-form-bg.png";

import { authenticate } from "../shopify.server";
import { sendEmail } from "../models/Setting.server";
export const links = () => [{ rel: "stylesheet", href: globalStyle }];

const resend = new Resend("re_9UVZdrmM_AdP5mDpXsXH6Kkxk4ugNdkKZ");

export const action = async ({ request }) => {
  const { session } = await authenticate.admin(request);
  const formData = await request.formData();
  const fullName = formData.get("fullName");
  const email = formData.get("email");
  const subject = formData.get("subject");
  const message = formData.get("message");
  const storePassword = formData.get("storePassword");
  if (fullName.trim() && email.trim() && subject.trim() && message.trim()) {

    // Function to generate a random four-digit ticket number
    const generateTicketNumber = () => {
      // Generate a random number between 1000 and 9999 (inclusive)
      let randomNumber =  Math.floor(Math.random() * 9000) + 1000;
      return 'SR#'+randomNumber
    }
    const ticketNumber = generateTicketNumber();

    // Email body for customer
    const customerEmailHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Support Email Acknowledgment</title>
      </head>
      <body style="margin: 0; padding: 20px; font-family: Arial, sans-serif; line-height: 1.6; background-color: #f7f7f7;">
        <div style="max-width: 600px; margin: 20px auto; padding: 20px; background-color: #fff; border-radius: 5px; box-shadow: 0px 0px 10px rgba(0,0,0,0.1);">
          <img src="https://devmontdigital.co/feed-app/images/instamont-logo.png" alt="Instagram Logo" style="display: block; margin: 0 auto; width: 60px;">
          <h1 style="color: #333; text-align: center;">Support Request Acknowledgment</h1>
          <p style="color: #666; text-align: center;">Dear <strong>${fullName}</strong>,</p>
          <p style="color:#666;text-align:center">Thank you for reaching out to us!,</p>
          <p style="color:#666;text-align:center">We wanted to acknowledge receipt of your recent support request. Our team is dedicated to providing prompt and efficient assistance, and we are already working diligently to address your concerns. Your ticket number for reference is <b>${ticketNumber}</b></p>
            <p style="color:#666;text-align:center">In the meantime, should you have any additional information or queries, please do not hesitate to reply to this email.
          </p>
        </div>
      </body>
      </html>
    `;

    // Email body for support team
    const supportTeamEmailHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Support Form</title>
        <style>
          /* CSS Reset */
          body, html {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            line-height: 1.6;
            background-color: #f7f7f7;
          }
          table {
            width: 100%;
            max-width: 600px;
            margin: 20px auto;
            border-collapse: collapse;
            border-radius: 5px;
            box-shadow: 0px 0px 10px rgba(0,0,0,0.1);
            background-color: #fff;
          }
          th, td {
            padding: 10px;
            border-bottom: 1px solid #ccc;
            text-align: left;
          }
          th {
            background-color: #f3f3f3;
          }
        </style>
      </head>
      <body>
        <table>
          <tr>
            <th colspan="2" style="text-align: center; background-color: #333; color: #fff; padding: 15px;">New Support Request</th>
          </tr>
          <tr>
            <td style="width: 30%;"><strong>Full Name:</strong></td>
            <td style="width: 70%;">${fullName}</td>
          </tr>
          <tr>
            <td><strong>Email:</strong></td>
            <td>${email}</td>
          </tr>
          <tr>
            <td><strong>Subject:</strong></td>
            <td>${subject}</td>
          </tr>
          <tr>
            <td><strong>Store Url:</strong></td>
            <td>${session.shop}</td>
          </tr>
          <tr>
            <td><strong>Store Password:</strong></td>
            <td>${storePassword}</td>
          </tr>
          <tr>
            <td><strong>Message:</strong></td>
            <td>${message}</td>
          </tr>
        </table>
      </body>
      </html>
    `;

    let emailResponse = await sendEmail( customerEmailHtml, supportTeamEmailHtml, email );
    if (emailResponse?.message == undefined) {
      return json({ error: "Error sending emails" }, 400);
    }
    return null

  } else {
    console.log("Has Error");
  }
};

const SupportForm = () => {

  const initialFormValues = {
    fullName: "",
    email: "",
    subject: "",
    message: "",
    storePassword: "",
  };
  

  const [formValues, setFormValues] = useState(initialFormValues);
  const [errors, setErrors] = useState({});

  // const use

  const handleChangeText = useCallback((field, value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
  }, []);

  const validateForm = () => {
    const errors = {};
    if (!formValues.fullName.trim()) {
      errors.fullName = "Full Name is required";
    }
    if (!formValues.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      errors.email = "Email address is invalid";
    }
    if (!formValues.subject.trim()) {
      errors.subject = "Subject is required";
    }
    if (!formValues.message.trim()) {
      errors.message = "Message is required";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const submit = useSubmit();

  const sendEmails = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    if (validateForm()) {
      submit(formValues, { replace: true, method: "POST" });
      // form values should be blank after submission of form?
      shopify.toast.show("Form Submit Successfully");
      setFormValues(initialFormValues);

    } else {
      console.log("Form has errors, cannot submit");
    }
  };

  return (
    <SkeletonPage title="Instafeed" fullWidth>
      <Page>
        <div className="support_form_title_bg" style={{backgroundImage: `url(${SupportBg})`}}>
          <h2>Support Form</h2>
        </div>
        <div className="form_layout_wrapper form_support_wrapper">
          <Form onSubmit={sendEmails} method="post" action="/app/support">
            <FormLayout>
              <TextField
                label="Full Name"
                value={formValues.fullName}
                onChange={(newValue) => handleChangeText("fullName", newValue)}
                type="text"
                autoComplete="off"
                name="fullName"
                required
                error={errors.fullName}
              />
              <TextField
                label="Email"
                value={formValues.email}
                onChange={(newValue) => handleChangeText("email", newValue)}
                type="email"
                autoComplete="off"
                name="email"
                required
                error={errors.email}
              />
              <TextField
                label="Subject"
                value={formValues.subject}
                onChange={(newValue) => handleChangeText("subject", newValue)}
                type="text"
                autoComplete="off"
                name="subject"
                required
                error={errors.subject}
              />
              <TextField
                label="Store Password"
                value={formValues.storePassword}
                onChange={(newValue) =>
                  handleChangeText("storePassword", newValue)
                }
                type="password"
                autoComplete="off"
                name="storePassword"
              />
              <TextField
                label="Message"
                value={formValues.message}
                onChange={(newValue) => handleChangeText("message", newValue)}
                multiline={5}
                autoComplete="off"
                name="message"
                required
                error={errors.message}
              />
              <div className="button_support_form">
                <Button submit>Submit</Button>
              </div>
            </FormLayout>
          </Form>
        </div>
      </Page>
    </SkeletonPage>
  );
};
export default SupportForm;