import { createAction, Property } from '@activepieces/pieces-framework';
import { serviceStartConversation, serviceRunConversation } from '../core/services/service'

export const create = createAction({
  name: 'create',
  displayName: 'create',
  description: 'Creates a conversation',
  props: {},
  async run() {
		const llmUuid = '8a90d718-e088-4e05-8a4d-f36f819cb56e'; 
		const message = {
			text: 'Hello!',
			attachments: [],
		};

		console.log("Creating conversation");
		const conversationUuid = await serviceStartConversation();
		console.log(`Conversation created with uuid: ${conversationUuid}`);
		await serviceRunConversation(conversationUuid, llmUuid, message);
  },
});
