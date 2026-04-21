import {pgTable, serial, text, timestamp} from "drizzle-orm/pg-core";

export const emailSubmissions = pgTable("email_submissions", {
    id: serial("id").primaryKey(),
    email: text("email").notNull(),
    submittedAt: timestamp("submitted_at").defaultNow().notNull(),
});