export interface TicketsModel {
    project?: string;
    title?: string;
    description?: string;
    ticketAuthor?: string;
    priority?: string;
    status?: "new" | "in progress" | "resolved";
    type?: "Issue" | "Bug Fix" | "Feature Request";
    estimatedTime?: Number;
    assignedDevs?: [string];
    comments?: [
        {
            author: string;
            comment: string;
        }
    ];
    createdAt?: Date;
    updatedAt?: Date;
}
