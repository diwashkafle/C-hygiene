CREATE TABLE "Products" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "Products_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"description" varchar(255) NOT NULL,
	"imageUrl" varchar(255) NOT NULL
);
