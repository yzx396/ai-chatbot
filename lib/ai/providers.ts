import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from 'ai';
import { createOpenAI } from '@ai-sdk/openai';

import { isTestEnvironment } from '../constants';
import {
  artifactModel,
  chatModel,
  reasoningModel,
  titleModel,
} from './models.test';

const openai = createOpenAI({
  // custom settings, e.g.
  baseURL: 'https://sap-openai-proxy.cfapps.sap.hana.ondemand.com/v1',
});

export const myProvider = isTestEnvironment
  ? customProvider({
      languageModels: {
        'chat-model': chatModel,
        'chat-model-reasoning': reasoningModel,
        'title-model': titleModel,
        'artifact-model': artifactModel,
      },
    })
  : customProvider({
      languageModels: {
        'chat-model': openai('gpt-4o'),
        // 'chat-model-reasoning': wrapLanguageModel({
        //   model: openai('o1'),
        //   middleware: extractReasoningMiddleware({ tagName: 'think' }),
        // }),
        'chat-model-reasoning': openai('o1'),
        'title-model': openai('gpt-4o-mini'),
        'artifact-model': openai('gpt-4o'),
      },
      imageModels: {
        'small-model': openai.image('gpt-4o'),
      },
    });
