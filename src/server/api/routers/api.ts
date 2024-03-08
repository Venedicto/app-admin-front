import { z } from "zod";
import supabase from "~/utils/supabase";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const apiRouter = createTRPCRouter({
	getBusinesses: publicProcedure.query(async ({ input }) => {
		const { data, error } = await supabase.from("Business").select("*");
		if (error) {
			throw error;
		}
		return data;
	}),
	getBusiness: publicProcedure
		.input(z.object({ id: z.number() }))
		.query(async ({ input }) => {
			const { data, error } = await supabase
				.from("Business")
				.select("*")
				.eq("id", input.id);
			if (error) {
				throw error;
			}
			return data[0];
		}),
	changeStatus: publicProcedure
		.input(z.object({ id: z.number(), active: z.boolean() }))
		.mutation(async ({ input }) => {
			const { error } = await supabase
				.from("Business")
				.update({ active: input.active })
				.eq("id", input.id);
			if (error) {
				throw error;
			}
			return true;
		}),
	getCategories: publicProcedure.query(async ({ input }) => {
		const { data, error } = await supabase.from("Categories").select("*");
		if (error) {
			throw error;
		}
		return data;
	}),
	createCategory: publicProcedure
		.input(z.object({ name: z.string() }))
		.mutation(async ({ input }) => {
			const { data, error } = await supabase
				.from("Categories")
				.insert({ name: input.name });
			if (error) {
				throw error;
			}
			return data;
		}),
	deleteCategory: publicProcedure
		.input(z.object({ id: z.number() }))
		.mutation(async ({ input }) => {
			const { error } = await supabase
				.from("Categories")
				.delete()
				.eq("id", input.id);
			if (error) {
				throw error;
			}
			return true;
		}),
	getConfig: publicProcedure.query(async ({ input }) => {
		const { data, error } = await supabase.from("Configuration").select("*");
		if (error) {
			throw error;
		}

		return data[0];
	}),

	saveConfig: publicProcedure
		.input(z.object({ point_value: z.number() }))
		.mutation(async ({ input }) => {
			const { error } = await supabase
				.from("Configuration")
				.update({ point_value: input.point_value })
				.eq("id", 1);

			if (error) {
				throw error;
			}
			return true;
		}),
});
