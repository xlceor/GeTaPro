// app/lib/yProvider.ts
import { WebsocketProvider } from 'y-websocket';
import * as Y from 'yjs';

export function createCollaborationProvider(projectId: string) {
  const ydoc = new Y.Doc();
  const provider = new WebsocketProvider('wss://yjs-server.com', projectId, ydoc);

  return { provider, ydoc };
}