import "express-session";

declare module "express-session" {
    interface Session {
        user?: {
            _id: object;
            email: string;
            firstName: string;
            lastName: string;
            isAdmin: boolean;
        };
    }
}