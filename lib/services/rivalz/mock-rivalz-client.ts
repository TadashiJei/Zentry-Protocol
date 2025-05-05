/**
 * Mock implementation of the Rivalz client for browser environments
 * This avoids Node.js dependencies that cause build issues on Vercel
 */

export default class MockRivalzClient {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  // Mock methods to replace the actual Rivalz client functionality
  async createKnowledgeBase(name: string, description: string) {
    console.log('Mock: Creating knowledge base', { name, description });
    return {
      id: `mock-kb-${Date.now()}`,
      name,
      description,
    };
  }

  async listKnowledgeBases() {
    console.log('Mock: Listing knowledge bases');
    return {
      knowledgeBases: [
        {
          id: 'mock-kb-1',
          name: 'Mock Knowledge Base 1',
          description: 'Mock description',
        },
      ],
    };
  }

  async addDocument(knowledgeBaseId: string, content: string, metadata: any) {
    console.log('Mock: Adding document', { knowledgeBaseId, metadata });
    return {
      id: `mock-doc-${Date.now()}`,
      knowledgeBaseId,
    };
  }

  async queryKnowledgeBase(knowledgeBaseId: string, query: string) {
    console.log('Mock: Querying knowledge base', { knowledgeBaseId, query });
    return {
      results: [
        {
          content: 'Mock result content',
          score: 0.95,
          metadata: {},
        },
      ],
    };
  }

  async deleteKnowledgeBase(knowledgeBaseId: string) {
    console.log('Mock: Deleting knowledge base', { knowledgeBaseId });
    return { success: true };
  }

  async deleteDocument(documentId: string) {
    console.log('Mock: Deleting document', { documentId });
    return { success: true };
  }
}
