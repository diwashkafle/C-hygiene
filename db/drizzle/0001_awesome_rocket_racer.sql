ALTER TABLE "Products" ALTER COLUMN "description" SET DATA TYPE varchar(500);--> statement-breakpoint
ALTER TABLE "Products" ADD COLUMN "price" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "Products" ADD COLUMN "createdAt" timestamp with time zone DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "Products" ADD COLUMN "updatedAt" timestamp with time zone DEFAULT now() NOT NULL;