import {UserOutput} from './User';

export default interface LoginMessageResponse {
  id: string;
  token: string;
  message: string;
  user: UserOutput;
}
