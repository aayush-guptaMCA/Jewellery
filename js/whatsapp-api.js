/* =============================================
   WhatsApp Business API Integration
   Shree Ram Ji Diamond Palace
   =============================================
   
   SETUP:
   1. Neeche ACCESS_TOKEN mein apna Facebook Graph API token daalo
   2. RECIPIENT_PHONE mein apna WhatsApp number daalo (country code ke saath, e.g. 919876543210)
   3. PHONE_NUMBER_ID already set hai (1097985103408218)
   
   NOTE: Production mein access token ko backend server se manage karo,
         client-side mein token expose hota hai.
============================================= */

const WHATSAPP_CONFIG = {
    ACCESS_TOKEN: 'EAASioumecN4BRoZCP6JrtxFl8W6LQZCwZACNNyeZCBSnZCAq73YG2WjDKOaivgyRoWjOMLa78xmwbUZA0zhTmuy6xWb4JO0AcpH6OddPKQ7VOF1gmRZC9PRpaCzDieBcNrurACZCq4oiW7kEGZBB2z4CKGjphEYiJaoIqfLDwb9ZChImvwMADsTAvkOrWmmdjZBRGWE73U2mMt1x4U5WqNIV4uHG25a6WSXibcw8LbDSr4gYvA9IovXaG4FyejbVNpAGqGBm8ttWDmAL9QA0ZA8b4d4ZByHTK',
    PHONE_NUMBER_ID: '1097985103408218',
    RECIPIENT_PHONE: '919045010151',
    API_VERSION: 'v25.0'
};

/**
 * Send enquiry details to your WhatsApp via Facebook Graph API
 * @param {Object} enquiryData - { productName, customerName, phone, email, message }
 * @returns {Promise<Object>} - API response
 */
async function sendWhatsAppEnquiry(enquiryData) {
    const { productName, customerName, phone, email, message } = enquiryData;

  

    const url = `https://graph.facebook.com/${WHATSAPP_CONFIG.API_VERSION}/${WHATSAPP_CONFIG.PHONE_NUMBER_ID}/messages`;

const payload = {
    messaging_product: "whatsapp",
    to: WHATSAPP_CONFIG.RECIPIENT_PHONE,
    type: "template",
    template: {
        name: "enquiryform",
        language: {
            code: "en"
        },
        components: [
            {
                type: "body",
                parameters: [
                    {
                        type: "text",
                        parameter_name: "product_name",
                        text: productName
                    },
                    {
                        type: "text",
                        parameter_name: "customer_name",
                        text: customerName
                    },
                    {
                        type: "text",
                        parameter_name: "phone_number",
                        text: phone
                    },
                    {
                        type: "text",
                        parameter_name: "email_address",
                        text: email
                    },
                    {
                        type: "text",
                        parameter_name: "customer_message",
                        text: message
                    }
                ]
            }
        ]
    }
};
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${WHATSAPP_CONFIG.ACCESS_TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('WhatsApp API Error:', data);
            throw new Error(data.error?.message || 'WhatsApp message failed');
        }

        console.log('✅ WhatsApp message sent successfully:', data);
        return data;

    } catch (error) {
        console.error('❌ WhatsApp API Error:', error);
        throw error;
    }
}
