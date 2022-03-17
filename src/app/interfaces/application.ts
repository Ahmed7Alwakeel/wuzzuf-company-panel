export interface Application {
    userId: string,
    jobId: string,
    companyId: string,
    applicationId: string;
    questions: {
        currentPosition: string,
        userPosition: string,
        userSampleWork: string
    }
}
