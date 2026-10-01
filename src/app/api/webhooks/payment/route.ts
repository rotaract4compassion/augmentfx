import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// This would securely handle callbacks from AzamPay / Mobile Money aggregators.
// Since we don't have the actual AzamPay keys, we'll build the robust schema and flow.

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder-key-to-prevent-crash'

// We must use the service_role key to bypass RLS when updating payment status securely via webhook
const supabase = createClient(supabaseUrl, supabaseServiceKey)

export async function POST(req: Request) {
  try {
    const body = await req.json()
    
    // Example AzamPay webhook payload structure
    const { transactionId, msisdn, amount, referenceId, status } = body

    // 1. Verify webhook signature (Stub)
    // const signature = req.headers.get('x-azam-signature')
    // verifySignature(signature, body)

    // 2. We only process SUCCESSFUL payments
    if (status !== 'SUCCESS') {
      return NextResponse.json({ message: 'Ignored non-success status' }, { status: 200 })
    }

    // 3. Find the registration linked to this referenceId (which we passed when initiating payment)
    const { data: registration, error: fetchError } = await supabase
      .from('registrations')
      .select('id, mode, status')
      .eq('payment_reference', referenceId)
      .single()

    if (fetchError || !registration) {
      console.error('Registration not found for reference:', referenceId)
      return NextResponse.json({ error: 'Registration not found' }, { status: 404 })
    }

    if (registration.status === 'PAID') {
      return NextResponse.json({ message: 'Already paid' }, { status: 200 })
    }

    // 4. Generate Bib Number (M- for Marathon, C- for Cycling, W- for Walkathon)
    // We get the count of paid participants in this mode to generate the sequential number.
    const prefix = registration.mode === 'Marathon' ? 'M' : registration.mode === 'Cycling' ? 'C' : 'W'
    
    const { count, error: countError } = await supabase
      .from('registrations')
      .select('id', { count: 'exact', head: true })
      .eq('mode', registration.mode)
      .eq('status', 'PAID')

    const sequentialNumber = (count || 0) + 1
    const bibNumber = `${prefix}-${sequentialNumber.toString().padStart(3, '0')}`

    // 5. Update Registration to PAID and assign Bib
    const { error: updateError } = await supabase
      .from('registrations')
      .update({ 
        status: 'PAID',
        bib_number: bibNumber,
        payment_transaction_id: transactionId,
        amount_paid: amount,
        paid_at: new Date().toISOString()
      })
      .eq('id', registration.id)

    if (updateError) {
      console.error('Error updating registration:', updateError)
      return NextResponse.json({ error: 'Database update failed' }, { status: 500 })
    }

    // 6. Return 200 to acknowledge receipt to the payment gateway
    return NextResponse.json({ message: 'Payment processed, bib assigned', bib: bibNumber }, { status: 200 })

  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
