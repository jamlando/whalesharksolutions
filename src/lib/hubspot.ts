import { Client } from '@hubspot/api-client'
import type { PublicObjectSearchRequest, SimplePublicObjectInputForCreate } from '@hubspot/api-client/lib/codegen/crm/contacts'

if (!process.env.HUBSPOT_API_KEY) {
  throw new Error('HUBSPOT_API_KEY is not defined in environment variables')
}

const hubspotClient = new Client({ accessToken: process.env.HUBSPOT_API_KEY })

export interface ContactProperties {
  email: string
  firstname?: string
  lastname?: string
  company?: string
  phone?: string
  website?: string
}

export async function createOrUpdateContact(properties: ContactProperties) {
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
          createdate: new Date().toISOString(),
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