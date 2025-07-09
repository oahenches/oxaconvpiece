import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

export interface Message {
  text: string;
  attachments?: any[]; // Adjust this type based on your actual data
}
const START_CONV_ENDPOINT = 'http://localhost:4001/conversation/conversationCreate'
const RUN_CONV_ENDPOINT = 'http://localhost:4001/conversation/conversationCreate'

export async function startConversation(): Promise<string> {
  try {
    const response = await axios.post(START_CONV_ENDPOINT, {
      payload: {}
    });

    const data = response.data;
    if (response.status !== 200 || data.isError) {
      throw new Error(`Erreur conversationCreate: ${JSON.stringify(data)}`);
    }

    const conversationUuid = data.payload.uuid;
    console.log('Conversation created', conversationUuid);
    return conversationUuid;
  } catch (err: any) {
    throw new Error(`Failed to start conversation: ${err.message}`);
  }
}

export async function runConversation(
  conversationUuid: string,
  llmUuid: string,
  message: Message
): Promise<any> {
  const messageUuid = uuidv4();

  const payload = {
    payload: {
      message: {
	uuid: messageUuid,
	text: message.text,
	sender: {
	  senderType: 'USER',
	  interlocutorUuid: llmUuid
	},
	attachments: message.attachments || [],
	conversationUuid: conversationUuid,
	llmConfig: []
      },
      interlocutorUuid: llmUuid
    }
  };

  try {
    const response = await axios.post('http://localhost:4001/runner/runnerStart', payload);
    if (response.status !== 200) {
      throw new Error(`Erreur runnerStart: ${response.statusText}`);
    }

    return response.data;
  } catch (err: any) {
    throw new Error(`Failed to run conversation: ${err.message}`);
  }
}

