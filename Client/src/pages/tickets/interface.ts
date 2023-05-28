export interface TicketsModel {
    project?: String;
    title?: String;
    description?: String;
    ticketAuthor?: String;
    priority?: String;
    status?: String;
    type?: String;
    estimatedTime?: Number;
    assignedDevs?: [String];
    comments?: [
        {
            author: String;
            comment: String;
        }
    ];
}
