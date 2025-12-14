CREATE TABLE "Categories" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "Categories_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(100) NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "Categories_name_unique" UNIQUE("name")
);
--> statement-breakpoint
ALTER TABLE "Products" ADD COLUMN "categoryId" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "Products" ADD CONSTRAINT "Products_categoryId_Categories_id_fk" FOREIGN KEY ("categoryId") REFERENCES "public"."Categories"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Products" DROP COLUMN "category";