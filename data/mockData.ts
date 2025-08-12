import type { Contact, Message, MessageTemplate } from "@/types";

export const mockContacts: Contact[] = [
  {
    id: "1",
    name: "Ruben Fernandez",
    phone: "+91 XXXXXXXXX",
    whatsapp: "+91 XXXXXXXXX",
    email: "ruben@example.com",
    lastMessage: "Excellent! Thank you for the quick confirmation.",
    lastMessageTime: "08:08 PM",
    timestamp: "08:08 PM",
    avatar: "RF",
    isOnline: true,
    unreadCount: 1,
    optIn: true,
    iRateValue: 1,
    lastInteraction: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
  },
  {
    id: "2",
    name: "Sudheer Malhotra",
    phone: "+91 XXXXXXXXX",
    whatsapp: "+91 XXXXXXXXX",
    email: "sudheer@example.com",
    lastMessage: "Great! Thank you for the quick confirmation.",
    lastMessageTime: "07:30 PM",
    timestamp: "07:30 PM",
    avatar: "SM",
    isOnline: false,
    unreadCount: 0,
    optIn: true,
    lastInteraction: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
  },
  {
    id: "3",
    name: "Rishab Shetty",
    phone: "+91 XXXXXXXXX",
    whatsapp: "+91 XXXXXXXXX",
    email: "rishab@example.com",
    lastMessage: "Thanks! I was able to reset my password successfully.",
    lastMessageTime: "07:08 PM",
    timestamp: "07:08 PM",
    avatar: "RS",
    isOnline: false,
    unreadCount: 0,
    optIn: false,
    lastInteraction: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
  },
  {
    id: "4",
    name: "Manisha Pal",
    phone: "+91 XXXXXXXXX",
    whatsapp: "+91 XXXXXXXXX",
    email: "manisha@example.com",
    lastMessage: "Perfect! I'll be there on time.",
    lastMessageTime: "07:03 PM",
    timestamp: "07:03 PM",
    avatar: "MP",
    isOnline: false,
    unreadCount: 0,
    optIn: true,
    lastInteraction: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
  },
  {
    id: "5",
    name: "John Fernandez",
    phone: "+91 XXXXXXXXX",
    whatsapp: "+91 XXXXXXXXX",
    email: "john@example.com",
    lastMessage: "Sounds great! I'll definitely attend.",
    lastMessageTime: "06:44 PM",
    timestamp: "06:44 PM",
    avatar: "JF",
    isOnline: false,
    unreadCount: 0,
    tags: ["Enquiry"],
    optIn: true,
    lastInteraction: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
  },
  {
    id: "6",
    name: "Harpreet Kaur",
    phone: "+91 XXXXXXXXX",
    whatsapp: "+91 XXXXXXXXX",
    email: "harpreet@example.com",
    lastMessage: "I need more details about pricing and packages.",
    lastMessageTime: "06:42 PM",
    timestamp: "06:42 PM",
    avatar: "HK",
    isOnline: false,
    unreadCount: 0,
    optIn: false,
    lastInteraction: new Date(Date.now() - 25 * 60 * 60 * 1000), // 25 hours ago (inactive)
  },
  {
    id: "7",
    name: "Jaspreet Bhaati",
    phone: "+91 XXXXXXXXX",
    whatsapp: "+91 XXXXXXXXX",
    email: "jaspreet@example.com",
    lastMessage: "Sounds great! I'll definitely attend.",
    lastMessageTime: "06:39 PM",
    timestamp: "06:39 PM",
    avatar: "JB",
    isOnline: false,
    unreadCount: 0,
    tags: ["Platinum Customer"],
    optIn: true,
    lastInteraction: new Date(Date.now() - 7 * 60 * 60 * 1000), // 7 hours ago
  },
];

export const mockMessages: Message[] = [
  // Ruben Fernandez (active - 2 hours ago) - Customer inquiry conversation
  {
    id: "1",
    contactId: "1",
    content:
      "Hi, I'm interested in your premium subscription plan. Can you tell me more about the features?",
    timestamp: "06:05 PM",
    createdAt: new Date(
      Date.now() - 2 * 60 * 60 * 1000 - 5 * 60 * 1000
    ).toISOString(),
    isFromContact: true,
    status: "read",
  },
  {
    id: "1-2",
    contactId: "1",
    content:
      "Hello **Ruben**! Welcome to **ABC Company**!\n\nHi **Ruben**, welcome to our service! We're excited to have you on board. Your account is now active and ready to use.\n\nNeed help? Contact our support team anytime.",
    timestamp: "06:06 PM",
    createdAt: new Date(
      Date.now() - 2 * 60 * 60 * 1000 - 4 * 60 * 1000
    ).toISOString(),
    isFromContact: false,
    status: "delivered",
    templateData: {
      id: "1",
      name: "Welcome Message",
      language: "en_US",
      category: "MARKETING",
      createdAt: "2023-10-26T10:00:00Z",
      components: [
        {
          type: "HEADER",
          format: "TEXT",
          text: "Welcome to **ABC Company**!",
        },
        {
          type: "BODY",
          text: "Hi **Ruben**, welcome to our service! We're excited to have you on board. Your account is now active and ready to use.",
        },
        {
          type: "FOOTER",
          text: "Need help? Contact our support team anytime.",
        },
        {
          type: "BUTTONS",
          buttons: [
            { type: "QUICK_REPLY", text: "Get Started" },
            { type: "QUICK_REPLY", text: "Contact Support" },
          ],
        },
      ],
    },
  },
  {
    id: "1-3",
    contactId: "1",
    content:
      "Perfect! I'd like to upgrade to the premium plan. How do I proceed?",
    timestamp: "08:08 PM",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    isFromContact: true,
    status: "read",
  },

  // Sudheer Malhotra (active - 3 hours ago) - Order confirmation conversation
  {
    id: "2",
    contactId: "2",
    content: "Thank you for contacting",
    timestamp: "07:30 PM",
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    isFromContact: true,
    status: "read",
  },
  {
    id: "2-1",
    contactId: "2",
    content: "I just placed order #ORD-12345. When will it be delivered?",
    timestamp: "05:25 PM",
    createdAt: new Date(
      Date.now() - 3 * 60 * 60 * 1000 - 10 * 60 * 1000
    ).toISOString(),
    isFromContact: true,
    status: "read",
  },
  {
    id: "2-2",
    contactId: "2",
    content:
      "Hi **Sudheer**, your order #**ORD-12345** has been confirmed! Total amount: $**149.99**. Expected delivery: **Dec 25, 2024**.",
    timestamp: "05:30 PM",
    createdAt: new Date(
      Date.now() - 3 * 60 * 60 * 1000 - 5 * 60 * 1000
    ).toISOString(),
    isFromContact: false,
    status: "delivered",
    templateData: {
      id: "2",
      name: "Order Confirmation",
      language: "en_US",
      category: "TRANSACTIONAL",
      createdAt: "2023-09-15T14:30:00Z",
      components: [
        {
          type: "BODY",
          text: "Hi **Sudheer**, your order #**ORD-12345** has been confirmed! Total amount: $**149.99**. Expected delivery: **Dec 25, 2024**.",
        },
        {
          type: "BUTTONS",
          buttons: [
            {
              type: "URL",
              text: "Track Order",
              url: "https://example.com/track",
            },
            { type: "QUICK_REPLY", text: "Contact Support" },
          ],
        },
      ],
    },
  },
  {
    id: "2-3",
    contactId: "2",
    content: "Great! Thank you for the quick confirmation.",
    timestamp: "07:30 PM",
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    isFromContact: true,
    status: "read",
  },

  // Rishab Shetty (active - 4 hours ago) - Support conversation
  {
    id: "3",
    contactId: "3",
    content: "Thank you for contacting",
    timestamp: "07:08 PM",
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    isFromContact: true,
    status: "read",
  },
  {
    id: "3-1",
    contactId: "3",
    content: "I'm having trouble logging into my account. Can you help?",
    timestamp: "04:05 PM",
    createdAt: new Date(
      Date.now() - 4 * 60 * 60 * 1000 - 5 * 60 * 1000
    ).toISOString(),
    isFromContact: true,
    status: "read",
  },
  {
    id: "3-2",
    contactId: "3",
    content:
      "Hi **Rishab**, we received a request to reset your password. Click the button below to create a new password. This link expires in **30** minutes.",
    timestamp: "04:06 PM",
    createdAt: new Date(
      Date.now() - 4 * 60 * 60 * 1000 - 4 * 60 * 1000
    ).toISOString(),
    isFromContact: false,
    status: "delivered",
    templateData: {
      id: "5",
      name: "Password Reset",
      language: "en_US",
      category: "AUTHENTICATION",
      createdAt: "2023-10-20T11:30:00Z",
      components: [
        {
          type: "BODY",
          text: "Hi **Rishab**, we received a request to reset your password. Click the button below to create a new password. This link expires in **30** minutes.",
        },
        {
          type: "BUTTONS",
          buttons: [
            {
              type: "URL",
              text: "Reset Password",
              url: "https://example.com/reset",
            },
          ],
        },
      ],
    },
  },
  {
    id: "3-3",
    contactId: "3",
    content: "Thanks! I was able to reset my password successfully.",
    timestamp: "07:08 PM",
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    isFromContact: true,
    status: "read",
  },

  // Manisha Pal (active - 5 hours ago) - Appointment booking
  {
    id: "4",
    contactId: "4",
    content: "Thank you for contacting",
    timestamp: "07:03 PM",
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    isFromContact: true,
    status: "read",
  },
  {
    id: "4-1",
    contactId: "4",
    content: "I'd like to book an appointment for next week",
    timestamp: "03:00 PM",
    createdAt: new Date(
      Date.now() - 5 * 60 * 60 * 1000 - 5 * 60 * 1000
    ).toISOString(),
    isFromContact: true,
    status: "read",
  },
  {
    id: "4-2",
    contactId: "4",
    content:
      "Hi **Manisha**, this is a reminder about your appointment with **Dr. Smith** on **Dec 20, 2024** at **2:00 PM**. Please arrive 15 minutes early.",
    timestamp: "03:02 PM",
    createdAt: new Date(
      Date.now() - 5 * 60 * 60 * 1000 - 3 * 60 * 1000
    ).toISOString(),
    isFromContact: false,
    status: "delivered",
    templateData: {
      id: "4",
      name: "Appointment Reminder",
      language: "en_US",
      category: "UTILITY",
      createdAt: "2023-10-15T16:00:00Z",
      components: [
        {
          type: "BODY",
          text: "Hi **Manisha**, this is a reminder about your appointment with **Dr. Smith** on **Dec 20, 2024** at **2:00 PM**. Please arrive 15 minutes early.",
        },
        {
          type: "BUTTONS",
          buttons: [
            { type: "QUICK_REPLY", text: "Confirm" },
            { type: "QUICK_REPLY", text: "Reschedule" },
            { type: "QUICK_REPLY", text: "Cancel" },
          ],
        },
      ],
    },
  },
  {
    id: "4-3",
    contactId: "4",
    content: "Perfect! I'll be there on time.",
    timestamp: "07:03 PM",
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    isFromContact: true,
    status: "read",
  },

  // John Fernandez (active - 6 hours ago) - Payment confirmation
  {
    id: "5",
    contactId: "5",
    content: "Thank you for contacting",
    timestamp: "06:44 PM",
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    isFromContact: true,
    status: "read",
  },
  {
    id: "5-1",
    contactId: "5",
    content: "I just made a payment for invoice INV-2024-001. Can you confirm?",
    timestamp: "02:40 PM",
    createdAt: new Date(
      Date.now() - 6 * 60 * 60 * 1000 - 5 * 60 * 1000
    ).toISOString(),
    isFromContact: true,
    status: "read",
  },
  {
    id: "5-2",
    contactId: "5",
    content:
      "**Payment Confirmed ✅**\n\nThank you **John**! We've received your payment of $**250.00** for invoice #**INV-2024-001**. Your account has been updated.\n\nQuestions? Reply to this message or call support.",
    timestamp: "02:42 PM",
    createdAt: new Date(
      Date.now() - 6 * 60 * 60 * 1000 - 3 * 60 * 1000
    ).toISOString(),
    isFromContact: false,
    status: "delivered",
    templateData: {
      id: "6",
      name: "Payment Received",
      language: "en_US",
      category: "TRANSACTIONAL",
      createdAt: "2023-10-22T13:45:00Z",
      components: [
        {
          type: "HEADER",
          format: "TEXT",
          text: "**Payment Confirmed ✅**",
        },
        {
          type: "BODY",
          text: "Thank you **John**! We've received your payment of $**250.00** for invoice #**INV-2024-001**. Your account has been updated.",
        },
        {
          type: "FOOTER",
          text: "Questions? Reply to this message or call support.",
        },
      ],
    },
  },
  {
    id: "5-3",
    contactId: "5",
    content: "Excellent! Thank you for the quick confirmation.",
    timestamp: "06:44 PM",
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    isFromContact: true,
    status: "read",
  },

  // Harpreet Kaur (inactive - 25 hours ago) - 24-hour window closed
  {
    id: "6",
    contactId: "6",
    content: "Thank you for contacting",
    timestamp: "06:42 PM",
    createdAt: new Date(Date.now() - 25 * 60 * 60 * 1000).toISOString(),
    isFromContact: true,
    status: "read",
  },
  {
    id: "6-1",
    contactId: "6",
    content:
      "Hi, I'm interested in your services. Can you send me more information?",
    timestamp: "05:40 PM",
    createdAt: new Date(
      Date.now() - 25 * 60 * 60 * 1000 - 5 * 60 * 1000
    ).toISOString(),
    isFromContact: true,
    status: "read",
  },
  {
    id: "6-2",
    contactId: "6",
    content:
      "Hello! Thank you for your interest. I'd be happy to help you with information about our services. What specific area are you most interested in?",
    timestamp: "05:42 PM",
    createdAt: new Date(
      Date.now() - 25 * 60 * 60 * 1000 - 3 * 60 * 1000
    ).toISOString(),
    isFromContact: false,
    status: "delivered",
  },
  {
    id: "6-3",
    contactId: "6",
    content: "I need more details about pricing and packages.",
    timestamp: "06:42 PM",
    createdAt: new Date(Date.now() - 25 * 60 * 60 * 1000).toISOString(),
    isFromContact: true,
    status: "read",
  },

  // Jaspreet Bhaati (active - 7 hours ago) - Event invitation
  {
    id: "7",
    contactId: "7",
    content: "Thank you for contacting",
    timestamp: "06:39 PM",
    createdAt: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(),
    isFromContact: true,
    status: "read",
  },
  {
    id: "7-1",
    contactId: "7",
    content: "Do you have any upcoming events or webinars?",
    timestamp: "01:35 PM",
    createdAt: new Date(
      Date.now() - 7 * 60 * 60 * 1000 - 5 * 60 * 1000
    ).toISOString(),
    isFromContact: true,
    status: "read",
  },
  {
    id: "7-2",
    contactId: "7",
    content:
      "**You're Invited! 🎊**\n\nHi **Jaspreet**, join us for **Product Launch Event** on **Dec 15, 2024** at **6:00 PM**. Special guest: **Tech CEO**. Limited seats available!\n\nTerms apply. Cannot be combined with other offers.",
    timestamp: "01:37 PM",
    createdAt: new Date(
      Date.now() - 7 * 60 * 60 * 1000 - 3 * 60 * 1000
    ).toISOString(),
    isFromContact: false,
    status: "delivered",
    templateData: {
      id: "8",
      name: "Event Invitation",
      language: "en_US",
      category: "MARKETING",
      createdAt: "2023-10-28T14:20:00Z",
      components: [
        {
          type: "HEADER",
          format: "TEXT",
          text: "**You're Invited! 🎊**",
        },
        {
          type: "BODY",
          text: "Hi **Jaspreet**, join us for **Product Launch Event** on **Dec 15, 2024** at **6:00 PM**. Special guest: **Tech CEO**. Limited seats available!",
        },
        {
          type: "FOOTER",
          text: "Terms apply. Cannot be combined with other offers.",
        },
        {
          type: "BUTTONS",
          buttons: [
            { type: "QUICK_REPLY", text: "I'll Attend" },
            { type: "QUICK_REPLY", text: "Can't Make It" },
            { type: "QUICK_REPLY", text: "More Info" },
          ],
        },
      ],
    },
  },
  {
    id: "7-3",
    contactId: "7",
    content: "Sounds great! I'll definitely attend.",
    timestamp: "06:39 PM",
    createdAt: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(),
    isFromContact: true,
    status: "read",
  },
];

export const mockTemplates: MessageTemplate[] = [
  {
    id: "1",
    name: "Welcome Message",
    language: "en_US",
    category: "MARKETING",
    createdAt: "2023-10-26T10:00:00Z",
    components: [
      {
        type: "HEADER",
        format: "TEXT",
        text: "Welcome to {{1}}!",
        example: { header_text: ["ABC Company"] },
      },
      {
        type: "BODY",
        text: "Hi {{1}}, welcome to our service! We're excited to have you on board. Your account is now active and ready to use.",
        example: { body_text: [["John"]] },
      },
      {
        type: "FOOTER",
        text: "Need help? Contact our support team anytime.",
      },
      {
        type: "BUTTONS",
        buttons: [
          { type: "QUICK_REPLY", text: "Get Started" },
          { type: "QUICK_REPLY", text: "Contact Support" },
        ],
      },
    ],
  },
  {
    id: "2",
    name: "Order Confirmation",
    language: "en_US",
    category: "TRANSACTIONAL",
    createdAt: "2023-09-15T14:30:00Z",
    components: [
      {
        type: "BODY",
        text: "Hi {{1}}, your order #{{2}} has been confirmed! Total amount: ${{3}}. Expected delivery: {{4}}.",
        example: { body_text: [["John", "12345", "99.99", "Dec 25, 2024"]] },
      },
      {
        type: "BUTTONS",
        buttons: [
          {
            type: "URL",
            text: "Track Order",
            url: "https://example.com/track",
          },
          { type: "QUICK_REPLY", text: "Contact Support" },
        ],
      },
    ],
  },
  {
    id: "3",
    name: "Seasonal Promotion",
    language: "en_US",
    category: "MARKETING",
    createdAt: "2023-11-01T09:00:00Z",
    components: [
      {
        type: "HEADER",
        format: "TEXT",
        text: "🎉 {{1}} Sale is Live!",
        example: { header_text: ["Black Friday"] },
      },
      {
        type: "BODY",
        text: "Don't miss out, {{1}}! Get {{2}} off on all items. Use code {{3}} at checkout. Sale ends {{4}}!",
        example: { body_text: [["John", "50%", "SAVE50", "midnight tonight"]] },
      },
      {
        type: "BUTTONS",
        buttons: [
          {
            type: "URL",
            text: "Shop Now",
            url: "https://example.com/shop",
          },
          { type: "QUICK_REPLY", text: "View Deals" },
        ],
      },
    ],
  },
  {
    id: "4",
    name: "Appointment Reminder",
    language: "en_US",
    category: "UTILITY",
    createdAt: "2023-10-15T16:00:00Z",
    components: [
      {
        type: "BODY",
        text: "Hi {{1}}, this is a reminder about your appointment with {{2}} on {{3}} at {{4}}. Please arrive 15 minutes early.",
        example: {
          body_text: [["John", "Dr. Smith", "Dec 20, 2024", "2:00 PM"]],
        },
      },
      {
        type: "BUTTONS",
        buttons: [
          { type: "QUICK_REPLY", text: "Confirm" },
          { type: "QUICK_REPLY", text: "Reschedule" },
          { type: "QUICK_REPLY", text: "Cancel" },
        ],
      },
    ],
  },
  {
    id: "5",
    name: "Password Reset",
    language: "en_US",
    category: "AUTHENTICATION",
    createdAt: "2023-10-20T11:30:00Z",
    components: [
      {
        type: "BODY",
        text: "Hi {{1}}, we received a request to reset your password. Click the button below to create a new password. This link expires in {{2}} minutes.",
        example: { body_text: [["John", "30"]] },
      },
      {
        type: "BUTTONS",
        buttons: [
          {
            type: "URL",
            text: "Reset Password",
            url: "https://example.com/reset",
          },
        ],
      },
    ],
  },
  {
    id: "6",
    name: "Payment Received",
    language: "en_US",
    category: "TRANSACTIONAL",
    createdAt: "2023-10-22T13:45:00Z",
    components: [
      {
        type: "HEADER",
        format: "TEXT",
        text: "Payment Confirmed ✅",
      },
      {
        type: "BODY",
        text: "Thank you {{1}}! We've received your payment of ${{2}} for invoice #{{3}}. Your account has been updated.",
        example: { body_text: [["John", "250.00", "INV-2024-001"]] },
      },
      {
        type: "FOOTER",
        text: "Questions? Reply to this message or call support.",
      },
    ],
  },
  {
    id: "7",
    name: "Support Ticket Update",
    language: "en_US",
    category: "UTILITY",
    createdAt: "2023-10-25T08:15:00Z",
    components: [
      {
        type: "BODY",
        text: "Hi {{1}}, your support ticket #{{2}} has been updated. Status: {{3}}. Our team will contact you within {{4}} hours.",
        example: { body_text: [["John", "SUP-12345", "In Progress", "24"]] },
      },
      {
        type: "BUTTONS",
        buttons: [
          {
            type: "URL",
            text: "View Ticket",
            url: "https://example.com/ticket",
          },
          { type: "QUICK_REPLY", text: "Add Comment" },
        ],
      },
    ],
  },
  {
    id: "8",
    name: "Event Invitation",
    language: "en_US",
    category: "MARKETING",
    createdAt: "2023-10-28T14:20:00Z",
    components: [
      {
        type: "HEADER",
        format: "TEXT",
        text: "You're Invited! 🎊",
      },
      {
        type: "BODY",
        text: "Hi {{1}}, join us for {{2}} on {{3}} at {{4}}. Special guest: {{5}}. Limited seats available!",
        example: {
          body_text: [
            [
              "John",
              "Product Launch Event",
              "Dec 15, 2024",
              "6:00 PM",
              "Tech CEO",
            ],
          ],
        },
      },
      {
        type: "FOOTER",
        text: "Terms apply. Cannot be combined with other offers.",
      },
      {
        type: "BUTTONS",
        buttons: [
          { type: "QUICK_REPLY", text: "I'll Attend" },
          { type: "QUICK_REPLY", text: "Can't Make It" },
          { type: "QUICK_REPLY", text: "More Info" },
        ],
      },
    ],
  },
  {
    id: "9",
    name: "Restaurant Promotion",
    language: "en_US",
    category: "MARKETING",
    createdAt: "2023-11-05T12:00:00Z",
    components: [
      {
        type: "HEADER",
        format: "IMAGE",
        example: { header_handle: ["/placeholder.svg?height=200&width=400"] },
      },
      {
        type: "BODY",
        text: "Hi {{1}}! 🍕 Enjoy {{2}} off your next order at {{3}}. Valid until {{4}}. Free delivery on orders over ${{5}}!",
        example: {
          body_text: [["John", "25%", "Mario's Pizza", "Dec 31, 2024", "30"]],
        },
      },
      {
        type: "FOOTER",
        text: "Terms apply. Cannot be combined with other offers.",
      },
      {
        type: "BUTTONS",
        buttons: [
          {
            type: "URL",
            text: "Order Online",
            url: "https://example.com/order",
          },
          {
            type: "PHONE_NUMBER",
            text: "Call Restaurant",
            phone_number: "+1234567890",
          },
        ],
      },
    ],
  },
  {
    id: "10",
    name: "Product Demo",
    language: "en_US",
    category: "MARKETING",
    createdAt: "2023-11-10T15:30:00Z",
    components: [
      {
        type: "HEADER",
        format: "VIDEO",
        example: { header_handle: ["/placeholder.svg?height=300&width=400"] },
      },
      {
        type: "BODY",
        text: "Hi {{1}}! Check out our latest {{2}} in action. See how it can save you {{3}} hours per week. Special launch price: ${{4}} (was ${{5}}).",
        example: {
          body_text: [["John", "productivity tool", "10", "99", "149"]],
        },
      },
      {
        type: "FOOTER",
        text: "30-day money-back guarantee • Free setup included",
      },
      {
        type: "BUTTONS",
        buttons: [
          {
            type: "URL",
            text: "Buy Now",
            url: "https://example.com/buy",
          },
          {
            type: "URL",
            text: "Free Trial",
            url: "https://example.com/trial",
          },
          { type: "QUICK_REPLY", text: "Learn More" },
        ],
      },
    ],
  },
  {
    id: "11",
    name: "Invoice Notification",
    language: "en_US",
    category: "TRANSACTIONAL",
    createdAt: "2023-11-12T09:45:00Z",
    components: [
      {
        type: "HEADER",
        format: "DOCUMENT",
        example: { header_handle: ["/placeholder.svg?height=200&width=300"] },
      },
      {
        type: "BODY",
        text: "Hi {{1}}, your invoice #{{2}} for ${{3}} is now available. Due date: {{4}}. Please review the attached document.",
        example: {
          body_text: [["John", "INV-2024-456", "1,250.00", "Dec 30, 2024"]],
        },
      },
      {
        type: "FOOTER",
        text: "ABC Company Ltd. | Tax ID: 123456789 | support@abc.com | Questions? Reply to this message",
      },
      {
        type: "BUTTONS",
        buttons: [
          {
            type: "URL",
            text: "Pay Online",
            url: "https://example.com/pay",
          },
          {
            type: "URL",
            text: "Download PDF",
            url: "https://example.com/invoice.pdf",
          },
          { type: "QUICK_REPLY", text: "Payment Query" },
        ],
      },
    ],
  },
];
