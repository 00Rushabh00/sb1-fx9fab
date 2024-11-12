// LinkedIn job application automation
let isRunning = false;
let userProfile: any = null;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'START_AUTO_APPLY') {
    userProfile = message.profile;
    isRunning = true;
    startAutoApply();
  }
});

async function startAutoApply() {
  while (isRunning) {
    try {
      // Find Easy Apply buttons
      const easyApplyButtons = document.querySelectorAll(
        'button:contains("Easy Apply")'
      );

      if (easyApplyButtons.length === 0) {
        // Load more jobs or stop if no more jobs available
        const nextButton = document.querySelector(
          'button[aria-label="Next"]'
        ) as HTMLButtonElement;
        if (nextButton) {
          nextButton.click();
          await wait(2000);
          continue;
        } else {
          isRunning = false;
          break;
        }
      }

      // Click the first Easy Apply button
      (easyApplyButtons[0] as HTMLButtonElement).click();
      await wait(1500);

      // Handle application form
      await handleApplicationForm();

      await wait(1000);
    } catch (error) {
      console.error('Auto-apply error:', error);
      isRunning = false;
    }
  }
}

async function handleApplicationForm() {
  while (true) {
    // Check for form fields
    const inputs = document.querySelectorAll('input, textarea, select');
    for (const input of inputs) {
      await fillFormField(input as HTMLElement);
    }

    // Handle questions that need AI assistance
    const questions = document.querySelectorAll('.jobs-easy-apply-form-section');
    for (const question of questions) {
      await handleQuestion(question);
    }

    // Click Next or Submit
    const nextButton = document.querySelector(
      'button[aria-label="Continue to next step"]'
    ) as HTMLButtonElement;
    const submitButton = document.querySelector(
      'button[aria-label="Submit application"]'
    ) as HTMLButtonElement;

    if (submitButton) {
      submitButton.click();
      await wait(2000);
      break;
    } else if (nextButton) {
      nextButton.click();
      await wait(1500);
    } else {
      break;
    }
  }
}

async function fillFormField(element: HTMLElement) {
  const label = element.getAttribute('aria-label')?.toLowerCase() || '';
  const type = element.getAttribute('type');

  if (label.includes('name')) {
    (element as HTMLInputElement).value = userProfile.fullName;
  } else if (label.includes('email')) {
    (element as HTMLInputElement).value = userProfile.email;
  } else if (label.includes('phone')) {
    (element as HTMLInputElement).value = userProfile.phone;
  } else if (label.includes('location')) {
    (element as HTMLInputElement).value = userProfile.location;
  }

  // Trigger change event
  element.dispatchEvent(new Event('input', { bubbles: true }));
  element.dispatchEvent(new Event('change', { bubbles: true }));
}

async function handleQuestion(questionElement: Element) {
  const questionText = questionElement.querySelector('.jobs-easy-apply-form-element')
    ?.textContent;
  if (!questionText) return;

  // Get AI-generated answer
  const response = await chrome.runtime.sendMessage({
    type: 'ANSWER_QUESTION',
    question: questionText
  });

  if (response.answer) {
    const input = questionElement.querySelector(
      'input, textarea'
    ) as HTMLInputElement;
    if (input) {
      input.value = response.answer;
      input.dispatchEvent(new Event('input', { bubbles: true }));
      input.dispatchEvent(new Event('change', { bubbles: true }));
    }
  }
}

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Helper function to find elements by text content
Element.prototype.querySelector = function (selector: string) {
  return Array.from(document.querySelectorAll(selector)).find(
    (el) => el.textContent?.includes(selector.replace(':contains(', '').replace(')', ''))
  );
};