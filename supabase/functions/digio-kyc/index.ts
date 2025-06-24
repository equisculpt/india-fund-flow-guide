
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { action, data } = await req.json()
    
    const DIGIO_CLIENT_ID = Deno.env.get('DIGIO_CLIENT_ID')
    const DIGIO_CLIENT_SECRET = Deno.env.get('DIGIO_CLIENT_SECRET')
    
    if (!DIGIO_CLIENT_ID || !DIGIO_CLIENT_SECRET) {
      throw new Error('Digio credentials not configured')
    }

    const digioBaseUrl = 'https://ext.digio.in:444'
    const authHeader = `Basic ${btoa(DIGIO_CLIENT_ID + ':' + DIGIO_CLIENT_SECRET)}`

    let endpoint = ''
    let requestData = {}

    switch (action) {
      case 'initiate_kyc':
        endpoint = '/v2/client/kyc'
        requestData = {
          reference_id: data.referenceId,
          customer_identifier: data.email,
          template_name: 'kyc_template_v1',
          expire_in_days: 30,
          entity_type: 'individual'
        }
        break

      case 'pan_verification':
        endpoint = '/v2/client/kyc/pan_verification'
        requestData = {
          reference_id: data.referenceId,
          document_type: 'pan',
          document_number: data.panNumber,
          customer_name: data.customerName,
          entity_type: 'individual'
        }
        break

      case 'aadhaar_verification':
        endpoint = '/v2/client/kyc/aadhaar_verification'
        requestData = {
          reference_id: data.referenceId,
          document_type: 'aadhaar',
          document_number: data.aadhaarNumber,
          customer_name: data.customerName,
          entity_type: 'individual'
        }
        break

      case 'nri_kyc':
        endpoint = '/v2/client/kyc/nri'
        requestData = {
          reference_id: data.referenceId,
          customer_identifier: data.email,
          customer_name: data.name,
          mobile: data.mobile,
          nationality: data.nationality,
          passport_number: data.passportNumber,
          country_of_residence: data.countryOfResidence,
          template_name: 'nri_kyc_template_v1',
          expire_in_days: 30
        }
        break

      case 'corporate_kyc':
        endpoint = '/v2/client/kyc/corporate'
        requestData = data
        break

      case 'get_status':
        endpoint = `/v2/client/kyc/${data.referenceId}`
        const statusResponse = await fetch(`${digioBaseUrl}${endpoint}`, {
          method: 'GET',
          headers: {
            'Authorization': authHeader,
            'Content-Type': 'application/json'
          }
        })
        
        const statusResult = await statusResponse.json()
        return new Response(JSON.stringify(statusResult), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        })

      default:
        throw new Error('Invalid action')
    }

    const response = await fetch(`${digioBaseUrl}${endpoint}`, {
      method: 'POST',
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    })

    const result = await response.json()
    
    if (!response.ok) {
      throw new Error(result.message || 'Digio API request failed')
    }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })

  } catch (error) {
    console.error('Digio KYC Error:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})
