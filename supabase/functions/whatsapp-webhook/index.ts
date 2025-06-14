
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { WhatsAppBotService } from "../../../src/services/WhatsAppBotService.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { method } = req
    
    if (method === 'GET') {
      // WhatsApp webhook verification
      const url = new URL(req.url)
      const mode = url.searchParams.get('hub.mode')
      const token = url.searchParams.get('hub.verify_token')
      const challenge = url.searchParams.get('hub.challenge')
      
      const VERIFY_TOKEN = Deno.env.get('WHATSAPP_VERIFY_TOKEN')
      
      if (mode === 'subscribe' && token === VERIFY_TOKEN) {
        console.log('WhatsApp webhook verified')
        return new Response(challenge, { 
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'text/plain' }
        })
      }
      
      return new Response('Forbidden', { status: 403, headers: corsHeaders })
    }
    
    if (method === 'POST') {
      // Handle incoming WhatsApp messages
      const body = await req.json()
      
      console.log('Incoming WhatsApp webhook:', JSON.stringify(body, null, 2))
      
      // Extract message data from WhatsApp webhook payload
      const entry = body.entry?.[0]
      const changes = entry?.changes?.[0]
      const value = changes?.value
      const messages = value?.messages?.[0]
      
      if (messages) {
        const from = messages.from
        const messageText = messages.text?.body || ''
        const messageType = messages.type
        
        // Only process text messages for now
        if (messageType === 'text') {
          const whatsappMessage = {
            from: from,
            message: messageText,
            timestamp: Date.now()
          }
          
          // Process message through bot service
          const response = await WhatsAppBotService.handleIncomingMessage(whatsappMessage)
          
          // Send response back to WhatsApp
          await sendWhatsAppMessage(from, response)
        }
      }
      
      return new Response('OK', { 
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'text/plain' }
      })
    }
    
    return new Response('Method not allowed', { status: 405, headers: corsHeaders })
    
  } catch (error) {
    console.error('WhatsApp webhook error:', error)
    return new Response('Internal server error', { 
      status: 500, 
      headers: corsHeaders 
    })
  }
})

async function sendWhatsAppMessage(to: string, message: string) {
  const WHATSAPP_TOKEN = Deno.env.get('WHATSAPP_ACCESS_TOKEN')
  const PHONE_NUMBER_ID = Deno.env.get('WHATSAPP_PHONE_NUMBER_ID')
  
  const url = `https://graph.facebook.com/v17.0/${PHONE_NUMBER_ID}/messages`
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${WHATSAPP_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      to: to,
      type: 'text',
      text: {
        body: message
      }
    })
  })
  
  if (!response.ok) {
    console.error('Failed to send WhatsApp message:', await response.text())
  }
  
  return response.ok
}
