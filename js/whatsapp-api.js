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
    ACCESS_TOKEN: 'EAASioumecN4BRrYD1FzEZCjfa6I95sDZC2txLHSiOad4CIMgOlx0zBkkVZByqNiw8EgmNOwUTicvqu23uiVt1HFFYAsc6u0tsKAZBSmBc5S6BEuIpewPipu2QkN8VQnMTTIddWLHTtHg035o7u3eFINk48GZCi5XeLgGOwOWzKAEINR4i4LiuEspfJAtxmNZCYwiqwbYOfOi1tZAfsfPXfnuWCTlJTyGfEgPNBSjNcZA97dDGPmZC93tHuce3JkQW2muMgtSxqnEgfdsyOLdCWpK9HjRAfgZDZD',
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

    // Format the enquiry message
    const enquiryText = [
        `🔔 *New Enquiry Received!*`,
        `━━━━━━━━━━━━━━━━━━`,
        ``,
        `📦 *Product:* ${productName}`,
        `👤 *Customer:* ${customerName}`,
        `📞 *Phone:* ${phone}`,
        email ? `📧 *Email:* ${email}` : '',
        message ? `💬 *Message:* ${message}` : '',
        ``,
        `━━━━━━━━━━━━━━━━━━`,
        `🕐 *Time:* ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`,
        `🌐 *Source:* Shree Ram Ji Diamond Palace Website`
    ].filter(line => line !== '').join('\n');

    const url = `https://graph.facebook.com/${WHATSAPP_CONFIG.API_VERSION}/${WHATSAPP_CONFIG.PHONE_NUMBER_ID}/messages`;

    // const payload = {
    //     messaging_product: 'whatsapp',
    //     to: WHATSAPP_CONFIG.RECIPIENT_PHONE,
    //     type: 'text',
    //     text: {
    //         preview_url: false,
    //         body: enquiryText
    //     }
    // };
    const payload = {
        messaging_product: 'whatsapp',
        to: WHATSAPP_CONFIG.RECIPIENT_PHONE,
        type: 'template',
        template: {
            name: 'hello_world',
            language: {
                code: 'en_US'
            }
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
