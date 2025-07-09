import { startConversation, runConversation } from '../../persistence/apis/bridge'
import { Message } from '../models/message'

export async function serviceStartConversation(): Promise<string> {
	return await startConversation()
}

export async function serviceRunConversation(uuid: string, llmUuid: string, message: Message) {
	return await runConversation(uuid, llmUuid, message)
}
