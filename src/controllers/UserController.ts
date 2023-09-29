import { Request, Response } from 'express';
import UserService from './../services/UserService';

const userService = new UserService();

class UserController {

  async fetchUsers(req: Request, res: Response) {
    try {
      
      const user = await userService.fetchUsers(req.params);
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Error fetch user' });
    }
  }

  async import(req: Request, res: Response){
    try {
      const user = await userService.import();
      res.json(user);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error import user' });
    }
  }
}

export default UserController;
