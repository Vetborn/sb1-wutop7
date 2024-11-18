export class ServiceCode {
    static generate(): string {
        const timestamp = new Date().getTime();
        const random = Math.floor(Math.random() * 1000);
        return `SVC-${timestamp}-${random}`;
    }
}