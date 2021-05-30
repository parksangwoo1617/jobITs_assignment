export class UserDto {
    userId: string;
    password: string;
}

export class UserTokenDto {
    access_token: string;
    refresh_token: string;
}

export class PostDto {
    title: string;
    content: string;
    path: string;
    filename: string;
}

export class FileDto {
    path: string;
    filename: string;
}