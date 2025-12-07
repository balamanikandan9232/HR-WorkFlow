export const mockAutomations = [
  {
    id: "send_email",
    label: "Send Email Notification",
    params: [
      {
        key: "to",
        type: "string",
        required: true,
        hint: "Recipient email or workflow variable",
      },
      { key: "subject", type: "string", required: true },
      { key: "body", type: "text", required: false },
    ],
  },
  {
    id: "generate_doc",
    label: "Generate Offer Letter PDF",
    params: [
      { key: "template_id", type: "string", required: true },
      {
        key: "recipient_field",
        type: "string",
        required: true,
        hint: "Employee ID or Name",
      },
    ],
  },
];
