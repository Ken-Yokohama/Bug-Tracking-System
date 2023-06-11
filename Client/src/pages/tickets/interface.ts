export interface TicketsModel {
    project?: String;
    title?: String;
    description?: String;
    ticketAuthor?: String;
    priority?: String;
    status?: "new" | "in progress" | "resolved";
    type?: "Issue" | "Bug Fix" | "Feature Request";
    estimatedTime?: Number;
    assignedDevs?: [String];
    comments?: [
        {
            author: String;
            comment: String;
        }
    ];
    createdAt?: Date;
    updatedAt?: Date;
}
