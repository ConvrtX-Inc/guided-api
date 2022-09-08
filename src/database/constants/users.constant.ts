import { User } from '../../users/user.entity';
import { StatusName } from '../../statuses/enums/status-name.enum';

export const DEFAULT_ADMIN_USER: User = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  password: 'secret',
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  status: {
    status_name: StatusName.Active,
  },
  is_active: true,
};
