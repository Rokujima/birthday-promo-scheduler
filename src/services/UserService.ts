import User, { IUser } from '../models/User';

interface UserFilterField {
  email?: string;
  verifiedStatus?: boolean;
  isBirthday?: boolean;
}


class UserService {

    private query: any = {};

    async fetchUsers({ email, verifiedStatus, isBirthday }: UserFilterField): Promise<IUser[]> {
        
        this.filterEmail(email);

        this.verifiedStatus(verifiedStatus);

        this.isBirthday(isBirthday);

        const users = await User.find(this.query);
      
        return users;
    }

    filterEmail(email: string | any){
        return email !== undefined ? this.query.email = email : '';
    }

    verifiedStatus(status: boolean = false){
        return status ? this.query.isVerified = status : '';
    }

    isBirthday(status: boolean = false){

        const today = new Date();
        const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
    
        const birthday = {
          $gte: startOfDay,
          $lt: endOfDay,
        };

        return status ? this.query.birthday = birthday : '';
    }

}

export default UserService;