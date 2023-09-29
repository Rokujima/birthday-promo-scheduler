import User, { IUser } from '../models/User';

interface UserFilterField {
  email?: string;
  verifiedStatus?: boolean;
  isBirthday?: boolean;
}


class UserService {

    async fetchUsers({ email, verifiedStatus, isBirthday }: UserFilterField): Promise<IUser[]> {
        const query = {};
        
        this.filterEmail(query, email);

        this.verifiedStatus(query, verifiedStatus);

        this.isBirthday(query, isBirthday);

        const users = await User.find(query);
      
        return users;
    }

    filterEmail(query: any, email: string | any){
        email !== undefined ? query.email = email : '';
    }

    verifiedStatus(query: any, status: boolean = false){
        status ? query.isVerified = status : '';
    }

    isBirthday(query: any, status: boolean = false){

        const today = new Date();
        const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
    
        const birthday = {
          $gte: startOfDay,
          $lt: endOfDay,
        };

        status ? query.birthday = birthday : '';
    }

    import() {
        return User.insertMany([
            {
              username: 'user1',
              firstname: 'John',
              lastname: 'Doe',
              birthday: new Date('1990-01-15'),
              email: 'john@example.com',
              isVerified: true,
            },
            {
              username: 'user2',
              firstname: 'Jane',
              lastname: 'Smith',
              birthday: new Date('1985-05-20'),
              email: 'jane@example.com',
              isVerified: true,
            },
            {
              username: 'user3',
              firstname: 'Alice',
              lastname: 'Johnson',
              birthday: new Date('1995-09-10'),
              email: 'alice@example.com',
              isVerified: false,
            },
            {
              username: 'user4',
              firstname: 'Bob',
              lastname: 'Brown',
              birthday: new Date('1982-03-25'),
              email: 'bob@example.com',
              isVerified: true,
            },
          ]);
    }

}

export default UserService;