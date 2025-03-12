export interface IUserCreateRequest {
    username: string;
    email: string;
    password: string;
    isVertify: boolean;
    isAdmin: boolean;
    forgotPasswordToken: string;
    forgotPasswordTokenExpire: Date;
    vetifyToken: string;
    vetifyTokenExpire: Date;
    
}