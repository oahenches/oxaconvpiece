import { createPiece, PieceAuth } from "@activepieces/pieces-framework";
import { create } from './lib/actions/create'

export const oxapocketConversation = createPiece({
  displayName: "Oxapocket-conversation",
  auth: PieceAuth.None(),
  minimumSupportedRelease: '0.36.1',
  logoUrl: "https://cdn.activepieces.com/pieces/oxapocket-conversation.png",
  authors: ["ahenches@oxyl.fr"],
  actions: [create],
  triggers: [],
});

