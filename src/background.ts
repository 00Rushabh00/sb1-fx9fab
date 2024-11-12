import OpenAI from 'openai';
let openai: OpenAI;
let userProfile: any = null;

// Initialize OpenAI client when profile is loaded
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'START_BOT') {
    userProfile = message.profile;
    openai = new OpenAI({
      apiKey: userProfile.openAIKey,
      dangerouslyAllowBrowser: true
    });
    startJobSearch();
  }
});

async function startJobSearch() {
  // Inject content script to handle LinkedIn interaction
  const tabs = await chrome.tabs.query({
    url: 'https://www.linkedin.com/jobs/*'
  });

  if (tabs.length > 0) {
    const tab = tabs[0];
    chrome.tabs.sendMessage(tab.id!, { type: 'START_AUTO_APPLY', profile: userProfile });
  } else {
    // Open LinkedIn jobs page if not open
    chrome.tabs.create({
      url: 'https://www.linkedin.com/jobs/',
      active: true
    });
  }
}

// Handle AI-powered question answering
chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.type === 'ANSWER_QUESTION') {
    try {
      const completion = await openai.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: `You are an AI assistant helping with job applications. Use the following candidate profile to answer job application questions professionally:\n${JSON.stringify(
              userProfile,
              null,
              2
            )}`
          },
          {
            role: 'user',
            content: `Please answer the following job application question: ${message.question}`
          }
        ],
        model: 'gpt-4'
      });

      sendResponse({ answer: completion.choices[0].message.content });
    } catch (error) {
      console.error('OpenAI API error:', error);
      sendResponse({ error: 'Failed to generate answer' });
    }
  }
  return true; // Keep the message channel open for async response
});