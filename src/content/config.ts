import { defineCollection, z } from 'astro:content';

const projectsCollection = defineCollection({
	schema: ({image}) => z.object({
		inProgress: z.boolean(),
		title: z.string(),
		cover: z.string(),
		description: z.string(),
		tags: z.array(z.string()),
		link: z.string(),
		img_alt: z.string().optional(),
	}),
});

export const collections = {
	projects: projectsCollection,
};
