//Class used to create a TimeSlot  object
export class TimeSlot {
    _id?: string;
    startDate!: Date;
    endDate!: Date;
    organizationId!: string;
    timeSlotStatus!: string;//"Active" or "Inactive"
}
   