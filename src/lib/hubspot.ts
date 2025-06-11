import { Client } from '@hubspot/api-client'
import type { PublicObjectSearchRequest, SimplePublicObjectInputForCreate } from '@hubspot/api-client/lib/codegen/crm/contacts'

// Check for required environment variables
const requiredEnvVars = {
  HUBSPOT_API_KEY: process.env.HUBSPOT_API_KEY,
  HUBSPOT_PORTAL_ID: process.env.HUBSPOT_PORTAL_ID,
}

// Validate environment variables
const missingEnvVars = Object.entries(requiredEnvVars)
  .filter(([_, value]) => !value)
  .map(([key]) => key)

if (missingEnvVars.length > 0) {
  console.warn(
    `Missing required environment variables: ${missingEnvVars.join(', ')}. ` +
    'HubSpot integration will not be available.'
  )
}

// Initialize HubSpot client only if API key is available
const hubspotClient = process.env.HUBSPOT_API_KEY 
  ? new Client({ accessToken: process.env.HUBSPOT_API_KEY })
  : null

export interface ContactProperties {
  email: string
  firstname?: string
  lastname?: string
  company?: string
  phone?: string
  website?: string
}

export async function createOrUpdateContact(properties: ContactProperties) {
  if (!hubspotClient) {
    throw new Error('HubSpot client is not initialized. Please check your environment variables.')
  }

  try {
    // First, try to find the contact by email
    const searchRequest: PublicObjectSearchRequest = {
      filterGroups: [
        {
          filters: [
            {
              propertyName: 'email',
              operator: 'EQ',
              value: properties.email,
            },
          ],
        },
      ],
      properties: ['email', 'firstname', 'lastname', 'company', 'phone', 'website'],
      limit: 1,
      sorts: [],
      after: 0,
    }

    const searchResponse = await hubspotClient.crm.contacts.searchApi.doSearch(searchRequest)
    const existingContact = searchResponse.results[0]

    if (existingContact) {
      // Update existing contact
      const updateResponse = await hubspotClient.crm.contacts.basicApi.update(
        existingContact.id,
        {
          properties: {
            ...properties,
            hs_lead_status: 'NEW', // Reset lead status
            last_modified_date: new Date().toISOString(),
          },
        }
      )
      return { contact: updateResponse, isNew: false }
    } else {
      // Create new contact
      const createRequest: SimplePublicObjectInputForCreate = {
        properties: {
          ...properties,
          hs_lead_status: 'NEW',
        },
        associations: [],
      }
      const createResponse = await hubspotClient.crm.contacts.basicApi.create(createRequest)
      return { contact: createResponse, isNew: true }
    }
  } catch (error) {
    console.error('HubSpot API Error:', error)
    throw new Error('Failed to create or update contact in HubSpot')
  }
}

// Note: Workflow enrollment is currently disabled as it requires additional setup
// in HubSpot. We can implement this once you have a workflow set up.
export async function addContactToWorkflow(contactId: string, workflowId: string) {
  console.warn('Workflow enrollment is not yet implemented')
  // Implementation will be added once workflow is set up in HubSpot
  return Promise.resolve()
} 