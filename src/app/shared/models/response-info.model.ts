export class ResponseInfo<T> {
    status!: boolean;
    message!: string;
    data!: T;
}