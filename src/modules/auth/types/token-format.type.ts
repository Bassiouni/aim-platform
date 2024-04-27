import { TokenTypeEnum } from '../enums/token-type.enum';
import { UserType } from 'src/modules/user/types/user.type';

export type TokenFormatType = {
  user: UserType;
  tokenType: TokenTypeEnum;
};
