type Data<T> = Record<string, string | number | T>;

export class SocialData {
  constructor(public readonly data: Data<unknown>) {}

  get id(): string {
    return this.data['sub'] as string;
  }

  get firstName(): string {
    return (
      (this.data['firstName'] as string) ?? (this.data['first_name'] as string)
    );
  }

  get lastName(): string {
    return (
      (this.data['lastName'] as string) ?? (this.data['last_name'] as string)
    );
  }

  get email(): string {
    return this.data['email'] as string;
  }
}
