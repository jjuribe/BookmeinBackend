//Class used to create a TimeSlot  object
export class timeslot {
    _id!: string;
    StartDate!: Date;
    EndDate!: string;
    ServiceProviderId!: string;
    OrganizationId!: string;
    DefaultSlotDuration!: number;//in minutes
    TimeSlotStatus!: string;//"Active" or "Inactive"
}
   