'use server';

import { generateObject } from 'ai';
import { google } from '@ai-sdk/google';
import { z } from 'zod';
import { DISH_REGISTRY } from '@/lib/ai-archive/dish-registry';

const DishSlugEnum = z.enum([
    'squirrel-fish',
    'hot-oil-eel',
    'lotus-stir-fry',
    'biluochun-shrimp',
    'golden-soy-shrimp',
    'assorted-delicacies',
    'crab-roe-tofu',
    'salt-pepper-pork',
    'wine-lees-fish',
    'sweet-sour-ribs',
    'whitebait-eggs',
    'red-bean-soup'
]);

export async function routeDishIntent(query: string) {
    try {
        const dishDescriptions = DISH_REGISTRY.map(d => `- ${d.slug} (${d.nameZh} / ${d.nameEn}): ${d.brief}`).join('\n');

        const result = await generateObject({
            model: google('gemini-3-flash-preview'),
            prompt: `You are an intent classification assistant for a Suzhou cuisine museum.
Analyze the following user query:
"${query}"

Which of our 12 signature dishes is the user most likely asking about? 
Here is the catalog of our 12 dishes and their descriptions:
${dishDescriptions}

Instructions:
1. If the user mentions ingredients, flavors, or cooking methods that strongly match a specific dish's description, assign a high confidence (>0.8).
2. If the user mentions a specific dish name (in English or Chinese), assign a very high confidence (0.9-1.0).
3. If the query is ambiguous and could apply to MULTIPLE dishes (e.g. "shrimp", "fish", "meat"), return all matches with appropriate confidences.
4. If the query is a general greeting, completely vague, or asks about a dish we don't have, return an empty array or very low confidences.`,
            schema: z.object({
                matches: z.array(
                    z.object({
                        dishSlug: DishSlugEnum,
                        confidence: z.number().describe('0 to 1 confidence scale'),
                    })
                ).describe('List of matched dishes. Can be multiple if ambiguous.'),
            }),
        });

        // Filter matches above a reasonable threshold
        const validMatches = result.object.matches
            .filter(match => match.confidence > 0.5)
            .sort((a, b) => b.confidence - a.confidence)
            .map(match => match.dishSlug);

        return validMatches;
    } catch (error) {
        console.error('Error during intent routing:', error);
        return null; // Fallback to browse if routing fails
    }
}
